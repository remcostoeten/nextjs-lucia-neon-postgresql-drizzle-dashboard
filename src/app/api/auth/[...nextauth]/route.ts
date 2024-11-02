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
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Invalid credentials')
				}

				// Here you would typically fetch the user from your database
				// and verify their password
				try {
					// Example database check (replace with your actual DB logic):
					const user = await prisma.user.findUnique({
						where: { email: credentials.email }
					})

					if (!user || !user.hashedPassword) {
						throw new Error('Invalid credentials')
					}

					const isCorrectPassword = await compare(
						credentials.password,
						user.hashedPassword
					)

					if (!isCorrectPassword) {
						throw new Error('Invalid credentials')
					}

					return {
						id: user.id,
						email: user.email,
						name: user.name,
						image: user.image
					}
				} catch (error) {
					console.error('Error:', error)
					return null
				}
			}
		})
	],
	pages: {
		signIn: '/login',
		error: '/error'
	},
	session: {
		strategy: 'jwt'
	},
	callbacks: {
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.sub
			}
			return session
		},
		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id
			}
			if (account) {
				token.accessToken = account.access_token
			}
			return token
		}
	},
	secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthConfig

export const {
	auth,
	handlers: { GET, POST }
} = NextAuth(config)
