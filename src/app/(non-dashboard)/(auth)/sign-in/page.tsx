'use client'

import Center from '@/components/atoms/Center'
import SignInForm from '@/components/auth/sign-in-form'
import LogoIcon from '@/components/base/logo'
import { fadeInUp } from '@/core/constants/animations'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SignInPage() {
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
					<SignInForm />
					<motion.p
						className="text-sm font-light text-subtitle"
						initial="initial"
						animate="animate"
						variants={fadeInUp(0.7)}
					>
						Don't have an account yet?{' '}
						<Link
							href="/sign-up"
							className="font-bold text-subtitle trans hover:text-title underline"
						>
							Sign up
						</Link>
					</motion.p>
				</motion.div>
			</div>
		</Center>
	)
}
