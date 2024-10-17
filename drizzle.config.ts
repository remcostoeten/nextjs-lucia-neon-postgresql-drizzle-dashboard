import { env } from '@/lib/env.mjs'
import type { Config } from 'drizzle-kit'

export default {
	schema: './src/lib/db/schema/index.ts',
	out: './src/core/server/db/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: env.DATABASE_URL
	}
} satisfies Config
