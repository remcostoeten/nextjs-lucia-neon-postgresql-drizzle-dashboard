'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import AuthFormError from '@/components/auth/AuthFormError'
import LogoIcon from '@/components/base/logo'
import { Button, Input } from '@/components/ui'
import SimpleCheckbox from '@/components/ui/simple-checkbox'
import { signInAction } from '@/lib/actions/users'

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
					className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-card"
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
							Sign in to your account
						</motion.h1>
						<AuthFormError state={state} />
						<form action={formAction}>
							<motion.div
								initial="initial"
								animate="animate"
								variants={fadeInUp(0.3)}
								className="mb-2"
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
								className="mb-2"
								variants={fadeInUp(0.4)}
							>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-900 dark:text-white"
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
								className="flex items-center justify-between translate-x-2 mb-2"
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
								className="mb-2"
							>
								<SubmitButton />
							</motion.div>
							<motion.p
								className="text-sm font-light text-gray-500 dark:text-gray-400"
								initial="initial"
								animate="animate"
								variants={fadeInUp(0.7)}
							>
								Don't have an account yet?{' '}
								<Link
									href="/sign-up"
									className="font-medium underline text-primary-600 hover:underline dark:text-primary-500"
								>
									Sign up
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
			Sign{pending ? 'ing' : ''} in
		</Button>
	)
}
