import { db } from '@/lib/db'
import { compare } from 'bcryptjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import type { NextAuthConfig } from 'next-auth'

const config = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				type: { type: 'text' },
				email: { type: 'email' },
				password: { type: 'password' }
			},
			async authorize(credentials) {
				if (
					!credentials?.type ||
					!credentials?.email ||
					!credentials?.password
				) {
					return null
				}

				try {
					const user = await db.query.users.findFirst({
						where: (users, { eq }) =>
							eq(users.email, credentials.email),
						columns: {
							id: true,
							email: true,
							name: true,
							password: true,
							image: true
						}
					})

					if (!user?.password) {
						console.log('User not found or no password')
						return null
					}

					const passwordMatch = await compare(
						credentials.password,
						user.password
					)

					if (!passwordMatch) {
						console.log('Password does not match')
						return null
					}

					return {
						id: user.id,
						email: user.email,
						name: user.name,
						image: user.image
					}
				} catch (error) {
					console.error('Authorization error:', error)
					return null
				}
			}
		})
	],
	pages: {
		signIn: '/login',
		error: '/login'
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60 // 30 days
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.email = user.email
				token.name = user.name
				token.picture = user.image
			}
			return token
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string
				session.user.email = token.email
				session.user.name = token.name
				session.user.image = token.picture as string
			}
			return session
		}
	},
	debug: process.env.NODE_ENV === 'development',
	secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthConfig

export const {
	auth,
	handlers: { GET, POST }
} = NextAuth(config)
