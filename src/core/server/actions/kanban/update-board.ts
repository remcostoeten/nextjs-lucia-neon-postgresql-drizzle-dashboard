'use server'

import { db } from '@/core/server/db'
import { Board, boards } from '@/core/server/db/schema'
import { eq } from 'drizzle-orm'

export async function updateBoard(board: Board): Promise<Board> {
	try {
		const [updatedBoard] = await db
			.update(boards)
			.set({
				...board,
				updatedAt: new Date()
			})
			.where(eq(boards.id, board.id))
			.returning()

		if (!updatedBoard) {
			throw new Error(
				'Board update failed: No board returned from database'
			)
		}

		return updatedBoard
	} catch (error) {
		console.error('Error updating board:', error)
		throw new Error('Failed to update board')
	}
}
