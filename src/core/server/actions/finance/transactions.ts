'use server'

import { getUserAuth } from '@/core/server/auth/utils'

import { db, transactions } from 'db'
import { revalidatePath } from 'next/cache'

export async function createTransaction(
	description: string,
	amount: number,
	date: string
) {
	const { session } = await getUserAuth()
	if (!session) {
		throw new Error('You must be logged in to create a transaction')
	}

	await db.insert(transactions).values({
		userId: session.user.id,
		description,
		amount,
		date: new Date(date)
	})

	revalidatePath('/dashboard')
}

export async function getRecentTransactions() {
	const { session } = await getUserAuth()
	if (!session) {
		return []
	}

	return db.query.transactions.findMany({
		where: (transactions, { eq }) =>
			eq(transactions.userId, session.user.id),
		orderBy: (transactions, { desc }) => [desc(transactions.date)],
		limit: 10
	})
}
