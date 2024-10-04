import { jsonb, text, timestamp } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core/table'
import { z } from 'zod'
import { users } from './auth'

export const activityLogs = pgTable('activity_logs', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	action: text('action').notNull(),
	details: text('details'),
	metadata: jsonb('metadata'),
	timestamp: timestamp('timestamp').defaultNow().notNull()
})

export const activityLogSchema = z.object({
	action: z.string(),
	details: z.string().optional(),
	metadata: z.record(z.any()).optional()
})

export type ActivityLog = typeof activityLogs.$inferSelect
