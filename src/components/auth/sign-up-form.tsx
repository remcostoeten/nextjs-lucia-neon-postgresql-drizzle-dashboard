'use client'

import { withUserInfo } from '@/components/auth/with-user-info'
import { Button, Input } from '@/components/ui'
import { fadeInUp } from '@/core/constants/animations'
import signUpAction from '@/core/server/actions/user/action.sign-up'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { SignUpFormProps } from './auth'

function SignUpForm({ enhancedSubmit }: SignUpFormProps) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const router = useRouter()

	const handleSubmit = async (formData: FormData) => {
		if (password !== confirmPassword) {
			toast("Passwords don't match")
			return
		}

		const result = await signUpAction(
			{
				error: '',
				success: false
			},
			formData
		)
		if ('error' in result) {
			toast(result.error)
		} else {
			router.push('/dashboard')
		}
	}

	return (
		<motion.form
			onSubmit={e => enhancedSubmit(e, handleSubmit)}
			initial="initial"
			animate="animate"
			variants={fadeInUp(0.2)}
			className="space-y-4"
		>
			<div>
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
					onChange={e => setEmail(e.target.value)}
					placeholder="name@company.com"
					required
				/>
			</div>
			<div>
				<label
					htmlFor="password"
					className="block mb-2 text-sm font-medium text-subtitle"
				>
					Password
				</label>
				<Input
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder="••••••••"
					required
				/>
			</div>
			<div>
				<label
					htmlFor="confirmPassword"
					className="block mb-2 text-sm font-medium text-subtitle"
				>
					Confirm Password
				</label>
				<Input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					placeholder="••••••••"
					required
				/>
			</div>
			<Button variant="outline" type="submit" className="w-full">
				Sign up
			</Button>
		</motion.form>
	)
}

export default withUserInfo(SignUpForm)
