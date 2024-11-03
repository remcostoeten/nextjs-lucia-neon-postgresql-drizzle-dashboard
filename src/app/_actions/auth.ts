'use server'

import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/auth'
import { hash } from 'bcryptjs'

export async function registerUser(data: { email: string; password: string }) {
	try {
		const hashedPassword = await hash(data.password, 10)

		const [newUser] = await db
			.insert(users)
			.values({
				email: data.email,
				password: hashedPassword
			})
			.returning({
				id: users.id,
				email: users.email
			})

		if (!newUser) {
			return { error: 'Failed to create user' }
		}

		return { success: true, user: newUser }
	} catch (error) {
		console.error('Registration error:', error)
		return { error: 'Failed to register' }
	}
}
