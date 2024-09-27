import { relations } from 'drizzle-orm'
import { sessions, userProfiles, users } from './auth'
import { folders, notes } from './notes'

export { folders, notes, sessions, userProfiles, users }

export const usersRelations = relations(users, ({ one, many }) => ({
	userProfile: one(userProfiles, {
		fields: [users.id],
		references: [userProfiles.userId]
	}),
	folders: many(folders),
	notes: many(notes)
}))

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
	user: one(users, {
		fields: [userProfiles.userId],
		references: [users.id]
	})
}))

export * from './auth'
export * from './notes'
