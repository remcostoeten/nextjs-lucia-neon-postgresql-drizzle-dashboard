'use client'

import { updateUserName } from '@/app/_actions/user'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input
} from 'ui'
import { getUserName } from './server/get-user-name'

export function NamePromptModal() {
	const { data: session, update: updateSession } = useSession()
	const [isOpen, setIsOpen] = useState(false)
	const [name, setName] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		const fetchUserName = async () => {
			try {
				const username = await getUserName()
				if (!username || username.trim() === '') {
					setIsOpen(true)
				} else {
					setIsOpen(false)
					setName(username)
				}
			} catch (error) {
				console.error('Error in fetchUserName:', error)
			}
		}

		if (session?.user) {
			fetchUserName()
		}
	}, [session])

	const handleSubmit = async () => {
		if (!name.trim()) return

		try {
			setIsSubmitting(true)
			const result = await updateUserName({ name })

			if (result.error) {
				toast.error(result.error)
				return
			}

			await updateSession()
			toast.success(`Welcome aboard, ${name}! 🎉`, {
				duration: 5000
			})
			setIsOpen(false)
		} catch (error) {
			toast.error('Failed to update name')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) {
					setIsOpen(false)
				}
			}}
		>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						Welcome! <span className="wave">👋</span>
					</DialogTitle>
					<DialogDescription>
						Please tell us your name to complete your profile.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Input
							id="name"
							placeholder="Enter your name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault()
									handleSubmit()
								}
							}}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						onClick={handleSubmit}
						disabled={isSubmitting || !name.trim()}
					>
						{isSubmitting ? 'Saving...' : 'Continue'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
