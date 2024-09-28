import { relations } from 'drizzle-orm'
import {
	boolean,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid
} from 'drizzle-orm/pg-core'
import { users } from './auth'

export const folders = pgTable('folders', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	color: text('color').default('#000000').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const notes = pgTable('notes', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: text('title').notNull(),
	content: text('content').notNull(),
	folderId: uuid('folder_id')
		.references(() => folders.id)
		.notNull(),
	isPinned: boolean('is_pinned').default(false).notNull(),
	tags: jsonb('tags').default([]).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	userId: uuid('user_id').notNull()
})

export const foldersRelations = relations(folders, ({ many, one }) => ({
	notes: many(notes),
	user: one(users, {
		fields: [folders.userId],
		references: [users.id]
	})
}))

export const notesRelations = relations(notes, ({ one }) => ({
	folder: one(folders, {
		fields: [notes.folderId],
		references: [folders.id]
	}),
	user: one(users, {
		fields: [notes.userId],
		references: [users.id]
	})
}))
