'use client'

import { useRouter } from 'next/navigation'

export type ClientAuthSession = {
	user: {
		id: string
		name?: string
		email?: string
		username?: string
	} | null
}

export const useClientAuth = () => {
	const router = useRouter()

	const getClientSession = async (): Promise<ClientAuthSession> => {
		try {
			const response = await fetch('/api/auth/session', {
				method: 'GET',
				credentials: 'include'
			})
			if (!response.ok) {
				throw new Error('Failed to fetch session')
			}
			const data = await response.json()
			return { user: data.user || null }
		} catch (error) {
			console.error('Error fetching client session:', error)
			return { user: null }
		}
	}

	const clientSignOut = async () => {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
				credentials: 'include'
			})
			if (!response.ok) {
				throw new Error('Failed to sign out')
			}
			router.push('/') // Redirect to  page after sign out
		} catch (error) {
			console.error('Error signing out:', error)
		}
	}

	const clientCheckAuth = async () => {
		const { user } = await getClientSession()
		if (!user) {
			router.push('/')
		}
		return user
	}

	return {
		getClientSession,
		clientSignOut,
		clientCheckAuth
	}
}
