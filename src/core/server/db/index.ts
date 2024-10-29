import { env } from '@/lib/env.mjs'
import { neon, NeonQueryFunction, Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

// Import all schemas and relations
import * as activity from './schema/activity'
import * as auth from './schema/auth'
import * as folders from './schema/folders'
import * as notes from './schema/notes'
const schema = {
	...auth,
	...folders,
	...notes,
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
export * from './schema/folders'
// export * from './schema/notes'
export * from './schema/finance'
export * from './schema/processed-text'
