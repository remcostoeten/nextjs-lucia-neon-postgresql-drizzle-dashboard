import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const boards = pgTable('boards', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const entries = pgTable('entries', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    category: text('category'),
    style: jsonb('style').default([]),
    url: text('url').notNull(),
    type: text('type', { enum: ['animation', 'design_dribbble', 'design_live_code', 'code_snippet', 'miscellaneous'] }).notNull(),
    boardId: uuid('board_id').notNull().references(() => boards.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Zod schemas for type-safe inserts and selects
export const insertBoardSchema = createInsertSchema(boards);
export const selectBoardSchema = createSelectSchema(boards);

export const insertEntrySchema = createInsertSchema(entries);
export const selectEntrySchema = createSelectSchema(entries);

// TypeScript types
export type Board = z.infer<typeof selectBoardSchema>;
export type NewBoard = z.infer<typeof insertBoardSchema>;
export type Entry = z.infer<typeof selectEntrySchema>;
export type NewEntry = z.infer<typeof insertEntrySchema>;
