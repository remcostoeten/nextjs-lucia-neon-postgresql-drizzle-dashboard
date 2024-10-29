'use client'

import { getUser, type User } from '@/core/server/actions/auth'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
	const [user, setUser] = useState<User>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser()
				setUser(userData)
			} catch (err) {
				setError(err as Error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchUser()
	}, [])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error loading user data</div>
	}

	if (!user) {
		return <div>Please sign in to access the dashboard</div>
	}

	return (
		<div>
			<h1>Dashboard</h1>
			<div className="space-y-2">
				<p>Welcome, {user.name || user.email || 'User'}</p>
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div>
						<p className="text-subtitle">ID</p>
						<p className="font-medium text-title">{user.id}</p>
					</div>
					{user.email && (
						<div>
							<p className="text-subtitle">Email</p>
							<p className="font-medium text-title">
								{user.email}
							</p>
						</div>
					)}
					{user.name && (
						<div>
							<p className="text-subtitle">Name</p>
							<p className="font-medium text-title">
								{user.name}
							</p>
						</div>
					)}
					{user.username && (
						<div>
							<p className="text-subtitle">Username</p>
							<p className="font-medium text-title">
								{user.username}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
