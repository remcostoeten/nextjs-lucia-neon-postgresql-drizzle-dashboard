import { type InferModel } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

export const chats = pgTable('chats', {
	id: serial('id').primaryKey(),
	userId: varchar('user_id', { length: 255 }).notNull(),
	title: varchar('title', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export type Chat = InferModel<typeof chats>
