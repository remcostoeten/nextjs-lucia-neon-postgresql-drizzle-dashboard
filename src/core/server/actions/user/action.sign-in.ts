'use server'

import { ActionResult } from '@/types/types.users'
import { logActivity } from 'actions'
import { db } from 'db'
import { eq } from 'drizzle-orm'
import { Argon2id } from 'oslo/password'
import { lucia } from '../../auth/lucia'
import { setAuthCookie, validateAuthFormData } from '../../auth/utils'
import { users } from '../../db/schema/auth'

export async function signInAction(
	_: ActionResult,
	formData: FormData
): Promise<ActionResult> {
	const { data, error } = validateAuthFormData(formData)
	if (error !== null) return { error, success: false }

	try {
		const [existingUser] = await db
			.select()
			.from(users)
			.where(eq(users.email, data.email.toLowerCase()))

		if (!existingUser) {
			return {
				error: 'No account found with this email address',
				success: false
			}
		}

		const validPassword = await new Argon2id().verify(
			existingUser.hashedPassword,
			data.password
		)

		if (!validPassword) {
			return {
				error: 'Incorrect password',
				success: false
			}
		}

		const session = await lucia.createSession(existingUser.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		setAuthCookie(sessionCookie)

		await logActivity(
			existingUser.id,
			'Sign In',
			'User signed in successfully',
			{
				email: existingUser.email,
				timestamp: new Date().toISOString(),
				device: formData.get('device') as string,
				location: formData.get('location') as string,
				timezone: formData.get('timezone') as string,
				lastPage: formData.get('lastPage') as string,
				os: formData.get('os') as string
			}
		)

		return { error: null, success: true, message: 'Signed in successfully' }
	} catch (e) {
		console.error('Sign-in error:', e)
		return {
			error: 'An unexpected error occurred. Please try again later.',
			success: false
		}
	}
}
