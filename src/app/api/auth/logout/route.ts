import { lucia } from '@/lib/auth/lucia'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value

	if (!sessionId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	await lucia.invalidateSession(sessionId)

	const sessionCookie = lucia.createBlankSessionCookie()
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	)

	return NextResponse.json({ success: true })
}
