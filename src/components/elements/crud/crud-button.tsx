'use client'

import { CustomDropdown, DropdownAction } from '@/components/elements'
import ConfirmationModal from '@/components/elements/crud/confirmation-modal'
import { EditFolderDialog } from '@/components/elements/crud/edit-folder-modal'
import { FolderType } from '@/types/types.folder'
import { Edit, Trash } from 'lucide-react'
import { useState } from 'react'

type FolderCrudButtonProps = {
	folder: FolderType
	onDelete: (folderId: string) => void
}

export default function FolderCrudButton({
	folder,
	onDelete
}: FolderCrudButtonProps) {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
		useState(false)

	const handleDelete = () => {
		onDelete(folder.id)
		setIsDeleteConfirmationOpen(false)
	}

	const actions: DropdownAction[] = [
		{
			label: 'Edit',
			icon: <Edit size={16} />,
			onClick: () => setIsEditDialogOpen(true)
		},
		{
			label: 'Delete',
			icon: <Trash size={16} />,
			onClick: () => setIsDeleteConfirmationOpen(true)
		}
	]

	return (
		<>
			<CustomDropdown actions={actions} />

			<EditFolderDialog
				folder={folder}
				isOpen={isEditDialogOpen}
				onClose={() => setIsEditDialogOpen(false)}
				onSave={() => setIsEditDialogOpen(false)} // Implement save logic as needed
			/>

			<ConfirmationModal
				isOpen={isDeleteConfirmationOpen}
				onClose={() => setIsDeleteConfirmationOpen(false)}
				onConfirm={handleDelete}
				title="Delete Folder"
				message={`Are you sure you want to delete the folder "${folder.name}"? This action cannot be undone.`}
				confirmText="Delete"
				cancelText="Cancel"
			/>
		</>
	)
}
