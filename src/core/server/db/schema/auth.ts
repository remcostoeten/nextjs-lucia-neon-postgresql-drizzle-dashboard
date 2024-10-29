import { max, min, relations } from 'drizzle-orm'
import { date, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { object, optional, string, z } from 'zod'

// User table
export const users = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	hashedPassword: text('hashed_password').notNull()
})

// User Profile table
export const userProfiles = pgTable('user_profile', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	firstName: text('first_name'),
	lastName: text('last_name'),
	username: text('username').unique(),
	dateOfBirth: date('date_of_birth'),
	occupation: text('occupation'),
	bio: text('bio'),
	github: text('github'),
	linkedin: text('linkedin'),
	twitter: text('twitter'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
})

// Relations
export const usersRelations = relations(users, ({ one }) => ({
	profile: one(userProfiles, {
		fields: [users.id],
		references: [userProfiles.userId]
	})
}))

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
	user: one(users, {
		fields: [userProfiles.userId],
		references: [users.id]
	})
}))

// Session table (unchanged)
export const sessions = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
})

// Keys table (unchanged)
export const keys = pgTable('key', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	hashedPassword: text('hashed_password')
})

// Schemas
export const authenticationSchema = z.object({
	email: z.string().email().min(5).max(31),
	password: z
		.string()
		.min(4, { message: 'must be at least 4 characters long' })
		.max(15, { message: 'cannot be more than 15 characters long' })
})

export const updateUserProfileSchema = z.object({
	userId: z.string(),
	firstName: z.string().min(1).max(50).optional(),
	lastName: z.string().min(1).max(50).optional(),
	username: z.string().min(3).max(30).optional(),
	dateOfBirth: z.string().optional(),
	occupation: z.string().max(100).optional(),
	bio: z.string().max(500).optional(),
	github: z.string().max(100).optional(),
	linkedin: z.string().max(100).optional(),
	twitter: z.string().max(100).optional()
})

// Types
export type UsernameAndPassword = z.infer<typeof authenticationSchema>
export type User = typeof users.$inferSelect
export type UserProfile = typeof userProfiles.$inferSelect
export type NewUserProfile = typeof userProfiles.$inferInsert
