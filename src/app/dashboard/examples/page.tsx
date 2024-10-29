import { CodeBlock } from '@/components/elements/code-block/code-block'

export default function ExamplesPage() {
	const serverExample = `// src/app/dashboard/server/page.tsx
import { getUser } from '@/core/server/actions/auth'

export default async function ServerDashboardPage() {
    // Direct server-side data fetching
    const user = await getUser()

    if (!user) {
        return <div>Please sign in to access the dashboard</div>
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Server-side Dashboard</h1>
            <div className="space-y-4">
                <p className="text-lg">Welcome, {user.name || user.email || 'User'}</p>
                <div className="grid grid-cols-2 gap-4 bg-section p-4 rounded-lg">
                    {/* User data display */}
                    <div>
                        <p className="text-subtitle">ID</p>
                        <p className="font-medium text-title">{user.id}</p>
                    </div>
                    {user.email && (
                        <div>
                            <p className="text-subtitle">Email</p>
                            <p className="font-medium text-title">{user.email}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}`

	const clientExample = `// src/app/dashboard/client/page.tsx
'use client'

import { getUser, type User } from '@/core/server/actions/auth'
import { useEffect, useState } from 'react'

export default function ClientDashboardPage() {
    // Client-side state management
    const [user, setUser] = useState<User>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    // Fetch user data on component mount
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

    // Loading state handling
    if (isLoading) {
        return <div>Loading user data (Client Side)...</div>
    }

    // Error state handling
    if (error) {
        return <div>Error loading user data: {error.message}</div>
    }

    // Not authenticated state
    if (!user) {
        return <div>Please sign in to access the dashboard</div>
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Client-side Dashboard</h1>
            <div className="space-y-4">
                <p className="text-lg">Welcome, {user.name || user.email || 'User'}</p>
                <div className="grid grid-cols-2 gap-4 bg-section p-4 rounded-lg">
                    {/* User data display */}
                    <div>
                        <p className="text-subtitle">ID</p>
                        <p className="font-medium text-title">{user.id}</p>
                    </div>
                    {user.email && (
                        <div>
                            <p className="text-subtitle">Email</p>
                            <p className="font-medium text-title">{user.email}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}`

	const serverActionExample = `// src/core/server/actions/auth.ts
'use server'

import { getUserAuth } from '../auth/utils'

export type User = {
    id: string
    name?: string
    email?: string
    username?: string
} | null

export async function getUser(): Promise<User> {
    const { session } = await getUserAuth()
    
    if (!session) {
        return null
    }
    
    return session.user
}`

	return (
		<div className="max-w-4xl mx-auto p-8 space-y-8">
			<h1 className="text-3xl font-bold mb-6">
				User Data Fetching Examples
			</h1>

			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">
					Server Action Definition
				</h2>
				<CodeBlock
					code={serverActionExample}
					language="typescript"
					fileName="src/core/server/actions/auth.ts"
					badges={[
						{ text: 'Server Action', variant: 'primary' },
						{ text: 'Authentication', variant: 'secondary' }
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">
					Server Component Example
				</h2>
				<p className="text-muted-foreground">
					Direct server-side data fetching with async components
				</p>
				<CodeBlock
					code={serverExample}
					language="typescript"
					fileName="src/app/dashboard/server/page.tsx"
					badges={[
						{ text: 'Server Component', variant: 'success' },
						{ text: 'Next.js', variant: 'secondary' }
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">
					Client Component Example
				</h2>
				<p className="text-muted-foreground">
					Client-side data fetching with state management
				</p>
				<CodeBlock
					code={clientExample}
					language="typescript"
					fileName="src/app/dashboard/client/page.tsx"
					badges={[
						{ text: 'Client Component', variant: 'warning' },
						{ text: 'React', variant: 'secondary' }
					]}
				/>
			</div>
		</div>
	)
}
