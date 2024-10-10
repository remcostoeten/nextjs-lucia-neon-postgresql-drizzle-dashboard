import { getUserAuth } from '@/lib/auth/utils'
import { NextResponse } from 'next/server'

export async function GET() {
	const { session } = await getUserAuth()
	return NextResponse.json({ user: session?.user || null })
}
