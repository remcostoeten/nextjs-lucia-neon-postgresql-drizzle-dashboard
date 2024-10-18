'use client'

import { useClientAuth } from '@/core/server/auth/client-auth-utils'
import { Task, TaskStatus } from '@/types/tasks'
import { createTask } from 'actions'
import { format } from 'date-fns'
import { CalendarIcon, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	Calendar,
	Input,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea
} from 'ui'

type CreateTaskPopoverProps = {
	onTaskCreated: () => void
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

export default function CreateTaskPopover({
	onTaskCreated,
	isOpen,
	setIsOpen
}: CreateTaskPopoverProps) {
	const { getClientSession } = useClientAuth()
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
				const createdTask = await createTask(
					userId,
					newTask as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
				)
				if (createdTask && createdTask.id) {
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
				} else {
					throw new Error('Failed to create task')
				}
			} catch (error) {
				console.error('Failed to create task:', error)
				toast.error('Failed to create task. Please try again.')
			}
		} else {
			toast.error('Please provide a title and description for the task.')
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
						<h4 className="font-medium leading-none text-white">
							Create New Task
						</h4>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="title" className="text-white">
							Title
						</Label>
						<Input
							id="title"
							value={newTask.title}
							onChange={e =>
								setNewTask({
									...newTask,
									title: e.target.value
								})
							}
							className="bg-[#3C3C3C] text-white border-gray-600"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="content" className="text-white">
							Description
						</Label>
						<Textarea
							id="content"
							value={newTask.content}
							onChange={e =>
								setNewTask({
									...newTask,
									content: e.target.value
								})
							}
							className="bg-[#3C3C3C] text-white border-gray-600"
							rows={3}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="status" className="text-white">
							Status
						</Label>
						<Select
							value={newTask.status}
							onValueChange={(value: TaskStatus) =>
								setNewTask({ ...newTask, status: value })
							}
						>
							<SelectTrigger className="bg-[#3C3C3C] text-white border-gray-600">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="backlog">Backlog</SelectItem>
								<SelectItem value="in-progress">
									In Progress
								</SelectItem>
								<SelectItem value="completed">
									Completed
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="priority" className="text-white">
							Priority
						</Label>
						<Select
							value={newTask.priority?.toString()}
							onValueChange={(value: string) =>
								setNewTask({
									...newTask,
									priority: parseInt(value)
								})
							}
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
						<Label htmlFor="dueDate" className="text-white">
							Due Date
						</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={`justify-start text-left font-normal bg-[#3C3C3C] text-white border-gray-600 ${!newTask.dueDate && 'text-muted-foreground'}`}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{newTask.dueDate ? (
										format(newTask.dueDate, 'PPP')
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0 bg-[#2C2C2C] border-gray-600">
								<Calendar
									mode="single"
									selected={newTask.dueDate || undefined}
									onSelect={date =>
										setNewTask({
											...newTask,
											dueDate: date || null
										})
									}
									initialFocus
									className="bg-[#2C2C2C] text-white"
								/>
							</PopoverContent>
						</Popover>
					</div>
					<Button
						onClick={handleCreateTask}
						className="bg-primary text-primary-foreground"
					>
						Create Task
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
