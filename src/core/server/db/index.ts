import { env } from '@/lib/env.mjs'
import { neon, NeonQueryFunction, Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

// Import all schemas and relations
import * as activity from './schema/activity'
import * as auth from './schema/auth'
const schema = {
	...auth,
	...activity
}

let sql: NeonQueryFunction<boolean, boolean>
let db: ReturnType<typeof drizzle>
let pool: Pool

if (typeof window === 'undefined') {
	sql = neon(env.DATABASE_URL)
	db = drizzle(sql, { schema })
	pool = new Pool({ connectionString: env.DATABASE_URL })
}

export { db, pool, sql }

export * from './schema/activity'
export * from './schema/auth'
