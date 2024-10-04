import { NextRequest, NextResponse } from 'next/server'
import { getUserAuth } from '@/lib/auth/utils'

export async function GET(request: NextRequest) {
	try {
		const { session } = await getUserAuth()
		return NextResponse.json({ session })
	} catch (error) {
		console.error('Session fetch error:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch session' },
			{ status: 500 }
		)
	}
}