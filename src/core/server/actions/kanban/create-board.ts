'use server'

import { db } from '@/core/server/db'
import { boards } from '@/core/server/db/schema'
import { Board } from '@/types/tasks'

export async function createBoard(
	userId: string,
	boardData: { name: string; description?: string }
): Promise<Board> {
	try {
		const newBoard = await db
			.insert(boards)
			.values({
				userId,
				name: boardData.name,
				description: boardData.description || null,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returning()

		if (!newBoard) {
			throw new Error(
				'Board creation failed: No board returned from database'
			)
		}
		return {
			id: newBoard[0].id,
			name: newBoard[0].name,
			description: newBoard[0].description || '',
			createdAt: newBoard[0].createdAt,
			updatedAt: newBoard[0].updatedAt
		}
	} catch (error) {
		console.error('Error creating board:', error)
		throw new Error(
			`Failed to create board: ${error instanceof Error ? error.message : 'Unknown error'}`
		)
	}
}
