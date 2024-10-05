'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import AuthFormError from '@/components/auth/auth-form-error'
import LogoIcon from '@/components/base/logo'
import { Button, Input } from '@/components/ui'
import { signUpAction } from '@/lib/actions/users'
import { EyeClosedIcon } from '@radix-ui/react-icons'
import { EyeIcon } from 'lucide-react'

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

export default function SignUpPage() {
	const router = useRouter()
	const [state, formAction] = useFormState(signUpAction, {
		error: ''
	})
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		if (state.success) {
			toast.success(state.success)
			router.push('/dashboard')
		}
	}, [state.success, router])

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setConfirmPassword(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			state.error = 'Passwords do not match'
			return
		}
		formAction(new FormData(e.currentTarget))
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
						Create an account
					</motion.h1>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<motion.div
							initial="initial"
							animate="animate"
							variants={fadeInUp(0.3)}
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
							variants={fadeInUp(0.4)}
						>
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-300"
							>
								Password
							</label>
							<div className="relative">
								<Input
									type={showPassword ? 'text' : 'password'}
									name="password"
									id="password"
									value={password}
									onChange={handlePasswordChange}
									placeholder="••••••••"
									required
									className="bg-[#1c1c1c] border-[#2c2c2c] text-gray-200 placeholder-gray-400"
								/>
								<button
									type="button"
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<EyeClosedIcon className="w-4 h-4" />
									) : (
										<EyeIcon className="w-4 h-4" />
									)}
								</button>
							</div>
						</motion.div>
						<motion.div
							initial="initial"
							animate="animate"
							variants={fadeInUp(0.5)}
						>
							<label
								htmlFor="confirmPassword"
								className="block mb-2 text-sm font-medium text-gray-300"
							>
								Confirm Password
							</label>
							<div className="relative">
								<Input
									type={showPassword ? 'text' : 'password'}
									name="confirmPassword"
									id="confirmPassword"
									value={confirmPassword}
									onChange={handleConfirmPasswordChange}
									placeholder="••••••••"
									required
									className="bg-[#1c1c1c] border-[#2c2c2c] text-gray-200 placeholder-gray-400"
								/>
								<button
									type="button"
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<EyeClosedIcon className="w-4 h-4" />
									) : (
										<EyeIcon className="w-4 h-4" />
									)}
								</button>
							</div>
						</motion.div>
						<motion.div
							initial="initial"
							animate="animate"
							variants={fadeInUp(0.6)}
						>
							<SubmitButton />
						</motion.div>
					</form>
					<motion.p
						className="text-sm font-light text-gray-400"
						initial="initial"
						animate="animate"
						variants={fadeInUp(0.7)}
					>
						Already have an account?{' '}
						<Link
							href="/sign-in"
							className="font-medium text-primary-500 hover:underline"
						>
							Sign in
						</Link>
					</motion.p>
				</motion.div>
			</div>
			<AuthFormError state={state} />
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
			{pending ? 'Signing up...' : 'Sign up'}
		</Button>
	)
}
