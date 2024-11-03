'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function getUserEmail() {
	try {
		console.log('Getting user email...')
		const session = await auth()
		console.log('Session in getUserEmail:', session)
		return session?.user?.id || null
	} catch (error) {
		console.error('Error in getUserEmail:', error)
		return null
	}
}

export async function getUserName() {
	try {
		console.log('Getting user name...')
		const userId = await getUserEmail()
		console.log('Got userId:', userId)

		if (!userId) {
			console.log('No userId found, returning null')
			return null
		}

		const user = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.id, userId),
			columns: {
				name: true
			}
		})

		console.log('Found user:', user)
		return user?.name || null
	} catch (error) {
		console.error('Error in getUserName:', error)
		return null
	}
}
