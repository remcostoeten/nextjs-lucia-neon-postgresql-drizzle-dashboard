'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import Center from '@/components/atoms/Center'
import LogoIcon from '@/components/base/logo'
import { Button, Input } from '@/components/ui'
import SimpleCheckbox from '@/components/ui/simple-checkbox'
import { signInAction } from '@/lib/actions/users'
import { toast } from 'toast'
import { fadeInUp } from '@/core/constants/animations'

export default function SignInPage() {
	const showToast = toast(state => state.showToast)
	const [state, formAction] = useFormState(signInAction, {
		error: ''
	})
	const [rememberMe, setRememberMe] = useState(false)
	const [email, setEmail] = useState('')

	useEffect(() => {
		const remembered = localStorage.getItem('rememberMe') === 'true'
		setRememberMe(remembered)
		if (remembered) {
			const savedEmail = localStorage.getItem('rememberedEmail')
			if (savedEmail) {
				setEmail(savedEmail)
			}
		}
	}, [])

	useEffect(() => {
		if (state.error) {
			let errorMessage = state.error
			switch (state.error.toLowerCase()) {
				case 'invalid_credentials':
					errorMessage =
						'Invalid email or password. Please try again.'
					break
				case 'user_not_found':
					errorMessage = 'No account found with this email address.'
					break
				case 'invalid_email':
					errorMessage = 'Please enter a valid email address.'
					break
				case 'password_too_short':
					errorMessage =
						'Password must be at least 8 characters long.'
					break
				case 'account_locked':
					errorMessage =
						'Your account has been locked. Please contact support.'
					break
				case 'too_many_attempts':
					errorMessage =
						'Too many failed attempts. Please try again later.'
					break
				// Add more cases as needed
				default:
					errorMessage = 'An error occurred. Please try again.'
			}
			showToast(errorMessage, 'error')
		}
	}, [state.error, showToast])

	const handleRememberMe = (checked: boolean) => {
		setRememberMe(checked)
		if (checked) {
			localStorage.setItem('rememberMe', 'true')
			localStorage.setItem('rememberedEmail', email)
		} else {
			localStorage.removeItem('rememberMe')
			localStorage.removeItem('rememberedEmail')
		}
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	return (
		<Center method="grid">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full max-w-md">
				<motion.a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-title"
					initial="initial"
					animate="animate"
					variants={fadeInUp(0)}
				>
					<LogoIcon className="w-8 h-8 mr-2" />
					remcostoeten
				</motion.a>
				<motion.div
					className="w-full bg-[#0c0c0c] rounded-lg shadow-md border border-[#1a1a1a] p-6 space-y-4 md:space-y-6"
					initial="initial"
					animate="animate"
					variants={fadeInUp(0.1)}
				>
					<motion.h1
						className="text-xl font-bold leading-tight tracking-tight text-title md:text-2xl"
						initial="initial"
						animate="animate"
						variants={fadeInUp(0.2)}
					>
						Sign in to your account
					</motion.h1>
					<form action={formAction}>
						<motion.div
							initial="initial"
							animate="animate"
							variants={fadeInUp(0.3)}
							className="mb-4"
						>
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-subtitle"
							>
								Your email
							</label>
							<Input
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={handleEmailChange}
								placeholder="name@company.com"
								required
							/>
						</motion.div>
						<motion.div
							initial="initial"
							animate="animate"
							className="mb-4"
							variants={fadeInUp(0.4)}
						>
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-300"
							>
								Password
							</label>
							<Input
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								required
							/>
						</motion.div>
						<motion.div
							initial="initial"
							animate="animate"
							variants={fadeInUp(0.5)}
							className="flex items-center justify-between mb-4"
						>
							<div className="flex items-start">
								<SimpleCheckbox
									checked={rememberMe}
									onCheckedChange={handleRememberMe}
									label="Remember me"
								/>
							</div>
						</motion.div>
						<motion.div
							initial="initial"
							animate="animate"
							variants={fadeInUp(0.6)}
							className="mb-4"
						>
							<SubmitButton />
						</motion.div>
						<motion.p
							className="text-sm font-light text-subtitle"
							initial="initial"
							animate="animate"
							variants={fadeInUp(0.7)}
						>
							Don't have an account yet?{' '}
							<Link
								href="/sign-up"
								className="font-bold text-subtitle trans hover:text-title  underline "
							>
								Sign up
							</Link>
						</motion.p>
					</form>
				</motion.div>
			</div>
		</Center>
	)
}

const SubmitButton = () => {
	const { pending } = useFormStatus()
	return (
		<Button
			variant="outline"
			type="submit"
			disabled={pending}
			className="w-full"
		>
			{pending ? 'Signing in...' : 'Sign in'}
		</Button>
	)
}
