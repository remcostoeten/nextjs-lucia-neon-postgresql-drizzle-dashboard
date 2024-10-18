import { Task, TaskStatus } from '@/types/tasks'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'ui'
import CreateTaskPopover from '../tasks/create-task-popover'
import TaskDetailPopover from '../tasks/task-detail-popover'
import TaskList from '../tasks/task-list'

type TaskViewProps = {
	tasks: Task[]
	viewMode: 'list' | 'grid'
	onTasksChange: (tasks: Task[]) => void
	selectedBoard: string | null
	onTaskStatusChange: (taskId: string, newStatus: TaskStatus) => void
}

export default function TaskView({
	tasks,
	viewMode,
	onTasksChange,
	selectedBoard,
	onTaskStatusChange
}: TaskViewProps) {
	const [selectedTask, setSelectedTask] = useState<Task | null>(null)
	const [isDetailPopoverOpen, setIsDetailPopoverOpen] = useState(false)
	const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)

	const tasksByStatus: { [key: string]: Task[] } = {
		backlog: tasks.filter(
			(task: Task): task is Task => task.status === 'backlog'
		),
		'in-progress': tasks.filter(
			(task: Task): task is Task => task.status === 'in-progress'
		),
		completed: tasks.filter(
			(task: Task): task is Task => task.status === 'completed'
		)
	}

	const handleTaskClick = (task: Task) => {
		setSelectedTask(task)
		setIsDetailPopoverOpen(true)
	}

	const handleCreateTask = (newTask: Task) => {
		onTasksChange([...tasks, newTask])
		setIsCreateTaskOpen(false)
	}

	return (
		<div
			className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}
		>
			{(['backlog', 'in-progress', 'completed'] as const).map(status => (
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
						onStatusChange={onTaskStatusChange}
						onTaskClick={handleTaskClick}
					/>
					{viewMode === 'grid' && (
						<Button
							variant="outline"
							className="w-full mt-4 bg-[#3C3C3C] text-white border-gray-600 hover:bg-[#4C4C4C]"
							onClick={() => setIsCreateTaskOpen(true)}
						>
							<Plus className="h-4 w-4 mr-2" />
							Add Task
						</Button>
					)}
				</motion.div>
			))}
			{selectedTask && (
				<TaskDetailPopover
					task={selectedTask}
					onClose={() => setIsDetailPopoverOpen(false)}
					onStatusChange={onTaskStatusChange}
					onTaskUpdated={updatedTask => {
						const updatedTasks = tasks.map(t =>
							t.id === updatedTask.id ? updatedTask : t
						)
						onTasksChange(updatedTasks)
					}}
					onTaskDeleted={deletedTaskId => {
						const updatedTasks = tasks.filter(
							t => t.id !== deletedTaskId
						)
						onTasksChange(updatedTasks)
					}}
					allTasks={tasks}
					isOpen={isDetailPopoverOpen}
				/>
			)}
			<CreateTaskPopover
				onTaskCreated={handleCreateTask}
				isOpen={isCreateTaskOpen}
				setIsOpen={setIsCreateTaskOpen}
				boardId={selectedBoard}
			/>
		</div>
	)
}
