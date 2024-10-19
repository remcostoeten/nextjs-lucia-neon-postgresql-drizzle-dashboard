import { Button, Input, Label, Textarea } from '@/components/ui'
import { Board } from '@/types/tasks'
import { createBoard } from 'actions'
import { useState } from 'react'
import { toast } from 'sonner'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from 'ui'
interface CreateBoardModalProps {
	isOpen: boolean
	onClose: () => void
	onBoardCreated: (board: Board) => void
	userId: string
}

export default function CreateBoardModal({
	isOpen,
	onClose,
	onBoardCreated,
	userId
}: CreateBoardModalProps) {
	const [boardName, setBoardName] = useState('')
	const [boardDescription, setBoardDescription] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleCreateBoard = async () => {
		if (!boardName.trim()) {
			toast.error('Board name is required')
			return
		}

		setIsLoading(true)
		try {
			const newBoard = await createBoard(userId, {
				name: boardName.trim(),
				description: boardDescription.trim()
			})
			onBoardCreated(newBoard)
			toast.success('Board created successfully')
			handleClose()
		} catch (error) {
			console.error('Error creating board:', error)
			if (error instanceof Error) {
				toast.error(`Failed to create board: ${error.message}`)
			} else {
				toast.error('Failed to create board. Please try again.')
			}
		} finally {
			setIsLoading(false)
		}
	}

	const handleClose = () => {
		setBoardName('')
		setBoardDescription('')
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New Board</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="board-name" className="text-right">
							Name
						</Label>
						<Input
							id="board-name"
							value={boardName}
							onChange={e => setBoardName(e.target.value)}
							className="col-span-3"
							placeholder="Enter board name"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label
							htmlFor="board-description"
							className="text-right"
						>
							Description
						</Label>
						<Textarea
							id="board-description"
							value={boardDescription}
							onChange={e => setBoardDescription(e.target.value)}
							className="col-span-3"
							placeholder="Enter board description (optional)"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={handleClose}>
						Cancel
					</Button>
					<Button onClick={handleCreateBoard} disabled={isLoading}>
						{isLoading ? 'Creating...' : 'Create Board'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
