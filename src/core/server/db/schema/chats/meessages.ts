import { env } from '@/lib/env.mjs'
import { neon, NeonQueryFunction, Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

// Import all schemas and relations
import * as activity from '@/core/server/db/schema/activity'
import * as auth from '@/core/server/db/schema/auth'
import * as chats from '@/core/server/db/schema/chats'
import * as messages from '@/core/server/db/schema/messages'
import * as folders from '@/core/server/db/schema/folders'
import * as notes from '@/core/server/db/schema/notes'

const schema = {
	...auth,
	...folders,
	...notes,
	...activity,
	...chats,
	...messages
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

export * from '@/core/server/db/schema/activity'
export * from '@/core/server/db/schema/auth'
export * from '@/core/server/db/schema/chats'
export * from '@/core/server/db/schema/messages'
export * from '@/core/server/db/schema/finance'
export * from '@/core/server/db/schema/folders'
export * from '@/core/server/db/processed-text'
