'use server'

import { getUserAuth } from '../auth/utils'

export type User = {
	id: string
	name?: string
	email?: string
	username?: string
} | null

export async function getUser(): Promise<User> {
	const { session } = await getUserAuth()

	if (!session) {
		return null
	}

	return session.user
}
