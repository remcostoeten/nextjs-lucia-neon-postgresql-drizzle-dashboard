import React from 'react'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from 'ui'

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
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{icon && <div className="mx-auto">{icon}</div>}
					<p className="text-center text-sm text-subtitle">
						{message}
					</p>
				</div>
				<div className="flex justify-between space-x-2">
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
