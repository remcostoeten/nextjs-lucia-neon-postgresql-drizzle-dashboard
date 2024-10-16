import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Task, TaskStatus } from '@/types/tasks.d'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { useDrag } from 'react-dnd'

type TaskItemProps = {
	task: Task
	onStatusChange: (id: string, newStatus: TaskStatus) => void
}

export default function TaskItem({ task, onStatusChange }: TaskItemProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	const [{ isDragging }, drag] = useDrag({
		type: 'TASK',
		item: { id: task.id, status: task.status },
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	})

	return (
		<motion.div
			ref={drag}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className={`bg-[#3C3C3C] rounded-lg shadow mb-2 cursor-grab ${isDragging ? 'opacity-50' : ''}`}
		>
			<div className="p-4">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center space-x-4">
						<Checkbox
							checked={task.status === 'completed'}
							onCheckedChange={checked =>
								onStatusChange(
									task.id,
									checked ? 'completed' : 'backlog'
								)
							}
							className="border-gray-600"
						/>
						<span
							className={
								task.status === 'completed'
									? 'line-through'
									: ''
							}
						>
							{task.title}
						</span>
					</div>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setIsExpanded(!isExpanded)}
						className="text-gray-400 hover:text-white"
					>
						{isExpanded ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</Button>
				</div>
				{isExpanded && (
					<div className="mt-2 space-y-2">
						<p className="text-sm text-gray-400">{task.content}</p>
						{task.assignee && (
							<div className="flex items-center space-x-2">
								<span className="text-sm text-gray-400">
									Assignee:
								</span>
								<span className="text-sm">
									{task.assignee.name}
								</span>
							</div>
						)}
						{task.dueDate && (
							<div className="flex items-center space-x-2">
								<CalendarIcon className="h-4 w-4 text-gray-400" />
								<span className="text-sm">
									{format(new Date(task.dueDate), 'PPP')}
								</span>
							</div>
						)}
						<div className="flex flex-wrap gap-2">
							{task.labels.map(label => (
								<Badge
									key={label}
									variant="secondary"
									className="bg-[#4C4C4C] text-white"
								>
									{label}
								</Badge>
							))}
						</div>
						{task.description && (
							<div>
								<span className="text-sm text-gray-400">
									Description:
								</span>
								<p className="text-sm mt-1">
									{task.description}
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</motion.div>
	)
}
