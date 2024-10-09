'use client'

import { Button } from '@/components/ui/button'
import { signOutAction } from '@/core/server/actions/user/action.sign-out'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AuthFormError from './auth-form-error'

type SignOutBtnProps = {
	className?: string
}

export default function SignOutBtn({ className }: SignOutBtnProps) {
	const router = useRouter()
	const [error, setError] = useState('')

	const handleSignOut = async () => {
		try {
			const formData = new FormData()
			formData.append('device', navigator.userAgent)
			formData.append('location', window.location.href)
			formData.append(
				'timezone',
				Intl.DateTimeFormat().resolvedOptions().timeZone
			)
			formData.append('lastPage', window.location.pathname)
			formData.append('os', navigator.platform)

			const result = await signOutAction(formData)
			if (
				typeof result === 'object' &&
				result !== null &&
				'redirected' in result &&
				(result as { redirected: boolean }).redirected
			) {
				router.push((result as { url: string }).url)
			} else {
				router.push('/sign-in')
			}
		} catch (error) {
			console.warn('Sign out failed:', error)
			setError('Failed to sign out. Please try again.')
		}
	}

	return (
		<>
			<Button
				onClick={handleSignOut}
				className={className}
				variant="ghost"
			>
				<LogOut className="mr-2 h-4 w-4" />
				Sign out
			</Button>
			<AuthFormError state={{ error }} />
		</>
	)
}
