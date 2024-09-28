import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { z } from 'zod'

// User table
export const users = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	hashedPassword: text('hashed_password').notNull(),
	name: text('name')
})

// Session table
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

export const updateUserSchema = z.object({
	name: z.string().min(3).optional(),
	email: z.string().min(4).optional()
})

// Types
export type UsernameAndPassword = z.infer<typeof authenticationSchema>
export type User = typeof users.$inferSelect
