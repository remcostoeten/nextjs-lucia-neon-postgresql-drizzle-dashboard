// src/lib/auth/auth-provider.tsx
'use client'

import { ClientAuthSession, useClientAuth } from '@/lib/auth/client-auth-utils'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
	session: ClientAuthSession['user'] | null
	loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [session, setSession] = useState<ClientAuthSession['user'] | null>(
		null
	)
	const [loading, setLoading] = useState(true)
	const { getClientSession } = useClientAuth()

	useEffect(() => {
		async function loadSession() {
			try {
				const { user } = await getClientSession()
				setSession(user)
			} catch (error) {
				console.error('Failed to load session:', error)
			} finally {
				setLoading(false)
			}
		}
		loadSession()
	}, [])

	return (
		<AuthContext.Provider value={{ session, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
