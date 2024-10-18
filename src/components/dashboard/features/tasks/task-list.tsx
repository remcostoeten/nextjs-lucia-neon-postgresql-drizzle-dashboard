import { Task, TaskPriority, TaskStatus } from '@/types/tasks'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import {
	AlertCircle,
	AlertTriangle,
	Calendar,
	CheckCircle2,
	Clock,
	Link,
	Trash2,
	User
} from 'lucide-react'
import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Button } from 'ui'
import TaskDetailPopover from './task-detail-popover'

type TaskListProps = {
	tasks: Task[]
	status: TaskStatus
	onStatusChange: (id: string, status: TaskStatus) => void
	viewMode: 'list' | 'grid'
	onTaskUpdated: () => void
	onTaskDeleted: (id: string) => void
	allTasks: Task[]
}

const TaskItem = ({
	task,
	viewMode,
	onStatusChange,
	onTaskDeleted,
	setSelectedTask
}: {
	task: Task
	viewMode: 'list' | 'grid'
	onStatusChange: (id: string, status: TaskStatus) => void
	onTaskDeleted: (id: string) => void
	setSelectedTask: (task: Task) => void
}) => {
	const [{ isDragging }, drag] = useDrag({
		type: 'task',
		item: { id: task.id },
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	})

	const getPriorityIcon = (priority: TaskPriority) => {
		switch (priority) {
			case 1:
				return <AlertTriangle className="h-4 w-4 text-green-500" />
			case 2:
				return <AlertCircle className="h-4 w-4 text-yellow-500" />
			case 3:
				return <AlertTriangle className="h-4 w-4 text-red-500" />
			default:
				return null
		}
	}

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)
		return `${hours}h ${minutes}m`
	}

	return (
		<motion.div
			ref={drag}
			layoutId={task.id}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			className={`bg-[#3C3C3C] p-4 rounded-lg shadow-md cursor-move ${
				viewMode === 'list' ? 'flex items-center justify-between' : ''
			}`}
		>
			<div
				className={viewMode === 'list' ? 'flex-grow' : ''}
				onClick={() => setSelectedTask(task)}
			>
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-lg font-semibold">{task.title}</h3>
					{getPriorityIcon(task.priority)}
				</div>
				<p className="text-gray-300 mb-2 line-clamp-2">
					{task.content}
				</p>
				<div className="flex flex-wrap gap-2 mb-2">
					<div className="flex items-center text-sm text-gray-400">
						<Calendar className="h-4 w-4 mr-1" />
						{task.dueDate
							? format(new Date(task.dueDate), 'MMM d, yyyy')
							: 'No due date'}
					</div>
					{task.estimatedTime && (
						<div className="flex items-center text-sm text-gray-400">
							<Clock className="h-4 w-4 mr-1" />
							Est: {task.estimatedTime}h
						</div>
					)}
					{task.actualTime !== null && (
						<div className="flex items-center text-sm text-gray-400">
							<Clock className="h-4 w-4 mr-1" />
							Actual: {formatTime(task.actualTime)}
						</div>
					)}
					{task.assignee && (
						<div className="flex items-center text-sm text-gray-400">
							<User className="h-4 w-4 mr-1" />
							{task.assignee}
						</div>
					)}
				</div>
				{task.subtasks && task.subtasks.length > 0 && (
					<div className="text-sm text-gray-400 mb-2">
						<CheckCircle2 className="h-4 w-4 inline mr-1" />
						{
							task.subtasks.filter(subtask => subtask.completed)
								.length
						}{' '}
						/ {task.subtasks.length} subtasks
					</div>
				)}
				{task.dependencies && task.dependencies.length > 0 && (
					<div className="text-sm text-gray-400">
						<Link className="h-4 w-4 inline mr-1" />
						{task.dependencies.length}{' '}
						{task.dependencies.length === 1
							? 'dependency'
							: 'dependencies'}
					</div>
				)}
			</div>
			<div className="flex items-center gap-2 mt-2">
				{viewMode === 'list' && (
					<select
						value={task.status}
						onChange={e =>
							onStatusChange(
								task.id,
								e.target.value as TaskStatus
							)
						}
						className="bg-[#2C2C2C] text-white border-gray-600 rounded p-1"
					>
						<option value="backlog">Backlog</option>
						<option value="in-progress">In Progress</option>
						<option value="completed">Completed</option>
					</select>
				)}
				<Button
					variant="destructive"
					size="sm"
					onClick={e => {
						e.stopPropagation()
						onTaskDeleted(task.id)
					}}
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		</motion.div>
	)
}

export default function TaskList({
	tasks,
	status,
	onStatusChange,
	viewMode,
	onTaskUpdated,
	onTaskDeleted,
	allTasks
}: TaskListProps) {
	const [selectedTask, setSelectedTask] = useState<Task | null>(null)

	const [, drop] = useDrop({
		accept: 'task',
		drop: (item: { id: string }) => onStatusChange(item.id, status)
	})

	return (
		<div
			ref={drop}
			className={`space-y-4 ${viewMode === 'grid' ? 'min-h-[200px]' : ''}`}
		>
			{tasks.map(task => (
				<TaskItem
					key={task.id}
					task={task}
					viewMode={viewMode}
					onStatusChange={onStatusChange}
					onTaskDeleted={onTaskDeleted}
					setSelectedTask={setSelectedTask}
				/>
			))}
			{selectedTask && (
				<TaskDetailPopover
					task={selectedTask}
					onClose={() => setSelectedTask(null)}
					onStatusChange={onStatusChange}
					onTaskUpdated={onTaskUpdated}
					onTaskDeleted={onTaskDeleted}
					allTasks={allTasks}
					isOpen={false}
				/>
			)}
		</div>
	)
}
