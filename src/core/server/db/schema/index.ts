import { relations } from 'drizzle-orm'
import { keys, sessions, users } from './auth'
import { chats } from './chats'
import { messages } from './messages'
import { folders, notes } from './notes'
import { labels, taskLabels, tasks, taskUsersRelations } from './tasks'

export {
	chats,
	folders,
	keys,
	labels,
	messages,
	notes,
	sessions,
	taskLabels,
	tasks,
	users
}

export const usersRelations = relations(users, ({ one, many }) => ({
	folders: many(folders),
	notes: many(notes),
	...taskUsersRelations(users)
}))

export * from './activity'
export * from './auth'
export * from './chats'
export * from './finance'
export * from './messages'
export * from './notes'
export * from './parsed-ig'
export * from './processed-text'
export * from './tasks'
