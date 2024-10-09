'use server'

import { logActivity } from '@/core/server/actions/users/log-activity'
import { redirect } from 'next/navigation'
import { lucia, validateRequest } from '../../../../lib/auth/lucia'
import { setAuthCookie } from '../../../../lib/auth/utils'

export async function signOutAction(formData: FormData) {
	console.log('signOutAction called')
	const { session } = await validateRequest()
	if (!session) {
		console.log('No session found, redirecting to sign-in')
		return redirect('/sign-in?error=Unauthorized')
	}

	console.log('Invalidating session:', session.id)
	await lucia.invalidateSession(session.id)

	await logActivity(session.userId, 'Sign Out', 'User signed out', {
		timestamp: new Date().toISOString(),
		device: formData.get('device') as string,
		location: formData.get('location') as string,
		timezone: formData.get('timezone') as string,
		lastPage: formData.get('lastPage') as string,
		os: formData.get('os') as string
	})

	const sessionCookie = lucia.createBlankSessionCookie()
	setAuthCookie(sessionCookie)
	console.log('Redirecting to sign-in page')
	return redirect('/sign-in?success=Signed out successfully')
}
