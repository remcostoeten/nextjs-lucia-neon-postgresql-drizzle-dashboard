import RichTextEditor from '@/components/rich-text-editor'
import { useState } from 'react'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Input
} from 'ui'

type NewNoteModalProps = {
	isOpen: boolean
	onClose: () => void
	onCreateNote: (title: string, content: string) => void
}

export default function NewNoteModal({
	isOpen,
	onClose,
	onCreateNote
}: NewNoteModalProps) {
	const [newNoteTitle, setNewNoteTitle] = useState('')
	const [newNoteContent, setNewNoteContent] = useState('')

	const handleCreateNote = () => {
		onCreateNote(newNoteTitle, newNoteContent)
		setNewNoteTitle('')
		setNewNoteContent('')
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Note</DialogTitle>
				</DialogHeader>
				<Input
					value={newNoteTitle}
					onChange={e => setNewNoteTitle(e.target.value)}
					placeholder="Note Title"
				/>
				<RichTextEditor
					content={newNoteContent}
					onChange={setNewNoteContent}
				/>
				<Button onClick={handleCreateNote}>Create Note</Button>
			</DialogContent>
		</Dialog>
	)
}
