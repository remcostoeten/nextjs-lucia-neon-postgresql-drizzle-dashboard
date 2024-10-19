import { validateRequest } from '@/core/server/auth/lucia'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const session = await validateRequest(request)

	if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/sign-in', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*']
}
