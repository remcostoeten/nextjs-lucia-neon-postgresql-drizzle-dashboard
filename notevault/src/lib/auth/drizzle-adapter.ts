import { db } from '@/lib/db'
import { dbAccounts, users, verificationTokens } from '@/lib/db/schema/auth'
import type { Adapter } from '@auth/core/adapters'
import { and, eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export function DrizzleAdapter(): Adapter {
	return {
		async createUser(data) {
			const id = nanoid()
			await db.insert(users).values({
				id,
				email: data.email,
				emailVerified: data.emailVerified,
				name: data.name,
				image: data.image
			})
			const user = await db.query.users.findFirst({
				where: eq(users.id, id)
			})
			return user!
		},
		async getUser(id) {
			const user = await db.query.users.findFirst({
				where: eq(users.id, id)
			})
			return user ?? null
		},
		async getUserByEmail(email) {
			const user = await db.query.users.findFirst({
				where: eq(users.email, email)
			})
			return user ?? null
		},
		async getUserByAccount({ providerAccountId, provider }) {
			const account = await db.query.dbAccounts.findFirst({
				where: and(
					eq(dbAccounts.providerAccountId, providerAccountId),
					eq(dbAccounts.provider, provider)
				),
				with: {
					user: true
				}
			})
			return account?.user ?? null
		},
		async updateUser({ id, ...data }) {
			if (!id) throw new Error('User not found')
			await db.update(users).set(data).where(eq(users.id, id))
			const user = await db.query.users.findFirst({
				where: eq(users.id, id)
			})
			return user!
		},
		async deleteUser(userId) {
			await db.delete(users).where(eq(users.id, userId))
		},
		async linkAccount(account) {
			await db.insert(dbAccounts).values({
				userId: account.userId,
				type: account.type,
				provider: account.provider,
				providerAccountId: account.providerAccountId,
				refresh_token: account.refresh_token,
				access_token: account.access_token,
				expires_at: account.expires_at,
				token_type: account.token_type,
				scope: account.scope,
				id_token: account.id_token,
				session_state: account.session_state
			})
		},
		async unlinkAccount({ providerAccountId, provider }) {
			await db
				.delete(dbAccounts)
				.where(
					and(
						eq(dbAccounts.providerAccountId, providerAccountId),
						eq(dbAccounts.provider, provider)
					)
				)
		},
		async createVerificationToken(data) {
			await db.insert(verificationTokens).values(data)
			const verificationToken =
				await db.query.verificationTokens.findFirst({
					where: and(
						eq(verificationTokens.identifier, data.identifier),
						eq(verificationTokens.token, data.token)
					)
				})
			return verificationToken!
		},
		async useVerificationToken({ identifier, token }) {
			const verificationToken =
				await db.query.verificationTokens.findFirst({
					where: and(
						eq(verificationTokens.identifier, identifier),
						eq(verificationTokens.token, token)
					)
				})
			if (!verificationToken) return null
			await db
				.delete(verificationTokens)
				.where(
					and(
						eq(verificationTokens.identifier, identifier),
						eq(verificationTokens.token, token)
					)
				)
			return verificationToken
		}
	}
}
