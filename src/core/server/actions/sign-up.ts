import { lucia } from '@/lib/auth/lucia'
import { setAuthCookie, validateAuthFormData } from '@/lib/auth/utils'
import { db, users } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { Argon2id } from 'oslo/password'

interface ActionResult {
	error: string
	success: boolean
	user: { id: string } | null
}

export async function signUpAction(
	state: ActionResult,
	formData: FormData
): Promise<ActionResult> {
	const { data, error } = validateAuthFormData(formData)

	if (error !== null) return { ...state, error, success: false }

	const hashedPassword = await new Argon2id().hash(data.password)

	try {
		// Check if user already exists
		const [existingUser] = await db
			.select()
			.from(users)
			.where(eq(users.email, data.email.toLowerCase()))

		if (existingUser) {
			return {
				...state,
				error: 'An account with this email already exists',
				success: false
			}
		}

		// Insert the new user
		const [newUser] = await db
			.insert(users)
			.values({
				email: data.email.toLowerCase(),
				hashedPassword
			})
			.returning({ id: users.id })

		// Create a session for the new user
		const session = await lucia.createSession(newUser.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		setAuthCookie(sessionCookie)

		return {
			...state,
			success: true,
			user: {
				id: newUser.id
			}
		}
	} catch (e) {
		console.error('Sign up error:', e)
		return {
			...state,
			error: 'An unexpected error occurred. Please try again later.',
			success: false
		}
	}
}

export async function signInAction(
	state: ActionResult,
	formData: FormData
): Promise<ActionResult> {
	const { data, error } = validateAuthFormData(formData)

	if (error !== null) return { ...state, error, success: false }

	try {
		const [existingUser] = await db
			.select()
			.from(users)
			.where(eq(users.email, data.email.toLowerCase()))

		if (!existingUser) {
			return {
				...state,
				error: 'Invalid email or password',
				success: false
			}
		}

		const validPassword = await new Argon2id().verify(
			existingUser.hashedPassword,
			data.password
		)

		if (!validPassword) {
			return {
				...state,
				error: 'Invalid email or password',
				success: false
			}
		}

		const session = await lucia.createSession(existingUser.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		setAuthCookie(sessionCookie)

		return {
			...state,
			success: true,
			user: {
				id: existingUser.id
			}
		}
	} catch (e) {
		console.error('Sign in error:', e)
		return {
			...state,
			error: 'An unexpected error occurred. Please try again later.',
			success: false
		}
	}
}

export async function signOutAction(): Promise<ActionResult> {
	try {
		const { session } = await lucia.validateSession()
		if (session) {
			await lucia.invalidateSession(session.id)
		}
		const sessionCookie = lucia.createBlankSessionCookie()
		setAuthCookie(sessionCookie)
		return {
			error: '',
			success: true,
			user: null
		}
	} catch (e) {
		console.error('Sign out error:', e)
		return {
			error: 'An unexpected error occurred. Please try again later.',
			success: false,
			user: null
		}
	}
}
