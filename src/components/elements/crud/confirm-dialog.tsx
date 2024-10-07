import { Flex } from '@/components/atoms'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from 'ui'
interface ConfirmationDialogProps {
	isOpen: boolean
	onClose: () => void
	onConfirm?: () => void
	title: string
	children: React.ReactNode
	confirmLabel?: string
	cancelLabel?: string
	hideConfirmButton?: boolean
}

/**
 * ConfirmationDialog component renders a dialog with a title, description, and optional confirm and cancel buttons.
 *
 * @param {boolean} isOpen - Determines if the dialog is open.
 * @param {() => void} onClose - Function to call when the dialog is closed.
 * @param {() => void} [onConfirm] - Optional function to call when the confirm button is clicked.
 * @param {string} title - The title of the dialog.
 * @param {React.ReactNode} children - The content of the dialog.
 * @param {string} [confirmLabel="Confirm"] - The label for the confirm button.
 * @param {string} [cancelLabel="Cancel"] - The label for the cancel button.
 * @param {boolean} [hideConfirmButton=false] - Determines if the confirm button should be hidden.
 *
 * @example
 * <ConfirmationDialog
 *   isOpen={isDialogOpen}
 *   onClose={handleClose}
 *   onConfirm={handleConfirm}
 *   title="Confirm Action"
 * >
 *   Are you sure you want to perform this action?
 * </ConfirmationDialog>
 */
export function ConfirmationDialog({
	isOpen,
	onClose,
	onConfirm,
	title,
	children,
	confirmLabel = 'Confirm',
	cancelLabel = 'Cancel',
	hideConfirmButton = false
}: ConfirmationDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<DialogDescription>{children}</DialogDescription>
				<DialogFooter>
					<Flex>
						<Button variant="outline" onClick={onClose}>
							{cancelLabel}
						</Button>
						{!hideConfirmButton && onConfirm && (
							<Button onClick={onConfirm}>{confirmLabel}</Button>
						)}
					</Flex>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
