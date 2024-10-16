import { Task, TaskStatus } from '@/types/tasks.d'
import { useDrop } from 'react-dnd'
import TaskItem from './task-item'

type TaskListProps = {
	tasks: Task[]
	status: TaskStatus | 'all'
	onStatusChange: (id: string, newStatus: TaskStatus) => void
}

export default function TaskList({
	tasks,
	status,
	onStatusChange
}: TaskListProps) {
	const [, drop] = useDrop({
		accept: 'TASK',
		drop: (item: { id: string; status: TaskStatus }) => {
			if (item.status !== status && status !== 'all') {
				onStatusChange(item.id, status)
			}
		}
	})

	return (
		<div ref={drop} className="bg-[#2C2C2C] p-4 rounded-lg">
			<h2 className="text-xl font-semibold mb-4 capitalize">
				{status === 'all' ? 'All Tasks' : status.replace('-', ' ')}
			</h2>
			<div className="space-y-4">
				{tasks.map(task => (
					<TaskItem
						key={task.id}
						task={task}
						onStatusChange={onStatusChange}
					/>
				))}
			</div>
		</div>
	)
}
