'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { Task, TaskStatus } from '@/types/tasks'
import { createTask } from 'actions'
import { format } from 'date-fns'
import { CalendarIcon, Plus } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

type CreateTaskPopoverProps = {
	onTaskCreated: () => void
}

export default function CreateTaskPopover() {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	const [newTask, setNewTask] = useState<Partial<Task>>({
		title: '',
		content: '',
		status: 'backlog' as TaskStatus,
		labels: [],
		subtasks: []
	})

	const handleCreateTask = async () => {
		if (newTask.title && newTask.content) {
			try {
				await createTask(
					'user123',
					newTask as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
				)
				setIsOpen(false)
				setNewTask({
					title: '',
					content: '',
					status: 'backlog' as TaskStatus,
					labels: [],
					subtasks: []
				})
				router.reload()
			} catch (error) {
				console.error('Failed to create task:', error)
			}
		}
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button className="bg-primary text-primary-foreground">
					<Plus className="mr-2 h-4 w-4" /> Create Task
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 bg-[#2C2C2C] border-gray-600">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none text-white">
							Create New Task
						</h4>
						<p className="text-sm text-gray-400">
							Fill in the details for your new task.
						</p>
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
							Content
						</Label>
						<Input
							id="content"
							value={newTask.content}
							onChange={e =>
								setNewTask({
									...newTask,
									content: e.target.value
								})
							}
							className="bg-[#3C3C3C] text-white border-gray-600"
						/>
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
										!newTask.dueDate &&
										'text-muted-foreground'
									}`}
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
									selected={newTask.dueDate}
									onSelect={date =>
										setNewTask({
											...newTask,
											dueDate: date
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
