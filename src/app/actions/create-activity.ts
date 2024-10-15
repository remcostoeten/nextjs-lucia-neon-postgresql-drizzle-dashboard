'use server'

import { lucia } from '@/lib/auth/lucia'
import { db } from '@/lib/db'
import { activities, InsertActivity } from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createActivitySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    duration: z.number().min(1, 'Duration must be at least 1 minute'),
    icon: z.string(),
    color: z.string()
})

export async function createActivity(formData: FormData) {
    const session = await lucia.validateSession();
    if (!session) {
        return { error: 'Unauthorized' }
    }

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
        const newActivity: InsertActivity = {
            name,
            duration,
            icon,
            color
        }
        await db.insert(activities).values(newActivity)
    } catch (error) {
        return { error: 'Failed to create activity' }
    }

    revalidatePath('/dashboard')
    return { success: true }
}
