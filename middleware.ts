/* hacky way as Lucia does not support traditional JWT based middleware. See /app/api/auth/validate/route.ts */

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Check if the pathname includes '/dashboard'
  if (request.nextUrl.pathname.includes('/dashboard')) {
    const res = await fetch(`${request.nextUrl.origin}/api/auth/validate`, {
      method: 'GET',
      headers: {
        Cookie: request.headers.get('cookie') || '',
      },
    })
    const { isAuthenticated } = await res.json()

    if (!isAuthenticated) {
      // Redirect to '/sign-in' instead of '/login'
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }

  return NextResponse.next()
}

// Update the matcher to include all routes that contain '/dashboard'
export const config = {
  matcher: ['/dashboard', '/dashboard/:path*']
}
