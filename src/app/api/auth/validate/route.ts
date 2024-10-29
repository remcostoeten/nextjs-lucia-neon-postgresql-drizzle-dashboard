/**
 * Since the traditional JWT based middleware does not work with Lucia auth since that's session (database call) based we use this api route and procceed from here in the ~/middleware.ts * 
 */

import { validateRequest } from '@/core/server/auth/lucia'
import { NextResponse } from 'next/server'

export async function GET() {
    const { user, session } = await validateRequest()
    return NextResponse.json({ isAuthenticated: !!session })
}
