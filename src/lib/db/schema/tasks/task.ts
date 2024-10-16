import { relations } from 'drizzle-orm'
import {
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid
} from 'drizzle-orm/pg-core'
import { users } from '../auth'
import { taskLabels } from './task-label'

export const tasks = pgTable('task', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: text('title').notNull(),
	content: text('content').notNull(),
	status: text('status', { enum: ['backlog', 'in-progress', 'completed'] })
		.notNull()
		.default('backlog'),
	dueDate: timestamp('due_date'),
	priority: integer('priority'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	subtasks: jsonb('subtasks').notNull().default([])
})

export const tasksRelations = relations(tasks, ({ one, many }) => ({
	user: one(users, {
		fields: [tasks.userId],
		references: [users.id]
	}),
	labels: many(taskLabels)
}))

export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert
export type Subtask = { id: string; title: string; completed: boolean }
