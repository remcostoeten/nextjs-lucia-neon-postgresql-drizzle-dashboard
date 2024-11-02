import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET
	})

	// Log auth-related errors
	if (request.nextUrl.pathname.startsWith('/api/auth/error')) {
		console.error('Auth error:', request.nextUrl.searchParams.get('error'))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/api/auth/:path*']
}
