export type TaskStatus = 'backlog' | 'in-progress' | 'completed'

export type Subtask = {
	id: string
	title: string
	completed: boolean
}

export type Task = {
	id: string
	title: string
	content: string
	status: TaskStatus
	dueDate?: Date
	createdAt: Date
	updatedAt: Date
	priority?: number
	subtasks: Subtask[]
	userId: string
	labels: string[]
}

export type NewTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
