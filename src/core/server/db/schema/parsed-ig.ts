import { generateUUID } from '@/core/constants/generate-uuid'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { users } from './auth'

export const parsedOutputs = pgTable('parsed_outputs', {
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => generateUUID()),
	title: text('title').notNull(),
	content: text('content').notNull(),
	userId: varchar('user_id')
		.notNull()
		.references(() => users.id),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const insertParsedOutputSchema = createInsertSchema(parsedOutputs).omit({
	id: true,
	createdAt: true,
	updatedAt: true
})
export const selectParsedOutputSchema = createSelectSchema(parsedOutputs)

export type ParsedOutput = z.infer<typeof selectParsedOutputSchema>
