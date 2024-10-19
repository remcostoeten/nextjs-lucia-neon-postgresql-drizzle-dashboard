'use server'

import { db, userProfiles } from 'db'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { lucia } from '../../auth/lucia'

const profileSchema = z.object({
	firstName: z.string().min(1).max(50),
	lastName: z.string().min(1).max(50),
	username: z.string().min(3).max(30),
	dateOfBirth: z.string().optional(),
	occupation: z.string().max(100).optional(),
	bio: z.string().max(500).optional(),
	github: z.string().url().max(100).optional(),
	linkedin: z.string().url().max(100).optional(),
	twitter: z.string().url().max(100).optional()
})

export async function updateProfile(formData: FormData) {
	const session = await validateSession()
	if (!session) {
		redirect('/login')
	}

	const rawData = Object.fromEntries(formData.entries())
	const validatedData = profileSchema.parse(rawData)

	try {
		await db
			.update(userProfiles)
			.set(validatedData)
			.where(eq(userProfiles.userId, session.user.id))

		revalidatePath('/dashboard/profile')
		return { success: true }
	} catch (error) {
		console.error('Failed to update profile:', error)
		return { success: false, error: 'Failed to update profile' }
	}
}

export async function getProfile() {
	const session = await validateSession()
	if (!session) {
		redirect('/login')
	}

	try {
		const profile = await db
			.select()
			.from(userProfiles)
			.where(eq(userProfiles.userId, session.user.id))
			.limit(1)

		return profile[0] || null
	} catch (error) {
		console.error('Failed to fetch profile:', error)
		return null
	}
}

async function validateSession() {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value
	if (!sessionId) {
		return null
	}

	try {
		const { session, user } = await lucia.validateSession(sessionId)
		if (!session) {
			return null
		}
		return { session, user }
	} catch {
		return null
	}
}

export async function logout() {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value
	if (!sessionId) {
		return redirect('/')
	}

	await lucia.invalidateSession(sessionId)

	const sessionCookie = lucia.createBlankSessionCookie()
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	)

	redirect('/')
}
