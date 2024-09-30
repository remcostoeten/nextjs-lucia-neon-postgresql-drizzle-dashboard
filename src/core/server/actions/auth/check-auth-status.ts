'use server'

import { getUserAuth } from '@/lib/auth/utils'

export async function checkAuthStatus() {
	const { session } = await getUserAuth()
	if (!session) {
		return { authenticated: false, user: null }
	}
	return {
		authenticated: true,
		user: {
			id: session.user.id,
			email: session.user.email,
			name: session.user.name
		}
	}
}
