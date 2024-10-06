import React, { useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle } from 'ui'

type ConfirmationDialogProps = {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title: string
	children: React.ReactNode
}

export function ConfirmationDialog({
	isOpen,
	onClose,
	onConfirm,
	title,
	children
}: ConfirmationDialogProps) {
	const [showConfirmation, setShowConfirmation] = useState(false)

	const handleAction = () => {
		if (showConfirmation) {
			onConfirm()
			onClose()
		} else {
			setShowConfirmation(true)
		}
	}

	const handleClose = () => {
		setShowConfirmation(false)
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogTitle>{title}</DialogTitle>
				<div className="flex flex-col gap-4">
					{children}
					{showConfirmation ? (
						<div className="flex justify-between items-center">
							<span>Are you sure?</span>
							<div className="flex gap-2">
								<Button variant="outline" onClick={handleClose}>
									No
								</Button>
								<Button onClick={onConfirm}>Yes</Button>
							</div>
						</div>
					) : (
						<Button onClick={handleAction}>Confirm</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
