'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/index'
import { eq } from 'drizzle-orm'
import { getUserAuth, genericError } from '../../../../lib/auth/utils'
import { updateUserSchema, users } from '../../../../lib/db/schema/auth'
import { logActivity } from '@/core/server/actions/users/log-activity'
import { ActionResult } from '@/types/types.users'

export async function updateUser(
	_: any,
	formData: FormData
): Promise<ActionResult> {
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
		return {
			success: true,
			error: null,
			message: 'Profile updated successfully'
		}
	} catch (e) {
		return { ...genericError, success: false }
	}
}
