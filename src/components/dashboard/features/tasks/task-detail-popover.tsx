'use client'

import { Task, TaskPriority, TaskStatus } from '@/types/tasks'
import { updateTask } from 'actions'
import { format } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'
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

type TaskDetailPopoverProps = {
	task: Task
	onClose: () => void
	onStatusChange: (id: string, status: TaskStatus) => void
	onTaskUpdated: () => void
	onTaskDeleted: (id: string) => void
	allTasks: Task[]
	isOpen: boolean
}

export default function TaskDetailPopover({
	task,
	onClose,
	onStatusChange,
	onTaskUpdated,
	onTaskDeleted,
	allTasks
}: TaskDetailPopoverProps) {
	const [editedTask, setEditedTask] = useState<Task>(task)
	const [newSubtask, setNewSubtask] = useState('')
	const [newDependency, setNewDependency] = useState('')

	useEffect(() => {
		setEditedTask(task)
	}, [task])

	const handleUpdateTask = async () => {
		try {
			await updateTask(editedTask)
			onTaskUpdated()
			onClose()
		} catch (error) {
			console.error('Failed to update task:', error)
		}
	}

	const addSubtask = () => {
		if (newSubtask.trim() !== '') {
			setEditedTask(prevTask => ({
				...prevTask,
				subtasks: [
					...(prevTask.subtasks || []),
					{ title: newSubtask, completed: false }
				]
			}))
			setNewSubtask('')
		}
	}

	const toggleSubtaskCompletion = (index: number) => {
		setEditedTask(prevTask => ({
			...prevTask,
			subtasks: prevTask.subtasks.map((subtask, i) =>
				i === index
					? { ...subtask, completed: !subtask.completed }
					: subtask
			)
		}))
	}

	const removeSubtask = (index: number) => {
		setEditedTask(prevTask => ({
			...prevTask,
			subtasks: prevTask.subtasks.filter((_, i) => i !== index)
		}))
	}

	const addDependency = () => {
		if (newDependency && !editedTask.dependencies.includes(newDependency)) {
			setEditedTask(prevTask => ({
				...prevTask,
				dependencies: [...prevTask.dependencies, newDependency]
			}))
			setNewDependency('')
		}
	}

	const removeDependency = (dependency: string) => {
		setEditedTask(prevTask => ({
			...prevTask,
			dependencies: prevTask.dependencies.filter(
				dep => dep !== dependency
			)
		}))
	}

	return (
		<Popover open={true} onOpenChange={onClose}>
			<PopoverContent className="w-[400px] bg-[#2C2C2C] border-gray-600">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none text-white">
							Edit Task
						</h4>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="title" className="text-white">
							Title
						</Label>
						<Input
							id="title"
							value={editedTask.title}
							onChange={e =>
								setEditedTask({
									...editedTask,
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
							value={editedTask.content}
							onChange={e =>
								setEditedTask({
									...editedTask,
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
							value={editedTask.status}
							onValueChange={(value: TaskStatus) =>
								setEditedTask({ ...editedTask, status: value })
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
							value={editedTask.priority.toString()}
							onValueChange={(value: string) =>
								setEditedTask({
									...editedTask,
									priority: parseInt(value) as TaskPriority
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
									className={`justify-start text-left font-normal bg-[#3C3C3C] text-white border-gray-600 ${
										!editedTask.dueDate &&
										'text-muted-foreground'
									}`}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{editedTask.dueDate ? (
										format(
											new Date(editedTask.dueDate),
											'PPP'
										)
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0 bg-[#2C2C2C] border-gray-600">
								<Calendar
									mode="single"
									selected={
										editedTask.dueDate
											? new Date(editedTask.dueDate)
											: undefined
									}
									onSelect={date =>
										setEditedTask({
											...editedTask,
											dueDate: date?.toISOString() || null
										})
									}
									className="bg-[#2C2C2C] text-white"
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="subtasks" className="text-white">
							Subtasks
						</Label>
						<div className="space-y-2">
							{editedTask.subtasks?.map((subtask, index) => (
								<div
									key={index}
									className="flex items-center gap-2"
								>
									<input
										type="checkbox"
										checked={subtask.completed}
										onChange={() =>
											toggleSubtaskCompletion(index)
										}
										className="form-checkbox h-4 w-4 text-blue-600"
									/>
									<span
										className={`flex-grow ${subtask.completed ? 'line-through text-gray-500' : 'text-white'}`}
									>
										{subtask.title}
									</span>
									<Button
										size="sm"
										variant="destructive"
										onClick={() => removeSubtask(index)}
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
							))}
						</div>
						<div className="flex gap-2">
							<Input
								value={newSubtask}
								onChange={e => setNewSubtask(e.target.value)}
								placeholder="New subtask"
								className="bg-[#3C3C3C] text-white border-gray-600"
							/>
							<Button onClick={addSubtask}>Add</Button>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="dependencies" className="text-white">
							Dependencies
						</Label>
						<div className="space-y-2">
							{editedTask.dependencies?.map(dependency => (
								<div
									key={dependency}
									className="flex items-center gap-2"
								>
									<span className="flex-grow text-white">
										{dependency}
									</span>
									<Button
										size="sm"
										variant="destructive"
										onClick={() =>
											removeDependency(dependency)
										}
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
							))}
						</div>
						<div className="flex gap-2">
							<Select onValueChange={setNewDependency}>
								<SelectTrigger className="bg-[#3C3C3C] text-white border-gray-600">
									<SelectValue placeholder="Add dependency" />
								</SelectTrigger>
								<SelectContent>
									{allTasks &&
										allTasks
											.filter(t => t.id !== editedTask.id)
											.map(task => (
												<SelectItem
													key={task.id}
													value={task.id}
												>
													{task.title}
												</SelectItem>
											))}
								</SelectContent>
							</Select>
							<Button onClick={addDependency}>Add</Button>
						</div>
					</div>
					<Button
						onClick={handleUpdateTask}
						className="bg-primary text-primary-foreground"
					>
						Update Task
					</Button>
					<Button
						variant="destructive"
						onClick={() => {
							onTaskDeleted(editedTask.id)
							onClose()
						}}
					>
						Delete Task
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
