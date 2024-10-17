'use server'

import { ActionResult } from '@/types/types.users'
import { logActivity } from 'actions'
import { db, users } from 'db'
import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'
import { lucia } from '../../auth/lucia'
import {
	genericError,
	setAuthCookie,
	validateAuthFormData
} from '../../auth/utils'

export default async function signUpAction(
	_: ActionResult,
	formData: FormData
): Promise<ActionResult | { userId: string }> {
	const { data, error } = validateAuthFormData(formData)

	if (error !== null) return { error, success: false }

	try {
		const hashedPassword = await new Argon2id().hash(data.password)
		const userId = generateId(15)

		await db.insert(users).values({
			id: userId,
			email: data.email,
			hashedPassword
		})

		const session = await lucia.createSession(userId, {})

		await logActivity('Sign Up', 'User registered successfully', userId, {
			email: data.email,
			timestamp: new Date().toISOString(),
			device: formData.get('device') as string,
			location: formData.get('location') as string,
			timezone: formData.get('timezone') as string,
			lastPage: formData.get('lastPage') as string,
			os: formData.get('os') as string
		})

		const sessionCookie = lucia.createSessionCookie(session.id)
		setAuthCookie(sessionCookie)
		return { userId }
	} catch (e) {
		console.error('Sign-up error:', e)
		return { ...genericError, success: false }
	}
}
