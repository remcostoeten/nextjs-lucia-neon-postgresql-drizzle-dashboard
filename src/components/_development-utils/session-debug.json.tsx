import { getUserAuth } from '@/lib/auth/utils'
import { db } from '@/lib/db/index'
import { users } from '@/lib/db/schema/auth'
import { eq } from 'drizzle-orm'

export default async function SessionDebugJson() {
	try {
		const { session } = await getUserAuth()
		console.log('Session:', session)

		if (!session) {
			return <pre>No active session. User is not logged in.</pre>
		}

		const [userData] = await db
			.select()
			.from(users)
			.where(eq(users.id, session.user.id))

		const debugInfo = {
			session: {
				id: session.user.id,
				name: session.user.name,
				email: session.user.email
			},
			additionalUserData: {
				...userData,
				hashedPassword: '[REDACTED]' // Don't expose the hashed password
			},
			authenticationStatus: 'Authenticated',
			sessionCreatedAt: new Date().toISOString(), // This is an approximation
			userAgent: 'Server-side rendering, user agent not available'
		}

		return (
			<pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
				<code>{JSON.stringify(debugInfo, null, 2)}</code>
			</pre>
		)
	} catch (error) {
		console.error('Error in SessionDebugJson:', error)
		return <pre>Error loading session: {error.message}</pre>
	}
}
