import { type InferModel } from 'drizzle-orm'
import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const messages = pgTable('messages', {
	id: serial('id').primaryKey(),
	chatId: varchar('chat_id', { length: 255 }).notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	message: text('message').notNull(),
	timestamp: timestamp('timestamp').notNull(),
	attachment: varchar('attachment', { length: 255 })
})

export const favorites = pgTable('favorites', {
	id: serial('id').primaryKey(),
	userId: varchar('user_id', { length: 255 }).notNull(),
	messageId: serial('message_id').references(() => messages.id)
})

export type Message = InferModel<typeof messages>
export type Favorite = InferModel<typeof favorites>
