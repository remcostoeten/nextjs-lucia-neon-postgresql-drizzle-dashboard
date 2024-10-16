'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Task, TaskStatus } from '@/types/tasks.d'
import { motion } from 'framer-motion'
import { Grid, List, Search } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CreateTaskPopover from './create-task-popover'
import TaskList from './task-management'

export default function TaskBoard() {
	const [tasks, setTasks] = useState<Task[]>([
		// ... (previous tasks)
	])
	const [filter, setFilter] = useState<TaskStatus | 'all'>('all')
	const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
	const [searchTerm, setSearchTerm] = useState('')
	const [priorityFilter, setPriorityFilter] = useState<string>('all')

	const moveTask = useCallback(
		(
			dragIndex: number,
			hoverIndex: number,
			sourceStatus: string,
			targetStatus: string
		) => {
			// ... (previous moveTask implementation)
		},
		[]
	)

	const changeTaskStatus = useCallback(
		(id: string, newStatus: TaskStatus) => {
			// ... (previous changeTaskStatus implementation)
		},
		[]
	)

	const filteredTasks = useMemo(() => {
		return tasks.filter(task => {
			const statusMatch = filter === 'all' || task.status === filter
			const searchMatch =
				task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				task.content.toLowerCase().includes(searchTerm.toLowerCase())
			const priorityMatch =
				priorityFilter === 'all' ||
				(priorityFilter === 'high' &&
					task.priority &&
					task.priority > 7) ||
				(priorityFilter === 'medium' &&
					task.priority &&
					task.priority >= 4 &&
					task.priority <= 7) ||
				(priorityFilter === 'low' && task.priority && task.priority < 4)
			return statusMatch && searchMatch && priorityMatch
		})
	}, [tasks, filter, searchTerm, priorityFilter])

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
						<CreateTaskPopover />
					</div>
				</div>
				<div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
					<div className="flex items-center space-x-2 w-full sm:w-auto">
						<Search className="h-5 w-5 text-gray-400" />
						<Input
							type="text"
							placeholder="Search tasks..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="bg-[#2C2C2C] text-white border-gray-600 w-full sm:w-64"
						/>
					</div>
					<Select
						value={priorityFilter}
						onValueChange={setPriorityFilter}
					>
						<SelectTrigger className="bg-[#2C2C2C] text-white border-gray-600 w-full sm:w-40">
							<SelectValue placeholder="Filter by priority" />
						</SelectTrigger>
						<SelectContent className="bg-[#2C2C2C] text-white border-gray-600">
							<SelectItem value="all">All Priorities</SelectItem>
							<SelectItem value="high">High Priority</SelectItem>
							<SelectItem value="medium">
								Medium Priority
							</SelectItem>
							<SelectItem value="low">Low Priority</SelectItem>
						</SelectContent>
					</Select>
				</div>
				{viewMode === 'list' ? (
					<TaskList
						tasks={filteredTasks}
						status="all"
						moveTask={moveTask}
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
									moveTask={changeTaskStatus}
								/>
							)
						)}
					</div>
				)}
			</motion.div>
		</DndProvider>
	)
}
