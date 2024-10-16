'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Task, TaskStatus } from '@/types/tasks.d'
import { getTasks, updateTaskStatus } from 'actions'
import { motion } from 'framer-motion'
import { Grid, List, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CreateTaskPopover from './create-task-popover'
import TaskList from './task-list'

export default function TaskManagement() {
	const [tasks, setTasks] = useState<Task[]>([])
	const [filter, setFilter] = useState<TaskStatus | 'all'>('all')
	const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		fetchTasks()
	}, [])

	const fetchTasks = async () => {
		try {
			const fetchedTasks = await getTasks()
			setTasks(fetchedTasks)
		} catch (error) {
			console.error('Failed to fetch tasks:', error)
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

	const filteredTasks = tasks.filter(task => {
		const statusMatch = filter === 'all' || task.status === filter
		const searchMatch =
			task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			task.content.toLowerCase().includes(searchTerm.toLowerCase())
		return statusMatch && searchMatch
	})

	return (
		<DndProvider backend={HTML5Backend}>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				className="container mx-auto p-4 bg-[#1C1C1C] text-white min-h-screen"
			>
				<div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
					<div className="flex space-x-2">
						<Button
							variant={filter === 'all' ? 'default' : 'outline'}
							onClick={() => setFilter('all')}
							className={
								filter === 'all'
									? 'bg-primary text-primary-foreground'
									: 'bg-[#2C2C2C] text-white border-gray-600 hover:bg-[#3C3C3C]'
							}
						>
							All
						</Button>
						<Button
							variant={
								filter === 'backlog' ? 'default' : 'outline'
							}
							onClick={() => setFilter('backlog')}
							className={
								filter === 'backlog'
									? 'bg-primary text-primary-foreground'
									: 'bg-[#2C2C2C] text-white border-gray-600 hover:bg-[#3C3C3C]'
							}
						>
							Backlog
						</Button>
						<Button
							variant={
								filter === 'in-progress' ? 'default' : 'outline'
							}
							onClick={() => setFilter('in-progress')}
							className={
								filter === 'in-progress'
									? 'bg-primary text-primary-foreground'
									: 'bg-[#2C2C2C] text-white border-gray-600 hover:bg-[#3C3C3C]'
							}
						>
							In Progress
						</Button>
						<Button
							variant={
								filter === 'completed' ? 'default' : 'outline'
							}
							onClick={() => setFilter('completed')}
							className={
								filter === 'completed'
									? 'bg-primary text-primary-foreground'
									: 'bg-[#2C2C2C] text-white border-gray-600 hover:bg-[#3C3C3C]'
							}
						>
							Completed
						</Button>
					</div>
					<div className="flex items-center space-x-4">
						<div className="flex space-x-2">
							<Button
								variant="outline"
								size="icon"
								onClick={() => setViewMode('grid')}
								className={`bg-[#2C2C2C] text-white border-gray-600 hover:bg-[#3C3C3C] p-2 ${viewMode === 'grid' ? 'bg-[#3C3C3C]' : ''}`}
							>
								<Grid className="h-5 w-5" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={() => setViewMode('list')}
								className={`bg-[#2C2C2C] text-white border-gray-600 hover:bg-[#3C3C3C] p-2 ${viewMode === 'list' ? 'bg-[#3C3C3C]' : ''}`}
							>
								<List className="h-5 w-5" />
							</Button>
						</div>
						<CreateTaskPopover onTaskCreated={fetchTasks} />
					</div>
				</div>
				<div className="flex items-center space-x-2 mb-4">
					<Search className="h-5 w-5 text-gray-400" />
					<Input
						type="text"
						placeholder="Search tasks..."
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className="bg-[#2C2C2C] text-white border-gray-600"
					/>
				</div>
				{viewMode === 'list' ? (
					<TaskList
						tasks={filteredTasks}
						status="all"
						onStatusChange={handleStatusChange}
					/>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{(['backlog', 'in-progress', 'completed'] as const).map(
							status => (
								<TaskList
									key={status}
									tasks={filteredTasks.filter(
										task => task.status === status
									)}
									status={status}
									onStatusChange={handleStatusChange}
								/>
							)
						)}
					</div>
				)}
			</motion.div>
		</DndProvider>
	)
}
