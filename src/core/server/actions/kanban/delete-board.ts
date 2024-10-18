'use server'

import { db } from '@/core/server/db'
import { boards, tasks } from '@/core/server/db/schema'
import { eq } from 'drizzle-orm'

export async function deleteBoard(boardId: string): Promise<void> {
	try {
		await db.transaction(async trx => {
			// Delete all tasks associated with the board
			await trx.delete(tasks).where(eq(tasks.boardId, boardId))
			// Delete the board
			await trx.delete(boards).where(eq(boards.id, boardId))
		})
	} catch (error) {
		console.error('Error deleting board:', error)
		throw new Error('Failed to delete board')
	}
}
