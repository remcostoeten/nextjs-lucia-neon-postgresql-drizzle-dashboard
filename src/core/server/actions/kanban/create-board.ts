'use server'

import { db } from '@/core/server/db'
import { boards } from '@/core/server/db/schema'
import { Board } from '@/types/tasks'
import { eq } from 'drizzle-orm'

export async function createBoard(
	userId: string,
	boardData: { name: string; description?: string; lanes?: string[] }
): Promise<Board> {
	try {
		if (!userId) {
			throw new Error('User ID is required')
		}

		if (!boardData.name) {
			throw new Error('Board name is required')
		}

		const [newBoard] = await db
			.insert(boards)
			.values({
				userId,
				name: boardData.name,
				description: boardData.description || null,
				lanes: boardData.lanes || [
					'Backlog',
					'In Progress',
					'Completed'
				],
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returning()

		if (!newBoard) {
			throw new Error(
				'Board creation failed: No board returned from database'
			)
		}

		return newBoard
	} catch (error) {
		console.error('Error creating board:', error)
		throw new Error(
			`Failed to create board: ${error instanceof Error ? error.message : 'Unknown error'}`
		)
	}
}
