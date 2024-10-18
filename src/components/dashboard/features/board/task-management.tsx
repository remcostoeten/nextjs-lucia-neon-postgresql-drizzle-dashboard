import { useClientAuth } from '@/core/server/auth/client-auth-utils'
import { Board, Task, TaskStatus } from '@/types/tasks'
import { deleteTask, getBoards, getTasks, updateTaskStatus } from 'actions'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button, Card, CardContent, CardHeader } from 'ui'
import TaskList from '../tasks/task-list'
import CreateBoardModal from './create-board'
export default function TaskManagement() {
	const { getClientSession } = useClientAuth()
	const [userId, setUserId] = useState<string | null>(null)
	const [boards, setBoards] = useState<Board[]>([])
	const [selectedBoard, setSelectedBoard] = useState<string | null>(null)
	const [tasks, setTasks] = useState<Task[]>([])
	const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false)
	const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')

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
			fetchBoards()
		}
	}, [userId])

	useEffect(() => {
		if (userId && selectedBoard) {
			fetchTasks()
		}
	}, [userId, selectedBoard])

	const fetchBoards = async () => {
		if (userId) {
			try {
				const fetchedBoards = await getBoards(userId)
				setBoards(fetchedBoards)
				if (fetchedBoards.length > 0) {
					setSelectedBoard(fetchedBoards[0].id)
				}
			} catch (error) {
				console.error('Error fetching boards:', error)
				toast.error('Failed to fetch boards')
			}
		}
	}

	const fetchTasks = async () => {
		if (userId && selectedBoard) {
			try {
				const fetchedTasks = await getTasks(userId, selectedBoard)
				setTasks(fetchedTasks)
			} catch (error) {
				console.error('Error fetching tasks:', error)
				toast.error('Failed to fetch tasks')
			}
		}
	}

	const handleCreateBoard = async (newBoard: Board) => {
		setBoards([...boards, newBoard])
		setSelectedBoard(newBoard.id)
		setIsCreateBoardOpen(false)
		toast.success('Board created successfully')
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
			toast.error('Failed to update task status')
		}
	}

	const handleTaskUpdated = () => {
		fetchTasks()
	}

	const handleDeleteTask = async (taskId: string) => {
		try {
			await deleteTask(taskId)
			fetchTasks()
			toast.success('Task deleted successfully')
		} catch (error) {
			console.error('Failed to delete task:', error)
			toast.error('Failed to delete task')
		}
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Task Management</h1>
				<Button onClick={() => setIsCreateBoardOpen(true)}>
					<Plus className="mr-2 h-4 w-4" /> Create New Board
				</Button>
			</div>

			<div className="mb-6">
				<select
					value={selectedBoard || ''}
					onChange={e => setSelectedBoard(e.target.value)}
					className="w-full p-2 border rounded"
				>
					{boards.map(board => (
						<option key={board.id} value={board.id}>
							{board.name}
						</option>
					))}
				</select>
			</div>

			{selectedBoard && (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{(['backlog', 'in-progress', 'completed'] as const).map(
						status => (
							<Card
								key={status}
								className="bg-white shadow-lg rounded-lg overflow-hidden"
							>
								<CardHeader className="bg-gray-100 p-4">
									<h2 className="text-xl font-semibold capitalize">
										{status.replace('-', ' ')}
									</h2>
								</CardHeader>
								<CardContent className="p-4">
									<TaskList
										tasks={tasks.filter(
											task => task.status === status
										)}
										status={status}
										onStatusChange={handleStatusChange}
										onTaskDeleted={handleDeleteTask}
									/>
								</CardContent>
							</Card>
						)
					)}
				</div>
			)}

			{userId && (
				<CreateBoardModal
					isOpen={isCreateBoardOpen}
					onClose={() => setIsCreateBoardOpen(false)}
					onBoardCreated={handleCreateBoard}
					userId={userId}
				/>
			)}
		</div>
	)
}
