'use client'

import { useClientAuth } from '@/core/server/auth/client-auth-utils'
import { Task, TaskPriority, NewTask } from '@/types/tasks'
import { createTask } from 'actions'
import { format } from 'date-fns'
import { CalendarIcon, Plus, Tag } from 'lucide-react'
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
} from '@/components/ui'

type CreateTaskPopoverProps = {
	onTaskCreated: () => void
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	boardId: string | undefined
	lanes: string[]
}

type NewTaskData = Omit<NewTask, 'boardId'>

export default function CreateTaskPopover({
	onTaskCreated,
	isOpen,
	setIsOpen,
	boardId,
	lanes
}: CreateTaskPopoverProps) {
	const { getClientSession } = useClientAuth()
	const [userId, setUserId] = useState<string | null>(null)
	const [newTask, setNewTask] = useState<NewTaskData>({
		title: '',
		content: '',
		status: lanes[0] || 'backlog',
		labels: [],
		subtasks: [],
		dueDate: null,
		priority: 1,
		actualTime: null,
		estimatedTime: null,
		assignee: null
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

		if (!boardId) {
			toast.error('No board selected. Please select a board.')
			return
		}

		if (newTask.title && newTask.content) {
			try {
				const createdTask = await createTask(userId, {
					...newTask,
					boardId
				})
				if (createdTask && createdTask.id) {
					setIsOpen(false)
					setNewTask({
						title: '',
						content: '',
						status: lanes[0] || 'backlog',
						labels: [],
						subtasks: [],
						dueDate: null,
						priority: 1,
						actualTime: null,
						estimatedTime: null,
						assignee: null
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

	const handleAddLabel = () => {
		if (newLabel && !newTask.labels.includes(newLabel)) {
			setNewTask(prev => ({
				...prev,
				labels: [...prev.labels, newLabel]
			}))
			setNewLabel('')
		}
	}

	const handleRemoveLabel = (label: string) => {
		setNewTask(prev => ({
			...prev,
			labels: prev.labels.filter(l => l !== label)
		}))
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button className="bg-primary text-primary-foreground">
					<Plus className="mr-2 h-4 w-4" /> Create Task
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[400px] bg-background border-border">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">
							Create New Task
						</h4>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							value={newTask.title}
							onChange={e =>
								setNewTask({
									...newTask,
									title: e.target.value
								})
							}
							className="bg-input"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="content">Description</Label>
						<Textarea
							id="content"
							value={newTask.content}
							onChange={e =>
								setNewTask({
									...newTask,
									content: e.target.value
								})
							}
							className="bg-input"
							rows={3}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="status">Status</Label>
						<Select
							value={newTask.status}
							onValueChange={(value: string) =>
								setNewTask({ ...newTask, status: value })
							}
						>
							<SelectTrigger className="bg-input">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent>
								{lanes.map(lane => (
									<SelectItem key={lane} value={lane}>
										{lane}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="priority">Priority</Label>
						<Select
							value={newTask.priority.toString()}
							onValueChange={(value: string) =>
								setNewTask({
									...newTask,
									priority: parseInt(value) as TaskPriority
								})
							}
						>
							<SelectTrigger className="bg-input">
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
						<Label htmlFor="dueDate">Due Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={`justify-start text-left font-normal bg-input ${!newTask.dueDate && 'text-muted-foreground'}`}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{newTask.dueDate ? (
										format(newTask.dueDate, 'PPP')
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0 bg-popover">
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
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="labels">Labels</Label>
						<div className="flex flex-wrap gap-2 mb-2">
							{newTask.labels.map(label => (
								<div
									key={label}
									className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
								>
									{label}
									<button
										onClick={() => handleRemoveLabel(label)}
										className="ml-2 text-primary-foreground hover:text-red-500"
									>
										&times;
									</button>
								</div>
							))}
						</div>
						<div className="flex gap-2">
							<Input
								id="newLabel"
								value={newLabel}
								onChange={e => setNewLabel(e.target.value)}
								placeholder="Add a label"
								className="bg-input"
							/>
							<Button onClick={handleAddLabel} variant="outline">
								<Tag className="h-4 w-4 mr-2" />
								Add
							</Button>
						</div>
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
