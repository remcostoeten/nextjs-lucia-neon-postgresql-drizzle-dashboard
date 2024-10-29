'use client'

import { signOutAction } from '@/core/server/actions/user/action.sign-out'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from 'ui'

export default function SignOutBtn() {
	const router = useRouter()
	const [isSigningOut, setIsSigningOut] = useState(false)

	const handleSignOut = async () => {
		setIsSigningOut(true)
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
			toast('Signing out...')
			try {
				await signOutAction(formData)
				router.push('/sign-in')
				router.refresh()
				toast.success('Signed out successfully')
			} catch (error) {
				toast.error('Sign out failed')
				console.error('Sign out failed:', error)
			}
		} catch (error) {
			console.error('Sign out failed:', error)
		} finally {
			setIsSigningOut(false)
		}
	}

	return (
		<Button onClick={handleSignOut} disabled={isSigningOut}>
			{isSigningOut ? (
				'Signing out...'
			) : (
				<>
					<LogOut className="mr-2 h-4 w-4" />
					Sign out
				</>
			)}
		</Button>
	)
}
