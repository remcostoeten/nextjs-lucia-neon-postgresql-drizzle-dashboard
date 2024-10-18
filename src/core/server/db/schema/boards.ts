import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const kanbanBoards = pgTable('kanban_boards', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const kanbanBoardColumns = pgTable('kanban_board_columns', {
	id: uuid('id').primaryKey().defaultRandom(),
	boardId: uuid('board_id')
		.references(() => kanbanBoards.id)
		.notNull(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
})
