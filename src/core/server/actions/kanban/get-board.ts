'use server'

import { db } from '@/core/server/db'
import { Board, boards } from '@/core/server/db/schema'
import { eq } from 'drizzle-orm'

export async function getBoards(userId: string): Promise<Board[]> {
	try {
		return await db.select().from(boards).where(eq(boards.userId, userId))
	} catch (error) {
		console.error('Error fetching boards:', error)
		throw new Error('Failed to fetch boards')
	}
}
