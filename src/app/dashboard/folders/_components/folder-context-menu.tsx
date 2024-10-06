import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger
} from '@/components/ui/context-menu'
import { Input } from '@/components/ui/input'
import { Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'

type FolderContextMenuProps = {
	folderId: string
	folderName: string
	onUpdate: (id: string, name: string, color: string) => Promise<void>
	onDelete: (id: string) => Promise<void>
}

export const FolderContextMenu: React.FC<FolderContextMenuProps> = ({
	folderId,
	folderName,
	onUpdate,
	onDelete
}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedName, setEditedName] = useState(folderName)

	const handleEdit = () => {
		setIsEditing(true)
	}

	const handleSave = () => {
		onUpdate(folderId, editedName, '#000000') // You may want to add color editing as well
		setIsEditing(false)
	}

	const handleDelete = () => {
		onDelete(folderId)
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger className="flex items-center">
				{isEditing ? (
					<Input
						value={editedName}
						onChange={e => setEditedName(e.target.value)}
						onBlur={handleSave}
						autoFocus
					/>
				) : (
					folderName
				)}
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={handleEdit}>
					<Edit2 className="mr-2 h-4 w-4" />
					Edit
				</ContextMenuItem>
				<ContextMenuItem onClick={handleDelete}>
					<Trash2 className="mr-2 h-4 w-4" />
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}
