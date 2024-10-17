import { db, users } from '@/core/server/db'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const updateAccountSchema = z.object({
	email: z.string().email('Invalid email address')
})

export default async function updateAccount(
	data: z.infer<typeof updateAccountSchema>,
	user: any
) {
	const { email } = data

	await db.update(users).set({ email }).where(eq(users.id, user.id))

	return { success: 'Account updated successfully.' }
}
