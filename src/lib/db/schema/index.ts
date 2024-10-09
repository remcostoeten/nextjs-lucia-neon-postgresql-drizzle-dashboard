import { relations } from 'drizzle-orm'
import { keys, sessions, users } from './auth'
import { folders, notes } from './notes'
export { folders, keys, notes, sessions, users }
import { parsedOutputs } from './parsed-ig'
export const usersRelations = relations(users, ({ one, many }) => ({
	folders: many(folders),
	notes: many(notes)
}))

export * from './activity'
export * from './auth'
export * from './notes'
export * from './parsed-ig'
