// src/core/server/db/migrations/add_statuses_to_board.ts
import { sql } from 'drizzle-orm'

export async function up(db) {
	await db.execute(sql`
    ALTER TABLE "board" 
    ADD COLUMN IF NOT EXISTS "statuses" JSONB NOT NULL DEFAULT '["backlog", "in-progress", "completed"]'
  `)
}

export async function down(db) {
	await db.execute(sql`
    ALTER TABLE "board" 
    DROP COLUMN IF EXISTS "statuses"
  `)
}
