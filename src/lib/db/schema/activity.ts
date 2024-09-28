import { text, timestamp } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core/table'
import { z } from 'zod'
import { users } from './auth'

export const activityLogs = pgTable('activity_logs', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { table: users }),
	action: text('action').notNull(),
	details: text('details'),
	timestamp: timestamp('timestamp').defaultNow().notNull()
})

export const activityLogSchema = z.object({
	action: z.string(),
	details: z.string().optional()
})
