'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useClientAuth } from '@/lib/auth/client-auth-utils'
import { Task, TaskStatus } from '@/types/tasks'
import { addTaskLabel, createTask } from 'actions'
import { format } from 'date-fns'
import { CalendarIcon, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type CreateTaskPopoverProps = {
    onTaskCreated: () => void
    labels: string[]
}

export default function CreateTaskPopover({ onTaskCreated, labels }: CreateTaskPopoverProps) {
    const { getClientSession } = useClientAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)
    const [newTask, setNewTask] = useState<Partial<Task>>({
        title: '',
        content: '',
        status: 'backlog' as TaskStatus,
        labels: [],
        subtasks: [],
        dueDate: null,
        priority: 1
    })
    const [newLabel, setNewLabel] = useState('')

    useEffect(() => {
        const fetchUserSession = async () => {
            const session = await getClientSession()
            if (session.user) {
                setUserId(session.user.id)
            }
        }
        fetchUserSession()
    }, [])

    const handleCreateTask = async () => {
        if (!userId) {
            toast.error('User not authenticated. Please sign in.')
            return
        }

        if (newTask.title && newTask.content) {
            try {
                const createdTask = await createTask(userId, newTask as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>)
                for (const label of newTask.labels || []) {
                    await addTaskLabel(createdTask.id, label)
                }
                setIsOpen(false)
                setNewTask({
                    title: '',
                    content: '',
                    status: 'backlog' as TaskStatus,
                    labels: [],
                    subtasks: [],
                    dueDate: null,
                    priority: 1
                })
                onTaskCreated()
                toast.success('Task created successfully!')
            } catch (error) {
                console.error('Failed to create task:', error)
                toast.error('Failed to create task. Please try again.')
            }
        }
    }

    const addLabel = (label: string) => {
        if (!newTask.labels?.includes(label)) {
            setNewTask({
                ...newTask,
                labels: [...(newTask.labels || []), label]
            })
        }
    }

    const removeLabel = (label: string) => {
        setNewTask({
            ...newTask,
            labels: newTask.labels?.filter(l => l !== label)
        })
    }

    const handleAddNewLabel = () => {
        if (newLabel && !labels.includes(newLabel)) {
            addLabel(newLabel)
            setNewLabel('')
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button className="bg-primary text-primary-foreground">
                    <Plus className="mr-2 h-4 w-4" /> Create Task
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] bg-[#2C2C2C] border-gray-600">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none text-white">Create New Task</h4>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-white">Title</Label>
                        <Input
                            id="title"
                            value={newTask.title}
                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            className="bg-[#3C3C3C] text-white border-gray-600"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="content" className="text-white">Description</Label>
                        <Textarea
                            id="content"
                            value={newTask.content}
                            onChange={e => setNewTask({ ...newTask, content: e.target.value })}
                            className="bg-[#3C3C3C] text-white border-gray-600"
                            rows={3}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status" className="text-white">Status</Label>
                        <Select
                            value={newTask.status}
                            onValueChange={(value: TaskStatus) => setNewTask({ ...newTask, status: value })}
                        >
                            <SelectTrigger className="bg-[#3C3C3C] text-white border-gray-600">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="backlog">Backlog</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="priority" className="text-white">Priority</Label>
                        <Select
                            value={newTask.priority?.toString()}
                            onValueChange={(value: string) => setNewTask({ ...newTask, priority: parseInt(value) })}
                        >
                            <SelectTrigger className="bg-[#3C3C3C] text-white border-gray-600">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Low</SelectItem>
                                <SelectItem value="2">Medium</SelectItem>
                                <SelectItem value="3">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dueDate" className="text-white">Due Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={`justify-start text-left font-normal bg-[#3C3C3C] text-white border-gray-600 ${!newTask.dueDate && 'text-muted-foreground'}`}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {newTask.dueDate ? format(newTask.dueDate, 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-[#2C2C2C] border-gray-600">
                                <Calendar
                                    mode="single"
                                    selected={newTask.dueDate || undefined}
                                    onSelect={date => setNewTask({ ...newTask, dueDate: date || null })}
                                    initialFocus
                                    className="bg-[#2C2C2C] text-white"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="labels" className="text-white">Labels</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {newTask.labels?.map(label => (
                                <span key={label} className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm flex items-center">
                                    {label}
                                    <button onClick={() => removeLabel(label)} className="ml-1">
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Select onValueChange={addLabel}>
                                <SelectTrigger className="bg-[#3C3C3C] text-white border-gray-600">
                                    <SelectValue placeholder="Add label" />
                                </SelectTrigger>
                                <SelectContent>
                                    {labels.map(label => (
                                        <SelectItem key={label} value={label}>{label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="flex">
                                <Input
                                    value={newLabel}
                                    onChange={e => setNewLabel(e.target.value)}
                                    placeholder="New label"
                                    className="bg-[#3C3C3C] text-white border-gray-600"
                                />
                                <Button onClick={handleAddNewLabel} className="ml-2">Add</Button>
                            </div>
                        </div>
                    </div>
                    <Button onClick={handleCreateTask} className="bg-primary text-primary-foreground">
                        Create Task
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
