'use client'

import { Button, Input } from 'ui'
import { useClientAuth } from '@/lib/auth/client-auth-utils'
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
	const { getClientSession } = useClientAuth()
	const [userId, setUserId] = useState<string | null>(null)
	const [tasks, setTasks] = useState<Task[]>([])
	const [filter, setFilter] = useState<TaskStatus | 'all'>('all')
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
			const interval = setInterval(fetchTasks, 5000) // Fetch tasks every 5 seconds
			return () => clearInterval(interval)
		}
	}, [userId])

	const fetchTasks = async () => {
		if (userId) {
			const fetchedTasks = await getTasks(userId)
			setTasks(fetchedTasks)
		}
	}

	const handleStatusChange = async (id: string, newStatus: TaskStatus) => {
		try {
			await updateTaskStatus(id, newStatus)
			setTasks(prevTasks =>
				prevTasks.map(task =>
					task.id === id ? { ...task, status: newStatus } : task
				)
			)
		} catch (error) {
			console.error('Failed to update task status:', error)
		}
	}

	const filteredTasks = tasks.filter(task => {
		const matchesFilter = filter === 'all' || task.status === filter
		const matchesSearch = task.title
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
		return matchesFilter && matchesSearch
	})

	const tasksByStatus = {
		backlog: filteredTasks.filter(task => task.status === 'backlog'),
		'in-progress': filteredTasks.filter(
			task => task.status === 'in-progress'
		),
		done: filteredTasks.filter(task => task.status === 'done')
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="p-4">
				<div className="flex justify-between items-center mb-4">
					<div className="flex space-x-2">
						<Button
							onClick={() => setViewMode('list')}
							variant={
								viewMode === 'list' ? 'default' : 'outline'
							}
						>
							<List className="h-4 w-4" />
						</Button>
						<Button
							onClick={() => setViewMode('grid')}
							variant={
								viewMode === 'grid' ? 'default' : 'outline'
							}
						>
							<Grid className="h-4 w-4" />
						</Button>
					</div>
					<div className="flex items-center space-x-2">
						<Input
							placeholder="Search tasks..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="w-64"
						/>
						<Search className="h-4 w-4 text-gray-400" />
					</div>
					<CreateTaskPopover />
				</div>
				<div
					className={`${
						viewMode === 'grid'
							? 'grid grid-cols-1 md:grid-cols-3 gap-4'
							: 'space-y-4'
					}`}
				>
					{(['backlog', 'in-progress', 'done'] as TaskStatus[]).map(
						status => (
							<motion.div
								key={status}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
							>
								<TaskList
									tasks={tasksByStatus[status]}
									status={status}
									onStatusChange={handleStatusChange}
								/>
							</motion.div>
						)
					)}
				</div>
			</div>
		</DndProvider>
	)
}
