'use server'

import { db } from '@/lib/db/index'
import { userProfiles } from '@/lib/db/schema/auth'
import { UserProfile } from '@/types/types.users'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getUserProfile(userId: string): Promise<UserProfile> {
	const profile = await db.query.userProfiles.findFirst({
		where: eq(userProfiles.userId, userId)
	})
	return profile || {}
}

export async function updateUserProfile(
	data: UserProfile
): Promise<{ success: boolean; error?: string }> {
	try {
		const userId = data.userId
		if (!userId) {
			throw new Error('User ID is required')
		}

		await db
			.update(userProfiles)
			.set({
				firstName: data.firstName,
				lastName: data.lastName,
				username: data.username,
				dateOfBirth: data.dateOfBirth,
				occupation: data.occupation,
				bio: data.bio,
				github: data.github,
				linkedin: data.linkedin,
				twitter: data.twitter,
				updatedAt: new Date()
			})
			.where(eq(userProfiles.userId, userId))

		revalidatePath('/settings')
		return { success: true }
	} catch (error) {
		console.error('Failed to update user profile:', error)
		return { success: false, error: 'Failed to update user profile' }
	}
}
