'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import AuthFormError from '@/components/auth/AuthFormError'
import LogoIcon from '@/components/base/logo'
import { Button, Input } from '@/components/ui'
import { signUpAction } from '@/lib/actions/users'

const fadeInUp = (delay: number) => ({
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			delay: delay,
			ease: "easeOut"
		}
	}
})

export default function SignUpPage() {
	const router = useRouter()
	const [state, formAction] = useFormState(signUpAction, {
		error: ''
	})
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	useEffect(() => {
		if (state.success) {
			toast.success(state.success)
			router.push('/dashboard')
		}
	}, [state.success, router])

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(e.target.value)
	}

	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value)
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
						<form
							className="space-y-4 md:space-y-6"
							action={formAction}
						>
							<motion.div
								className="flex space-x-4"
								initial="initial"
								animate="animate"
								variants={fadeInUp(0.3)}
							>
								<div className="w-1/2">
									<label
										htmlFor="firstName"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										First Name
									</label>
									<Input
										type="text"
										name="firstName"
										id="firstName"
										value={firstName}
										onChange={handleFirstNameChange}
										placeholder="John"
										required
									/>
								</div>
								<div className="w-1/2">
									<label
										htmlFor="lastName"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Last Name
									</label>
									<Input
										type="text"
										name="lastName"
										id="lastName"
										value={lastName}
										onChange={handleLastNameChange}
										placeholder="Doe"
										required
									/>
								</div>
							</motion.div>
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
								variants={fadeInUp(0.6)}
							>
								<SubmitButton />
							</motion.div>
							<motion.p
								className="text-sm font-light text-gray-500 dark:text-gray-400"
								initial="initial"
								animate="animate"
								variants={fadeInUp(0.7)}
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
