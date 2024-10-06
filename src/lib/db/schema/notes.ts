import { generateUUID } from '@/core/helpers/generate-uuid'
import { relations } from 'drizzle-orm'
import {
	boolean,
	index,
	jsonb,
	pgTable,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core'
import { users } from './auth'

export const folders = pgTable(
	'folders',
	{
		id: varchar('id')
			.primaryKey()
			.$defaultFn(() => generateUUID()),
		name: text('name').notNull(),
		description: text('description'),
		color: text('color').default('#000000').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		parentId: varchar('parent_id').references(() => folders.id),
		path: text('path').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull()
	},
	table => {
		return {
			parentIdIdx: index('parent_id_idx').on(table.parentId),
			pathIdx: index('path_idx').on(table.path)
		}
	}
)

export const notes = pgTable('notes', {
	id: varchar('id')
		.primaryKey()
		.$defaultFn(() => generateUUID()),
	title: text('title').notNull(),
	content: text('content').notNull(),
	folderId: varchar('folder_id')
		.references(() => folders.id)
		.notNull(),
	isPinned: boolean('is_pinned').default(false).notNull(),
	tags: jsonb('tags').default([]).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	userId: varchar('user_id').notNull()
})

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
