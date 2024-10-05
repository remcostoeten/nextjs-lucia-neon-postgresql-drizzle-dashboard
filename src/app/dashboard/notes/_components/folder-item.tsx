import React, { useState } from 'react'
import {
	Button,
	ColorPicker,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Input,
	Textarea
} from 'ui'

type EditFolderDialogProps = {
	folder: {
		id: string
		name: string
		color: string
		description?: string | null
	}
	isOpen: boolean
	onClose: () => void
	onSave: (
		id: string,
		name: string,
		color: string,
		description: string | null
	) => void
}

export function EditFolderDialog({
	folder,
	isOpen,
	onClose,
	onSave
}: EditFolderDialogProps) {
	const [name, setName] = useState(folder.name)
	const [color, setColor] = useState(folder.color)
	const [description, setDescription] = useState(folder.description || '')

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onSave(folder.id, name, color, description || null)
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Folder</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder="Folder Name"
						required
					/>
					<Textarea
						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder="Folder Description (optional)"
					/>
					<ColorPicker color={color} onChange={setColor} />
					<Button type="submit">Save Changes</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
