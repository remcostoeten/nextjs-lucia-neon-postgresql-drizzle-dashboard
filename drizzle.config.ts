import { loadEnvConfig } from '@next/env'
import { cwd } from 'process'

import type { Config } from 'drizzle-kit'

import { siteConfig } from '@/config/site'

loadEnvConfig(cwd())

if (!process.env.DATABASE_URL) {
	console.error("'DATABASE_URL' is not set in the environment variables")
	process.exit(1)
}
export default {
	schema: './src/lib/db/schema/index.ts',
	out: './src/core/server/migrations',
	dialect: 'postgresql',
	verbose: true,
	dbCredentials: { url: process.env.DATABASE_URL },
	tablesFilter: [`${siteConfig.name.toLowerCase().replace(/\s/g, '_')}_*`]
} satisfies Config
