'use server'

import { db } from '@/lib/db'
import { activities } from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'

export async function createActivity(formData: FormData) {
	const validatedFields = createActivitySchema.safeParse({
		name: formData.get('name'),
		duration: Number(formData.get('duration')),
		icon: formData.get('icon'),
		color: formData.get('color')
	})

	if (!validatedFields.success) {
		return { error: validatedFields.error.flatten().fieldErrors }
	}

	const { name, duration, icon, color } = validatedFields.data

	try {
		await db.insert(activities).values({
			name,
			duration,
			icon,
			color
		})
	} catch (error) {
		return { error: 'Failed to create activity' }
	}

	revalidatePath('/dashboard')
	return { success: true }
}
