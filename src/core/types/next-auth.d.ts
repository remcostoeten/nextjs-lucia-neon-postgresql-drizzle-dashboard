import type { DefaultSession } from 'next-auth'

import 'next-auth/jwt'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
	interface Session extends DefaultSession {
		user?: {
			id: string
			username?: string | null
			// ... other properties
		} & DefaultSession['user']
	}

	interface User {
		id: string
		// ... other properties
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		username?: string | null
	}
}
