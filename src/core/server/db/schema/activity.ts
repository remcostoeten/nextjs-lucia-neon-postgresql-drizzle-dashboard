import { jsonb, text, timestamp } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core/table'
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
