'use server'

import { db } from '@/lib/db'
import { goals } from '@/lib/db/schema'
import { getUserAuth } from '@/lib/auth/utils'
import { revalidatePath } from 'next/cache'

export async function createGoal(title: string, targetAmount: string) {
	const { session } = await getUserAuth()
	if (!session) {
		throw new Error('You must be logged in to create a goal')
	}

	await db.insert(goals).values({
		userId: session.user.id,
		title,
		targetAmount,
		currentAmount: '0'
	})

	revalidatePath('/dashboard')
}

export async function getUserGoals() {
	const { session } = await getUserAuth()
	if (!session) {
		return []
	}

	return db.query.goals.findMany({
		where: (goals, { eq }) => eq(goals.userId, session.user.id),
		orderBy: (goals, { desc }) => [desc(goals.createdAt)]
	})
}
