import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from '../auth'
import { taskLabels } from './task-label'

export const labels = pgTable('label', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id)
})

export const labelsRelations = relations(labels, ({ one, many }) => ({
	user: one(users, {
		fields: [labels.userId],
		references: [users.id]
	}),
	tasks: many(taskLabels)
}))

export type Label = typeof labels.$inferSelect
export type NewLabel = typeof labels.$inferInsert
