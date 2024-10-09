'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type SignOutBtnProps = {
	className?: string
}

export default function SignOutBtn({ className }: SignOutBtnProps) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const handleSignOut = async () => {
		setIsLoading(true)
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

			toast.success('Signed out successfully')
			router.push('/sign-in')
		} catch (error) {
			console.error('Sign out failed:', error)
			toast.error('Failed to sign out. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Button
			onClick={handleSignOut}
			className={className}
			variant="ghost"
			disabled={isLoading}
		>
			<LogOut className="mr-2 h-4 w-4" />
			{isLoading ? 'Signing out...' : 'Sign out'}
		</Button>
	)
}
