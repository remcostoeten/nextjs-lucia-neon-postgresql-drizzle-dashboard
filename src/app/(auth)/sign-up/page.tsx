'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import AuthFormError from '@/components/auth/AuthFormError'
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

	return (
		<section className="">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<motion.a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					initial="initial"
					animate="animate"
					variants={fadeInUp(0)}
				>
					<LogoIcon />
					remcostoeten
				</motion.a>
				<motion.div
					className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-card"
					initial="initial"
					animate="animate"
					variants={fadeInUp(0.1)}
				>
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<motion.h1
							className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
							initial="initial"
							animate="animate"
							variants={fadeInUp(0.2)}
						>
							Create an account
						</motion.h1>
						<AuthFormError state={state} />
						<form className="space-y-2" action={formAction}>
							<motion.div
								initial="initial"
								animate="animate"
								variants={fadeInUp(0.4)}
							>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
								variants={fadeInUp(0.5)}
							>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<div className="relative">
									<Input
										type={
											showPassword ? 'text' : 'password'
										}
										name="password"
										id="password"
										value={password}
										onChange={handlePasswordChange}
										placeholder="••••••••"
										required
									/>
									<button
										type="button"
										className="absolute right-3 top-3"
										onClick={() =>
											setShowPassword(!showPassword)
										}
									>
										{showPassword ? (
											<EyeClosedIcon className="text-sutitle" />
										) : (
											<EyeIcon className="text-subtitle" />
										)}
									</button>
								</div>
							</motion.div>
							<motion.div
								initial="initial"
								animate="animate"
								variants={fadeInUp(0.6)}
							>
								<label
									htmlFor="confirmPassword"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Confirm Password
								</label>
								<div className="relative">
									<Input
										type={
											showPassword ? 'text' : 'password'
										}
										name="confirmPassword"
										id="confirmPassword"
										value={confirmPassword}
										onChange={handleConfirmPasswordChange}
										placeholder="••••••••"
										required
									/>
									<button
										type="button"
										className="absolute right-3 top-3"
										onClick={() =>
											setShowPassword(!showPassword)
										}
									>
										{showPassword ? (
											<EyeClosedIcon className="text-sutitle" />
										) : (
											<EyeIcon className="text-subtitle" />
										)}
									</button>
								</div>
							</motion.div>
							<motion.div
								initial="initial"
								animate="animate"
								variants={fadeInUp(0.7)}
							>
								<SubmitButton />
							</motion.div>
							<motion.p
								className="text-sm font-light text-gray-500 dark:text-gray-400"
								initial="initial"
								animate="animate"
								variants={fadeInUp(0.8)}
							>
								Already have an account?{' '}
								<Link
									href="/sign-in"
									className="font-medium underline text-primary-600 hover:underline dark:text-primary-500"
								>
									Sign in
								</Link>
							</motion.p>
						</form>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

const SubmitButton = () => {
	const { pending } = useFormStatus()
	return (
		<Button variant="outline" type="submit" disabled={pending}>
			{' '}
			Sign{pending ? 'ing' : ''} up
		</Button>
	)
}
