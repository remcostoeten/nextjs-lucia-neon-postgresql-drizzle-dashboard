'use server'

import { db } from '@/lib/db/index'
import { ActionResult } from '@/types/types.users'
import { generateId } from 'lucia'
import { redirect } from 'next/navigation'
import { Argon2id } from 'oslo/password'
import { lucia } from '../../../../lib/auth/lucia'
import {
	genericError,
	setAuthCookie,
	validateAuthFormData
} from '../../../../lib/auth/utils'
import { users } from '../../../../lib/db/schema/auth'
import { logActivity } from '../users/log-activity'

export default async function signUpAction(
	_: ActionResult,
	formData: FormData
): Promise<ActionResult | Response> {
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
		return redirect('/dashboard')
	} catch (e) {
		console.error('Sign-up error:', e)
		return { ...genericError, success: false }
	}
}
