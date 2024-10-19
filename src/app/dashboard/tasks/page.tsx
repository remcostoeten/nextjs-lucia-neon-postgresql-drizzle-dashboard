import TaskManagement from "@/components/dashboard/features/tasks/task-managment"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Task Management & Kanban board',
	description:
		'Manage your tasks efficiently with our task management system.'
}

export default function TaskPage() {
	return <TaskManagement />
}
