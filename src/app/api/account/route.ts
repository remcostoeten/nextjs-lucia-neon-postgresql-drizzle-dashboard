import { getUserAuth } from '@/core/server/auth/utils'
import { users } from '@/core/server/db/schema/auth'

import { db } from 'db'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function PUT(request: Request) {
	const { session } = await getUserAuth()
	if (!session) return new Response('Error', { status: 400 })
	const body = (await request.json()) as { name?: string; email?: string }

	await db
		.update(users)
		.set({ ...body })
		.where(eq(users.id, session.user.id))
	revalidatePath('/account')
	return new Response(JSON.stringify({ message: 'ok' }), { status: 200 })
}
