'use server'

import {
	updateUserProfileSchema,
	userProfiles
} from '@/core/server/db/schema/auth'
import { db } from 'db'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function updateProfile(
	data: z.infer<typeof updateUserProfileSchema>
) {
	try {
		const validatedData = updateUserProfileSchema.parse(data)

		const existingProfile = await db.query.userProfiles.findFirst({
			where: eq(userProfiles.userId, validatedData.userId)
		})

		if (existingProfile) {
			// Update existing profile
			await db
				.update(userProfiles)
				.set(validatedData)
				.where(eq(userProfiles.userId, validatedData.userId))
		} else {
			// Create new profile
			await db.insert(userProfiles).values({
				...validatedData,
				userId: validatedData.userId as string
			})
		}

		revalidatePath('/profile') // Adjust this path as needed

		return { success: true, message: 'Profile updated successfully' }
	} catch (error) {
		console.error('Error updating user profile:', error)
		return { success: false, message: 'Failed to update profile' }
	}
}
