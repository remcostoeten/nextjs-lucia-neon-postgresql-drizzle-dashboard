export type TaskStatus = 'backlog' | 'in-progress' | 'completed'
export type TaskPriority = 1 | 2 | 3

export type Subtask = {
	id: string
	title: string
	completed: boolean
}

export type Comment = {
	id: string
	content: string
	createdAt: string
	userId: string
}

export type Task = {
	id: string
	title: string
	content: string
	status: TaskStatus
	priority: TaskPriority
	labels: string[]
	dueDate: string | null
	estimatedTime: number | null
	actualTime: number | null
	assignee: string | null
	subtasks: Subtask[]
	comments: Comment[]
	createdAt: string
	updatedAt: string
	dependencies: string[]
}

export type NewTask = {
	subtasks: any[]
	title: string
	content: string
	status: TaskStatus
	priority: TaskPriority
	labels: string[]
	dueDate: string | null
	estimatedTime: number | null
}
