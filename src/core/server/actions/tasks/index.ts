'use server'

import { boards, tasks } from '@/core/server/db/schema'
import { NewTask, Subtask, Task } from '@/types/tasks'
import { db } from 'db'
import { and, eq } from 'drizzle-orm'

export async function getTasks(
	userId: string,
	boardId: string
): Promise<Task[]> {
	try {
		return await db
			.select()
			.from(tasks)
			.where(and(eq(tasks.userId, userId), eq(tasks.boardId, boardId)))
	} catch (error) {
		console.error('Error fetching tasks:', error)
		throw new Error('Failed to fetch tasks')
	}
}

export async function createTask(
	userId: string,
	taskData: NewTask & { boardId: string }
): Promise<Task> {
	try {
		const { boardId, ...rest } = taskData
		const [newTask] = await db
			.insert(tasks)
			.values({
				...rest,
				userId,
				boardId,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returning()

		if (!newTask) {
			throw new Error(
				'Task creation failed: No task returned from database'
			)
		}

		return newTask
	} catch (error) {
		console.error('Error creating task:', error)
		throw new Error(
			`Failed to create task: ${error instanceof Error ? error.message : 'Unknown error'}`
		)
	}
}

export async function updateTask(task: Task): Promise<Task> {
	try {
		const [updatedTask] = await db
			.update(tasks)
			.set({
				...task,
				updatedAt: new Date()
			})
			.where(eq(tasks.id, task.id))
			.returning()

		if (!updatedTask) {
			throw new Error(
				'Task update failed: No task returned from database'
			)
		}

		return updatedTask
	} catch (error) {
		console.error('Error updating task:', error)
		throw new Error('Failed to update task')
	}
}

export async function deleteTask(taskId: string): Promise<void> {
	try {
		await db.delete(tasks).where(eq(tasks.id, taskId))
	} catch (error) {
		console.error('Error deleting task:', error)
		throw new Error('Failed to delete task')
	}
}

export async function updateTaskStatus(
	taskId: string,
	newStatus: string
): Promise<void> {
	try {
		await db
			.update(tasks)
			.set({ status: newStatus, updatedAt: new Date() })
			.where(eq(tasks.id, taskId))
	} catch (error) {
		console.error('Error updating task status:', error)
		throw new Error('Failed to update task status')
	}
}

export async function updateBoardStatuses(
	boardId: string,
	newStatuses: string[]
): Promise<void> {
	try {
		await db
			.update(boards)
			.set({ statuses: newStatuses, updatedAt: new Date() })
			.where(eq(boards.id, boardId))
	} catch (error) {
		console.error('Error updating board statuses:', error)
		throw new Error('Failed to update board statuses')
	}
}

export async function updateTaskDueDate(
	taskId: string,
	dueDate: Date | null
): Promise<void> {
	try {
		await db
			.update(tasks)
			.set({ dueDate, updatedAt: new Date() })
			.where(eq(tasks.id, taskId))
	} catch (error) {
		console.error('Error updating task due date:', error)
		throw new Error('Failed to update task due date')
	}
}

export async function updateTaskPriority(
	taskId: string,
	priority: number
): Promise<void> {
	try {
		await db
			.update(tasks)
			.set({ priority, updatedAt: new Date() })
			.where(eq(tasks.id, taskId))
	} catch (error) {
		console.error('Error updating task priority:', error)
		throw new Error('Failed to update task priority')
	}
}

export async function addSubtask(
	taskId: string,
	subtaskTitle: string
): Promise<Subtask> {
	try {
		const [task] = await db
			.select()
			.from(tasks)
			.where(eq(tasks.id, taskId))
			.limit(1)
		if (!task) {
			throw new Error('Task not found')
		}

		const newSubtask: Subtask = {
			id: crypto.randomUUID(),
			title: subtaskTitle,
			completed: false
		}

		const updatedSubtasks = [...(task.subtasks as Subtask[]), newSubtask]

		await db
			.update(tasks)
			.set({ subtasks: updatedSubtasks, updatedAt: new Date() })
			.where(eq(tasks.id, taskId))

		return newSubtask
	} catch (error) {
		console.error('Error adding subtask:', error)
		throw new Error('Failed to add subtask')
	}
}

export async function updateSubtask(
	taskId: string,
	subtaskId: string,
	updatedSubtask: Partial<Subtask>
): Promise<void> {
	try {
		const [task] = await db
			.select()
			.from(tasks)
			.where(eq(tasks.id, taskId))
			.limit(1)
		if (!task) {
			throw new Error('Task not found')
		}

		const updatedSubtasks = (task.subtasks as Subtask[]).map(subtask =>
			subtask.id === subtaskId
				? { ...subtask, ...updatedSubtask }
				: subtask
		)

		await db
			.update(tasks)
			.set({ subtasks: updatedSubtasks, updatedAt: new Date() })
			.where(eq(tasks.id, taskId))
	} catch (error) {
		console.error('Error updating subtask:', error)
		throw new Error('Failed to update subtask')
	}
}

export async function removeSubtask(
	taskId: string,
	subtaskId: string
): Promise<void> {
	try {
		const [task] = await db
			.select()
			.from(tasks)
			.where(eq(tasks.id, taskId))
			.limit(1)
		if (!task) {
			throw new Error('Task not found')
		}

		const updatedSubtasks = (task.subtasks as Subtask[]).filter(
			subtask => subtask.id !== subtaskId
		)

		await db
			.update(tasks)
			.set({ subtasks: updatedSubtasks, updatedAt: new Date() })
			.where(eq(tasks.id, taskId))
	} catch (error) {
		console.error('Error removing subtask:', error)
		throw new Error('Failed to remove subtask')
	}
}

export async function addTaskDependency(
	taskId: string,
	dependencyId: string
): Promise<void> {
	try {
		const [task] = await db
			.select()
			.from(tasks)
			.where(eq(tasks.id, taskId))
			.limit(1)
		if (!task) {
			throw new Error('Task not found')
		}

		const updatedDependencies = [...(task.dependencies || []), dependencyId]

		await db
			.update(tasks)
			.set({ updatedAt: new Date() })
			.where(eq(tasks.id, taskId))
	} catch (error) {
		console.error('Error adding task dependency:', error)
		throw new Error('Failed to add task dependency')
	}
}

export async function removeTaskDependency(
	taskId: string,
	dependencyId: string
): Promise<void> {
	try {
		const [task] = await db
			.select()
			.from(tasks)
			.where(eq(tasks.id, taskId))
			.limit(1)
		if (!task) {
			throw new Error('Task not found')
		}

		const updatedDependencies = (task.dependencies || []).filter(
			id => id !== dependencyId
		)

		await db
			.update(tasks)
			.set({ dependencies: updatedDependencies, updatedAt: new Date() })
			.where(eq(tasks.id, taskId))
	} catch (error) {
		console.error('Error removing task dependency:', error)
		throw new Error('Failed to remove task dependency')
	}
}

export async function updateTaskTimeTracking(
	taskId: string,
	actualTime: number
): Promise<void> {
	try {
		await db
			.update(tasks)
			.set({ actualTime, updatedAt: new Date() })
			.where(eq(tasks.id, taskId))
	} catch (error) {
		console.error('Error updating task time tracking:', error)
		throw new Error('Failed to update task time tracking')
	}
}

export async function addComment(
	taskId: string,
	comment: string
): Promise<void> {
	try {
		const [task] = await db
			.select()
			.from(tasks)
			.where(eq(tasks.id, taskId))
			.limit(1)
		if (!task) {
			throw new Error('Task not found')
		}

		const newComment = {
			id: crypto.randomUUID(),
			content: comment,
			createdAt: new Date().toISOString(),
			userId: task.userId
		}

		const updatedComments = [...(task.comments || []), newComment]

		await db
			.update(tasks)
			.set({ comments: updatedComments, updatedAt: new Date() })
			.where(eq(tasks.id, taskId))
	} catch (error) {
		console.error('Error adding comment:', error)
		throw new Error('Failed to add comment')
	}
}
