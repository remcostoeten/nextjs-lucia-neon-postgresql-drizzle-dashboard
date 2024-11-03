'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/auth'
import {
	deleteAccountSchema,
	emailSchema,
	nameSchema,
	type DeleteAccountData
} from '@/lib/models/user.schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export async function updateUserName(data: { name: string }) {
	try {
		const validated = nameSchema.parse({ name: data.name })
		const session = await auth()

		if (!session?.user?.id) {
			return { error: 'Unauthorized' }
		}

		const [updatedUser] = await db
			.update(users)
			.set({ name: validated.name })
			.where(eq(users.id, session.user.id))
			.returning({
				id: users.id,
				name: users.name,
				email: users.email
			})

		return { data: updatedUser }
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { error: error.errors[0].message }
		}
		console.error('Error updating user name:', error)
		return { error: 'Failed to update name' }
	}
}

export async function updateUserEmail(data: { email: string }) {
	try {
		const validated = emailSchema.parse({ email: data.email })
		const session = await auth()

		if (!session?.user?.id) {
			return { error: 'Unauthorized' }
		}

		// Check if email is already taken
		const existingUser = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.email, validated.email),
			columns: {
				id: true,
				email: true
			}
		})

		if (existingUser && existingUser.id !== session.user.id) {
			return { error: 'Email already in use' }
		}

		const [updatedUser] = await db
			.update(users)
			.set({ email: validated.email })
			.where(eq(users.id, session.user.id))
			.returning({
				id: users.id,
				name: users.name,
				email: users.email
			})

		return { data: updatedUser }
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { error: error.errors[0].message }
		}
		console.error('Error updating user email:', error)
		return { error: 'Failed to update email' }
	}
}

export async function deleteUserAccount(data: DeleteAccountData) {
	try {
		const validated = deleteAccountSchema.parse(data)
		const session = await auth()

		if (!session?.user?.id) {
			return { error: 'Unauthorized' }
		}

		await db.delete(users).where(eq(users.id, session.user.id))

		return { success: true }
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { error: error.errors[0].message }
		}
		console.error('Error deleting account:', error)
		return { error: 'Failed to delete account' }
	}
}
