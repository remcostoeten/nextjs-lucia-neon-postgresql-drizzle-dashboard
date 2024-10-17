import { cookies } from 'next/headers'
import { cache } from 'react'

import { db, keys, sessions, users } from 'db'
import { type Session, type User, Lucia } from 'lucia'

import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'

export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users, keys)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === 'production'
		}
	},
	getUserAttributes: attributes => {
		return {
			email: attributes.email,
			name: attributes.name
		}
	}
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface DatabaseUserAttributes {
	email: string
	name: string
}

export const validateRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
		if (!sessionId) {
			return {
				user: null,
				session: null
			}
		}

		try {
			const result = await lucia.validateSession(sessionId)
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(
					result.session.id
				)
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				)
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie()
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				)
			}
			return result
		} catch (error) {
			console.error('Error validating session:', error)
			return {
				user: null,
				session: null
			}
		}
	}
)
