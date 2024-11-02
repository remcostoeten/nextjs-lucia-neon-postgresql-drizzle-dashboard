'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/auth'
import { eq } from 'drizzle-orm'

export async function getUserInfo() {
	try {
		const session = await auth()
		console.log('Session:', session)

		if (!session?.user?.email) {
			throw new Error('Unauthorized')
		}

		console.log('Searching for user with email:', session.user.email)

		const user = await db
			.select({
				id: users.id,
				name: users.name,
				email: users.email,
				image: users.image,
				emailVerified: users.emailVerified,
				username: users.username
			})
			.from(users)
			.where(eq(users.email, session.user.email))

		console.log('Query result:', user)

		if (!user || user.length === 0) {
			throw new Error('User not found')
		}

		return user[0]
	} catch (error) {
		console.error('Error fetching user info:', error)
		throw error
	}
}
