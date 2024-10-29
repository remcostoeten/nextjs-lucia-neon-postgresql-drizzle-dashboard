import { getUserAuth } from '@/core/server/auth/utils'
import { NextResponse } from 'next/server'

export async function GET() {
	const { session } = await getUserAuth()

	if (!session) {
		return NextResponse.json({ user: null })
	}

	return NextResponse.json({ user: session.user })
}
