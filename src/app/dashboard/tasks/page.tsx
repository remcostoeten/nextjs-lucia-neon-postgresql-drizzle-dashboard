import TaskManagement from '@/components/dashboard/features/tasks/task-management'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Task Management',
	description:
		'Manage your tasks efficiently with our task management system.'
}

export default function TaskPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8 text-white">
				Task Management
			</h1>
			<TaskManagement />
		</div>
	)
}
