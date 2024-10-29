import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './auth'
export const inspirationCategories = pgTable('inspiration_categories', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
})

export const inspirationBoards = pgTable('inspiration_boards', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    categoryId: uuid('category_id').references(() => inspirationCategories.id),
    userId: text('user_id').references(() => users.id).notNull(), // Changed from uuid to text
    createdAt: timestamp('created_at').defaultNow(),
})

export const inspirationEntries = pgTable('inspiration_entries', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    category: text('category'),
    style: text('style').array(),
    url: text('url').notNull(),
    type: text('type').notNull(),
    boardId: uuid('board_id').references(() => inspirationBoards.id),
    createdAt: timestamp('created_at').defaultNow(),
})

export const inspirationBoardsRelations = relations(inspirationBoards, ({ one, many }) => ({
    category: one(inspirationCategories, {
        fields: [inspirationBoards.categoryId],
        references: [inspirationCategories.id],
    }),
    entries: many(inspirationEntries),
    user: one(users, {
        fields: [inspirationBoards.userId],
        references: [users.id],
    }),
}))

export const inspirationEntriesRelations = relations(inspirationEntries, ({ one }) => ({
    board: one(inspirationBoards, {
        fields: [inspirationEntries.boardId],
        references: [inspirationBoards.id],
    }),
}))
