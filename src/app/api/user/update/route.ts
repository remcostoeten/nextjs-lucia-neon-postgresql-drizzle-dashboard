import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/auth'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const body = await req.json()
		const { name } = body

		const updatedUser = await db
			.update(users)
			.set({ name })
			.where(eq(users.id, session.user.id))
			.returning({ name: users.name })

		return NextResponse.json(updatedUser[0])
	} catch (error) {
		console.error('Error updating user:', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
