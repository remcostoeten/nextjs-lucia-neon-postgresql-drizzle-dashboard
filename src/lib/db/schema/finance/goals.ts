import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const goals = pgTable('goals', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id').notNull(),
	title: text('title').notNull(),
	targetAmount: text('target_amount').notNull(),
	currentAmount: text('current_amount').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
})
