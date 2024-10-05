'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import LogoIcon from '@/components/base/logo'
import { Button, Input } from '@/components/ui'
import SimpleCheckbox from '@/components/ui/simple-checkbox'
import { signInAction } from '@/lib/actions/users'
import { toast } from 'toast'

const fadeInUp = (delay: number) => ({
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			delay: delay,
			ease: 'easeOut'
		}
	}
})

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
			showToast(state.error, 'error')
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
		<section className="min-h-screen bg-[#000000] flex items-center justify-center">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full max-w-md">
				<motion.a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-200"
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
						className="text-xl font-bold leading-tight tracking-tight text-gray-200 md:text-2xl"
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
								className="block mb-2 text-sm font-medium text-gray-300"
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
								className="bg-[#1c1c1c] border-[#2c2c2c] text-gray-200 placeholder-gray-400"
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
								className="bg-[#1c1c1c] border-[#2c2c2c] text-gray-200 placeholder-gray-400"
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
							className="text-sm font-light text-gray-400"
							initial="initial"
							animate="animate"
							variants={fadeInUp(0.7)}
						>
							Don't have an account yet?{' '}
							<Link
								href="/sign-up"
								className="font-medium text-primary-500 hover:underline"
							>
								Sign up
							</Link>
						</motion.p>
					</form>
				</motion.div>
			</div>
		</section>
	)
}

const SubmitButton = () => {
	const { pending } = useFormStatus()
	return (
		<Button
			variant="outline"
			type="submit"
			disabled={pending}
			className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
		>
			{pending ? 'Signing in...' : 'Sign in'}
		</Button>
	)
}
