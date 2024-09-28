import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import React from 'react'

type ConfirmationModalProps = {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title?: string
	message?: string
	confirmText?: string
	cancelText?: string
	icon?: React.ReactNode
}

export default function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	title = 'Confirm Action',
	message = 'Are you sure you want to perform this action?',
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	icon
}: ConfirmationModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<Button
						variant="ghost"
						className="absolute right-4 top-4"
						onClick={onClose}
					>
						<X className="h-4 w-4" />
					</Button>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{icon && <div className="mx-auto">{icon}</div>}
					<p className="text-center text-sm text-gray-500 dark:text-gray-400">
						{message}
					</p>
				</div>
				<div className="flex justify-end space-x-2">
					<Button variant="outline" onClick={onClose}>
						{cancelText}
					</Button>
					<Button variant="destructive" onClick={onConfirm}>
						{confirmText}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
