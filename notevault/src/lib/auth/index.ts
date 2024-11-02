import { DrizzleAdapter } from '@/lib/auth/drizzle-adapter'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/auth'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
	adapter: DrizzleAdapter() as Adapter,
	session: {
		strategy: 'jwt'
	},
	pages: {
		signIn: '/login',
		error: '/login'
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Invalid credentials')
				}

				const user = await db.query.users.findFirst({
					where: eq(users.email, credentials.email)
				})

				if (!user || !user.password) {
					throw new Error('User not found')
				}

				const isPasswordValid = await bcrypt.compare(
					credentials.password,
					user.password
				)

				if (!isPasswordValid) {
					throw new Error('Invalid password')
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					image: user.image
				}
			}
		})
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id
				session.user.name = token.name
				session.user.email = token.email
				session.user.image = token.picture
			}
			return session
		},
		async jwt({ token, user }) {
			const dbUser = await db.query.users.findFirst({
				where: eq(users.email, token.email!)
			})

			if (!dbUser) {
				if (user) {
					token.id = user?.id
				}
				return token
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image
			}
		}
	}
}

export const { auth, signIn, signOut } = NextAuth(authOptions)
