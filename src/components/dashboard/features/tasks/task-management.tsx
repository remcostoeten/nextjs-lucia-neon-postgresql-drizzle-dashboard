'use client'

import { useClientAuth } from '@/core/server/auth/client-auth-utils'
import { Task, TaskPriority, TaskStatus } from '@/types/tasks'
import { deleteTask, getLabels, getTasks, updateTaskStatus } from 'actions'
import { motion } from 'framer-motion'
import { Grid, List, Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {
	Button,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from 'ui'
import CreateTaskPopover from './create-task-popover'
import TaskList from './task-list'

export default function TaskManagement() {
	const { getClientSession } = useClientAuth()
	const [userId, setUserId] = useState<string | null>(null)
	const [tasks, setTasks] = useState<Task[]>([])
	const [labels, setLabels] = useState<string[]>([])
	const [filter, setFilter] = useState<TaskStatus | 'all'>('all')
	const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>(
		'all'
	)
	const [labelFilter, setLabelFilter] = useState<string | 'all'>('all')
	const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>(
		'createdAt'
	)
	const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		const fetchUserSession = async () => {
			const session = await getClientSession()
			if (session.user) {
				setUserId(session.user.id)
			}
		}
		fetchUserSession()
	}, [])

	useEffect(() => {
		if (userId) {
			fetchTasks()
			fetchLabels()
		}
	}, [userId])

	const fetchTasks = async () => {
		if (userId) {
			const fetchedTasks = await getTasks(userId)
			setTasks(fetchedTasks)
		}
	}

	const fetchLabels = async () => {
		if (userId) {
			const fetchedLabels = await getLabels(userId)
			setLabels(fetchedLabels)
		}
	}

	const handleStatusChange = async (
		taskId: string,
		newStatus: TaskStatus
	) => {
		try {
			await updateTaskStatus(taskId, newStatus)
			fetchTasks()
		} catch (error) {
			console.error('Failed to update task status:', error)
		}
	}

	const handleDeleteTask = async (taskId: string) => {
		try {
			await deleteTask(taskId)
			fetchTasks()
		} catch (error) {
			console.error('Failed to delete task:', error)
		}
	}

	const filteredAndSortedTasks = tasks
		.filter(task => {
			const statusMatch = filter === 'all' || task.status === filter
			const priorityMatch =
				priorityFilter === 'all' || task.priority === priorityFilter
			const labelMatch =
				labelFilter === 'all' || task.labels.includes(labelFilter)
			const searchMatch =
				task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				task.content.toLowerCase().includes(searchTerm.toLowerCase())
			return statusMatch && priorityMatch && labelMatch && searchMatch
		})
		.sort((a, b) => {
			if (sortBy === 'dueDate') {
				return (
					(a.dueDate ? new Date(a.dueDate).getTime() : Infinity) -
					(b.dueDate ? new Date(b.dueDate).getTime() : Infinity)
				)
			} else if (sortBy === 'priority') {
				return b.priority - a.priority
			} else {
				return (
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
				)
			}
		})

	const tasksByStatus = {
		backlog: filteredAndSortedTasks.filter(
			task => task.status === 'backlog'
		),
		'in-progress': filteredAndSortedTasks.filter(
			task => task.status === 'in-progress'
		),
		completed: filteredAndSortedTasks.filter(
			task => task.status === 'completed'
		)
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="container mx-auto p-4 bg-[#1C1C1C] text-white min-h-screen">
				<h1 className="text-3xl font-bold mb-6">Task Management</h1>
				<div className="flex flex-wrap justify-between items-center mb-6 gap-4">
					<div className="flex space-x-2">
						<Button
							variant={
								viewMode === 'list' ? 'default' : 'outline'
							}
							onClick={() => setViewMode('list')}
							className="bg-[#2C2C2C] text-white border-gray-600 hover:bg-[#3C3C3C]"
						>
							<List className="h-4 w-4 mr-2" />
							List
						</Button>
						<Button
							variant={
								viewMode === 'grid' ? 'default' : 'outline'
							}
							onClick={() => setViewMode('grid')}
							className="bg-[#2C2C2C] text-white border-gray-600 hover:bg-[#3C3C3C]"
						>
							<Grid className="h-4 w-4 mr-2" />
							Grid
						</Button>
					</div>
					<div className="flex items-center space-x-2">
						<div className="relative">
							<Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<Input
								type="text"
								placeholder="Search tasks..."
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className="pl-10 bg-[#2C2C2C] text-white border-gray-600 w-64"
							/>
						</div>
						<Select
							value={filter}
							onValueChange={(value: TaskStatus | 'all') =>
								setFilter(value)
							}
						>
							<SelectTrigger className="w-[180px] bg-[#2C2C2C] text-white border-gray-600">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">
									All Statuses
								</SelectItem>
								<SelectItem value="backlog">Backlog</SelectItem>
								<SelectItem value="in-progress">
									In Progress
								</SelectItem>
								<SelectItem value="completed">
									Completed
								</SelectItem>
							</SelectContent>
						</Select>
						<Select
							value={priorityFilter}
							onValueChange={(value: TaskPriority | 'all') =>
								setPriorityFilter(value)
							}
						>
							<SelectTrigger className="w-[180px] bg-[#2C2C2C] text-white border-gray-600">
								<SelectValue placeholder="Filter by priority" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">
									All Priorities
								</SelectItem>
								<SelectItem value={1}>Low</SelectItem>
								<SelectItem value={2}>Medium</SelectItem>
								<SelectItem value={3}>High</SelectItem>
							</SelectContent>
						</Select>
						<Select
							value={labelFilter}
							onValueChange={(value: string | 'all') =>
								setLabelFilter(value)
							}
						>
							<SelectTrigger className="w-[180px] bg-[#2C2C2C] text-white border-gray-600">
								<SelectValue placeholder="Filter by label" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Labels</SelectItem>
								{labels.map(label => (
									<SelectItem key={label} value={label}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select
							value={sortBy}
							onValueChange={(
								value: 'dueDate' | 'priority' | 'createdAt'
							) => setSortBy(value)}
						>
							<SelectTrigger className="w-[180px] bg-[#2C2C2C] text-white border-gray-600">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="dueDate">
									Due Date
								</SelectItem>
								<SelectItem value="priority">
									Priority
								</SelectItem>
								<SelectItem value="createdAt">
									Created Date
								</SelectItem>
							</SelectContent>
						</Select>
						<CreateTaskPopover
							onTaskCreated={fetchTasks}
							labels={labels}
						/>
					</div>
				</div>
				<div
					className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}
				>
					{(['backlog', 'in-progress', 'completed'] as const).map(
						status => (
							<motion.div
								key={status}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className="bg-[#2C2C2C] p-4 rounded-lg"
							>
								<h2 className="text-xl font-semibold mb-4 capitalize">
									{status.replace('-', ' ')}
								</h2>
								<TaskList
									tasks={tasksByStatus[status]}
									status={status}
									onStatusChange={handleStatusChange}
									viewMode={viewMode}
									onTaskUpdated={fetchTasks}
									onTaskDeleted={handleDeleteTask}
									allTasks={tasks}
								/>
								{viewMode === 'grid' && (
									<Button
										variant="outline"
										className="w-full mt-4 bg-[#3C3C3C] text-white border-gray-600 hover:bg-[#4C4C4C]"
										onClick={() => setIsOpen(true)}
									>
										<Plus className="h-4 w-4 mr-2" />
										Add Task
									</Button>
								)}
							</motion.div>
						)
					)}
				</div>
			</div>
		</DndProvider>
	)
}
