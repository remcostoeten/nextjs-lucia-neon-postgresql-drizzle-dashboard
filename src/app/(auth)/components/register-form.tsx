'use client'

import { registerUser } from '@/app/_actions/auth'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
// ... other imports

export function RegisterForm() {
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (data: { email: string; password: string }) => {
		setIsSubmitting(true)
		try {
			const result = await registerUser({
				email: data.email,
				password: data.password
			})

			if (result.error) {
				toast.error(result.error)
				setIsSubmitting(false)
				return
			}

			// After successful registration, sign in
			const signInResult = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false
			})

			if (signInResult?.error) {
				toast.error('Registration successful but failed to log in')
				router.push('/login')
				return
			}

			toast.success('Registration successful')
			router.push('/dashboard')
			router.refresh()
		} catch (error) {
			toast.error('Failed to register')
		} finally {
			setIsSubmitting(false)
		}
	}

	// ... rest of the component
}
