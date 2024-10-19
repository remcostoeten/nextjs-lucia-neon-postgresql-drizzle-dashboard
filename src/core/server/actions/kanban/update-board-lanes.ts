'use server'

import { db } from '@/core/server/db'
import { boards } from '@/core/server/db/schema'
import { Board } from '@/types/tasks'
import { eq } from 'drizzle-orm'

export async function updateBoardLanes(
	boardId: string,
	lanes: string[]
): Promise<void> {
	try {
		await db
			.update(boards)
			.set({ lanes, updatedAt: new Date() })
			.where(eq(boards.id, boardId))
	} catch (error) {
		console.error('Error updating board lanes:', error)
		throw new Error('Failed to update board lanes')
	}
}
