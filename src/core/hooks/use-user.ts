'use client'

import { useQuery } from '@tanstack/react-query'

export type User = {
	id: string
	name?: string
	email?: string
	username?: string
} | null

async function fetchUser(): Promise<User> {
	const res = await fetch('/api/auth/user')
	if (!res.ok) {
		return null
	}
	const data = await res.json()
	return data.user
}

export function useUser() {
	const {
		data: user,
		isLoading,
		error
	} = useQuery({
		queryKey: ['user'],
		queryFn: fetchUser
	})

	return {
		user,
		isLoading,
		error,
		isAuthenticated: !!user
	}
}
