'use server'

import { db } from '@/lib/db'
import { labels, taskLabels, tasks } from '@/lib/db/schema'
import { NewTask, Subtask, Task, TaskStatus } from '@/types/tasks'
import { and, eq } from 'drizzle-orm'

export async function getTasks(userId: string): Promise<Task[]> {
	try {
		const tasksData = await db
			.select()
			.from(tasks)
			.where(eq(tasks.userId, userId))
		const tasksWithLabels = await Promise.all(
			tasksData.map(async task => {
				const taskLabelsData = await db
					.select()
					.from(taskLabels)
					.innerJoin(labels, eq(taskLabels.labelId, labels.id))
					.where(eq(taskLabels.taskId, task.id))

				const labelNames = taskLabelsData.map(tl => tl.label.name)
				return {
					...task,
					labels: labelNames,
					subtasks: task.subtasks as Subtask[]
				}
			})
		)
		return tasksWithLabels
	} catch (error) {
		console.error('Error fetching tasks:', error)
		throw new Error('Failed to fetch tasks')
	}
}

export async function createTask(
	userId: string,
	taskData: NewTask
): Promise<Task> {
	try {
		const [newTask] = await db
			.insert(tasks)
			.values({
				...taskData,
				userId,
				createdAt: new Date(),
				updatedAt: new Date(),
				subtasks: taskData.subtasks || []
			})
			.returning()

		if (!newTask) {
			throw new Error(
				'Task creation failed: No task returned from database'
			)
		}

		if (taskData.labels && taskData.labels.length > 0) {
			for (const labelName of taskData.labels) {
				await addTaskLabel(newTask.id, labelName)
			}
		}

		return {
			...newTask,
			labels: taskData.labels || [],
			subtasks: newTask.subtasks as Subtask[]
		}
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

		// Update labels
		await db.delete(taskLabels).where(eq(taskLabels.taskId, task.id))
		for (const labelName of task.labels) {
			await addTaskLabel(task.id, labelName)
		}

		return {
			...updatedTask,
			labels: task.labels,
			subtasks: updatedTask.subtasks as Subtask[]
		}
	} catch (error) {
		console.error('Error updating task:', error)
		throw new Error('Failed to update task')
	}
}

export async function deleteTask(taskId: string): Promise<void> {
	try {
		await db.delete(taskLabels).where(eq(taskLabels.taskId, taskId))
		await db.delete(tasks).where(eq(tasks.id, taskId))
	} catch (error) {
		console.error('Error deleting task:', error)
		throw new Error('Failed to delete task')
	}
}

export async function updateTaskStatus(
	taskId: string,
	newStatus: TaskStatus
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

export async function addTaskLabel(
	taskId: string,
	labelName: string
): Promise<void> {
	try {
		const [existingLabel] = await db
			.select()
			.from(labels)
			.where(eq(labels.name, labelName))
			.limit(1)

		let labelId: string
		if (existingLabel) {
			labelId = existingLabel.id
		} else {
			const [newLabel] = await db
				.insert(labels)
				.values({ name: labelName })
				.returning({ id: labels.id })
			labelId = newLabel.id
		}

		await db.insert(taskLabels).values({ taskId, labelId })
	} catch (error) {
		console.error('Error adding task label:', error)
		throw new Error('Failed to add task label')
	}
}

export async function removeTaskLabel(
	taskId: string,
	labelName: string
): Promise<void> {
	try {
		const [label] = await db
			.select()
			.from(labels)
			.where(eq(labels.name, labelName))
			.limit(1)
		if (label) {
			await db
				.delete(taskLabels)
				.where(
					and(
						eq(taskLabels.taskId, taskId),
						eq(taskLabels.labelId, label.id)
					)
				)
		}
	} catch (error) {
		console.error('Error removing task label:', error)
		throw new Error('Failed to remove task label')
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

export async function getLabels(userId: string): Promise<string[]> {
	try {
		const labelsData = await db
			.select()
			.from(labels)
			.where(eq(labels.userId, userId))
		return labelsData.map(label => label.name)
	} catch (error) {
		console.error('Error fetching labels:', error)
		throw new Error('Failed to fetch labels')
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
			.set({ dependencies: updatedDependencies, updatedAt: new Date() })
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

export default async function (): Promise<null> {
	return null
}
