import {
	pgTable,
	text,
	timestamp,
	uuid,
	jsonb,
	integer
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from '../auth'

export const boards = pgTable('board', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	lanes: jsonb('lanes')
		.notNull()
		.default(['Backlog', 'In Progress', 'Completed']),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const tasks = pgTable('task', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	status: text('status').notNull(),
	priority: integer('priority').notNull(),
	dueDate: timestamp('due_date'),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	boardId: uuid('board_id')
		.notNull()
		.references(() => boards.id),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const boardsRelations = relations(boards, ({ many }) => ({
	tasks: many(tasks)
}))

export const tasksRelations = relations(tasks, ({ one }) => ({
	board: one(boards, {
		fields: [tasks.boardId],
		references: [boards.id]
	}),
	user: one(users, {
		fields: [tasks.userId],
		references: [users.id]
	})
}))

export type Board = typeof boards.$inferSelect
export type NewBoard = typeof boards.$inferInsert
export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert
