'use client'

import { withUserInfo } from '@/components/auth/with-user-info'
import { signInAction } from 'actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button, Input } from 'ui'
import SimpleCheckbox from '../ui/simple-checkbox'
import { SignInFormProps } from './auth'

function SignInForm({ enhancedSubmit }: SignInFormProps) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)
	const router = useRouter()

	const handleSubmit = async (formData: FormData) => {
		const result = await signInAction(
			{
				error: '',
				success: false
			},
			formData
		)
		if (result.error) {
			toast(result.error)
		} else {
			toast('welcome back! 🎉 ')
			router.push('/dashboard')
		}
	}

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

	return (
		<form onSubmit={e => enhancedSubmit(e, handleSubmit)}>
			<div className="mb-4">
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
			<div className="mb-4">
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
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder="••••••••"
					required
				/>
			</div>
			<div className="flex items-center justify-between mb-4">
				<SimpleCheckbox
					checked={rememberMe}
					onCheckedChange={handleRememberMe}
					label="Remember me"
				/>
			</div>
			<Button variant="outline" type="submit" className="w-full">
				Sign in
			</Button>
		</form>
	)
}

export default withUserInfo(SignInForm)
