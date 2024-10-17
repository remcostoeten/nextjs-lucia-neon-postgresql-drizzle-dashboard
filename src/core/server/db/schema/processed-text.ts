import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const processedTexts = pgTable('processed_texts', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name').notNull(),
	content: text('content').notNull(),
	processorType: text('processor_type').notNull(),
	userId: uuid('user_id').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
})
