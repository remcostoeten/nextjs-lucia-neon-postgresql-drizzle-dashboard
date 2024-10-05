'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db/index'
import { eq } from 'drizzle-orm'
import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'
import { lucia, validateRequest } from '../auth/lucia'

import { logActivity } from '@/core/server/actions/users/log-activity'

import { updateUserSchema, users } from '../db/schema/auth'
import {
	validateAuthFormData,
	setAuthCookie,
	genericError,
	getUserAuth
} from '../auth/utils'

type ActionResult = {
	error: string
	success?: string
}

export async function signInAction(
	_: ActionResult,
	formData: FormData
): Promise<ActionResult> {
	const { data, error } = validateAuthFormData(formData)
	if (error !== null) return { error }

	try {
		const [existingUser] = await db
			.select()
			.from(users)
			.where(eq(users.email, data.email.toLowerCase()))

		if (!existingUser) {
			return {
				error: 'No account found with this email address'
			}
		}

		const validPassword = await new Argon2id().verify(
			existingUser.hashedPassword,
			data.password
		)

		if (!validPassword) {
			return {
				error: 'Incorrect password'
			}
		}

		// Remove these checks as they don't exist in the user schema
		// if (existingUser.isLocked) {
		//     return {
		//         error: 'Account is locked. Please contact support.'
		//     }
		// }
		// if (!existingUser.isEmailVerified) {
		//     return {
		//         error: 'Please verify your email address before signing in'
		//     }
		// }

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
				userAgent: formData.get('userAgent') as string
			}
		)

		return { error: '', success: 'Signed in successfully' }
	} catch (e) {
		console.error('Sign-in error:', e)
		return {
			error: 'An unexpected error occurred. Please try again later.'
		}
	}
}

export async function signUpAction(
	_: ActionResult,
	formData: FormData
): Promise<ActionResult> {
	const { data, error } = validateAuthFormData(formData)

	if (error !== null) return { error }

	const hashedPassword = await new Argon2id().hash(data.password)
	const userId = generateId(15)

	try {
		await db.insert(users).values({
			id: userId,
			email: data.email,
			hashedPassword
		})

		await logActivity(userId, 'Sign Up', 'User created an account', {
			email: data.email,
			timestamp: new Date().toISOString(),
			userAgent: formData.get('userAgent') as string
		})

		const session = await lucia.createSession(userId, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		setAuthCookie(sessionCookie)
		return { error: '', success: 'Account created successfully' }
	} catch (e) {
		return genericError
	}
}

export async function signOutAction(): Promise<ActionResult> {
	const { session } = await validateRequest()
	if (!session) {
		return {
			error: 'Unauthorized'
		}
	}

	await lucia.invalidateSession(session.id)

	await logActivity(session.userId, 'Sign Out', 'User signed out', {
		timestamp: new Date().toISOString()
	})

	const sessionCookie = lucia.createBlankSessionCookie()
	setAuthCookie(sessionCookie)
	return redirect('/sign-in')
}

export async function updateUser(
	_: any,
	formData: FormData
): Promise<ActionResult & { success: boolean }> {
	const { session } = await getUserAuth()
	if (!session) return { error: 'Unauthorised', success: false }

	const name = formData.get('name') ?? undefined
	const email = formData.get('email') ?? undefined

	const result = updateUserSchema.safeParse({ name, email })

	if (!result.success) {
		const error = result.error.flatten().fieldErrors
		if (error.name)
			return { error: 'Invalid name - ' + error.name[0], success: false }
		if (error.email)
			return {
				error: 'Invalid email - ' + error.email[0],
				success: false
			}
		return { ...genericError, success: false }
	}

	try {
		await db
			.update(users)
			.set({ ...result.data })
			.where(eq(users.id, session.user.id))

		await logActivity(
			session.user.id,
			'Profile Update',
			'User updated their profile',
			{
				updatedFields: Object.keys(result.data).join(', '),
				timestamp: new Date().toISOString()
			}
		)

		revalidatePath('/account')
		return { success: true, error: '' }
	} catch (e) {
		return { ...genericError, success: false }
	}
}
