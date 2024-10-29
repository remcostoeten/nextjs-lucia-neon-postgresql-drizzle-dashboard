'use server'

import { getUserAuth } from '@/core/server/auth/utils'
import { budgets } from '@/core/server/db/schema'

import { db } from 'db'
import { revalidatePath } from 'next/cache'

export async function createMonthlyBudget(
	title: string,
	amount: string,
	month: string,
	description?: string
) {
	const { session } = await getUserAuth()
	if (!session) {
		throw new Error('You must be logged in to create a budget')
	}

	await db.insert(budgets).values({
		userId: session.user.id,
		title,
		amount,
		month,
		description
	})

	revalidatePath('/dashboard')
}

export async function getUserMonthlyBudgets() {
	const { session } = await getUserAuth()
	if (!session) {
		return []
	}

	return db.query.budgets.findMany({
		where: (budgets, { eq }) => eq(budgets.userId, session.user.id),
		orderBy: (budgets, { desc }) => [desc(budgets.month)]
	})
}
