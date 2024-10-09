'use client'

import { withUserInfo } from '@/components/auth/with-user-info'
import { Button, Input } from '@/components/ui'
import SimpleCheckbox from '@/components/ui/simple-checkbox'
import { signInAction } from '@/core/server/actions/user/action.sign-in'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type SignInFormProps = {
	userInfo: {
		device: string
		location: string
		timezone: string
		lastPage: string
		os: string
	}
	enhancedSubmit: (
		event: React.FormEvent<HTMLFormElement>,
		originalSubmit: (formData: FormData) => Promise<void>
	) => Promise<void>
}

function SignInForm({ userInfo, enhancedSubmit }: SignInFormProps) {
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
