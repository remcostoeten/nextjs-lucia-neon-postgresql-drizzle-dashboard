'use server'

import { db } from '@/lib/db/index'
import { generateId } from 'lucia'
import { redirect } from 'next/navigation'
import { Argon2id } from 'oslo/password'
import { lucia } from '../auth/lucia'
import {
	genericError,
	setAuthCookie,
	validateAuthFormData
} from '../auth/utils'
import { users } from '../db/schema/auth'

type ActionResult = {
	error: string
}

export default function signUpAction(
	_: ActionResult,
	formData: FormData
): Promise<ActionResult> {
	const { data, error } = validateAuthFormData(formData)

	if (error !== null) return Promise.resolve({ error })

	return new Argon2id()
		.hash(data.password)
		.then(hashedPassword => {
			const userId = generateId(15)
			return db
				.insert(users)
				.values({
					id: userId,
					email: data.email,
					hashedPassword
				})
				.then(() => ({ userId }))
		})
		.then(({ userId }) => lucia.createSession(userId, {}))
		.then(session => {
			const sessionCookie = lucia.createSessionCookie(session.id)
			setAuthCookie(sessionCookie)
			return redirect('/dashboard')
		})
		.catch(() => genericError)
}
