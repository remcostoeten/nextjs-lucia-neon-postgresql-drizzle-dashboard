import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const budgets = pgTable('budgets', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id').notNull(),
	title: text('title').notNull(),
	amount: text('amount').notNull(),
	month: text('month').notNull(),
	description: text('description'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
})
