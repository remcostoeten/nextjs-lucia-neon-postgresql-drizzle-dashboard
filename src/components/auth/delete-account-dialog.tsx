'use client'

import { deleteUserAccount } from '@/app/_actions/user'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input
} from 'ui'

export function DeleteAccountDialog() {
	const [isOpen, setIsOpen] = useState(false)
	const [confirmation, setConfirmation] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)

	const handleDelete = async () => {
		try {
			setIsDeleting(true)
			const result = await deleteUserAccount({ confirmation })

			if (result.error) {
				toast.error(result.error)
				return
			}

			toast.success('Account deleted successfully')
			await signOut({ callbackUrl: '/' })
		} catch (error) {
			toast.error('Failed to delete account')
		} finally {
			setIsDeleting(false)
			setIsOpen(false)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive" size="sm">
					Delete Account
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Account</DialogTitle>
					<DialogDescription>
						This action cannot be undone. Please type "delete my
						account permanently" to confirm.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Input
						placeholder="Type confirmation phrase"
						value={confirmation}
						onChange={(e) => setConfirmation(e.target.value)}
						className="col-span-3"
					/>
				</div>
				<DialogFooter>
					<Button variant="ghost" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={handleDelete}
						disabled={
							isDeleting ||
							confirmation !== 'delete my account permanently'
						}
					>
						{isDeleting ? 'Deleting...' : 'Delete Account'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
