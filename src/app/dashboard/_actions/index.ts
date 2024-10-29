import { pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const boards = pgTable('boards', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    userId: text('user_id').notNull().references(() => users.id),
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
export const insertBoardSchema = createInsertSchema(boards, {
    title: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
}).omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
});

export const selectBoardSchema = createSelectSchema(boards);

export const insertEntrySchema = createInsertSchema(entries, {
    title: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    category: z.string().max(50).optional(),
    style: z.array(z.string()).optional(),
    url: z.string().url(),
    type: z.enum(['animation', 'design_dribbble', 'design_live_code', 'code_snippet', 'miscellaneous']),
    boardId: z.string().uuid(),
}).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const selectEntrySchema = createSelectSchema(entries);

// TypeScript types
export type Board = z.infer<typeof selectBoardSchema>;
export type NewBoard = z.infer<typeof insertBoardSchema>;
export type Entry = z.infer<typeof selectEntrySchema>;
export type NewEntry = z.infer<typeof insertEntrySchema>; import { min, max } 
