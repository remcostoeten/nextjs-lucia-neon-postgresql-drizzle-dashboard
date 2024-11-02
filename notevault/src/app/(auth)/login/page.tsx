'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import ProtectedAuthRoute from '@/components/auth/protected-auth-route'
import { LoginForm } from '../components/login-form'

type LoginPageProps = {
	searchParams?: { error?: string }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const handleLogin = async (provider: string) => {
		try {
			setIsLoading(true)
			const result = await signIn(provider, {
				callbackUrl: '/dashboard',
				redirect: false
			})

			if (result?.error) {
				console.error('Login error:', result.error)
				// Handle error appropriately
				return
			}

			if (result?.url) {
				router.push(result.url)
			}
		} catch (error) {
			console.error('Login failed:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<ProtectedAuthRoute>
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="font-heading text-3xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-4xl md:text-5xl">
					Login
				</h1>

				<p className="text-sm text-muted-foreground">
					Enter your credentials below to login
				</p>

				<LoginForm />
			</div>
		</ProtectedAuthRoute>
	)
}
