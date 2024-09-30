'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { getUserAuth } from '@/lib/auth/utils'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type UserInfo = {
	id: string
	name?: string
	email?: string
	username?: string
} | null

export default function AuthStatusIndicator() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [userInfo, setUserInfo] = useState<UserInfo>(null)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { session } = await getUserAuth()
				setIsAuthenticated(!!session)
				if (session) {
					setUserInfo(session.user)
				} else {
					setUserInfo(null)
				}
			} catch (error) {
				console.error('Error checking authentication:', error)
				setIsAuthenticated(false)
				setUserInfo(null)
			}
		}
		checkAuth()
	}, [])

	const handleClick = () => {
		if (!isAuthenticated) {
			toast.error('Not authenticated')
		} else {
			setIsOpen(true)
		}
	}

	return (
		<>
			<motion.div
				className={`fixed bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${
					isAuthenticated ? 'bg-green-500' : 'bg-red-500'
				}`}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={handleClick}
			>
				<User className="text-white" />
			</motion.div>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>User Information</DialogTitle>
					</DialogHeader>
					<div className="mt-4">
						{userInfo && (
							<>
								<p>
									<strong>ID:</strong> {userInfo.id}
								</p>
								<p>
									<strong>Name:</strong>{' '}
									{userInfo.name || 'N/A'}
								</p>
								<p>
									<strong>Email:</strong>{' '}
									{userInfo.email || 'N/A'}
								</p>
							</>
						)}
					</div>
					<Button onClick={() => setIsOpen(false)}>Close</Button>
				</DialogContent>
			</Dialog>
		</>
	)
}
