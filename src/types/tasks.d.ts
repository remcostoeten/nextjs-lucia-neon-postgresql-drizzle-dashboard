export type TaskStatus = 'backlog' | 'in-progress' | 'completed'
export type TaskPriority = 1 | 2 | 3

export type Board = {
	id: string
	name: string
	description?: string
	userId: string
	statuses: string[]
	createdAt: Date
	updatedAt: Date
}

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

export interface Task {
	estimatedTime: any
	actualTime: null
	assignee: any
	subtasks: boolean
	dependencies: boolean
	id: string
	boardId: string
	title: string
	content: string
	status: string
	priority: 1 | 2 | 3
	dueDate: Date | null
	createdAt: Date
	updatedAt: Date
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

export type TaskStatus = 'backlog' | 'in-progress' | 'completed'
export type TaskPriority = 1 | 2 | 3
