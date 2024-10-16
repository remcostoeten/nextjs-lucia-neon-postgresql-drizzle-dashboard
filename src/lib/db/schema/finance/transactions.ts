import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const transactions = pgTable('transactions', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id').notNull(),
	description: text('description').notNull(),
	amount: integer('amount').notNull(),
	date: timestamp('date').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
})
