import { EditFolderDialog } from '@/components/elements/crud/edit-folder-modal'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { FolderOpen, MoreVertical, Pencil, Trash } from 'lucide-react'
import React, { useState } from 'react'

interface FolderItemProps {
	folder: {
		id: string
		name: string
		color: string
	}
	onDelete: () => void
	onEdit: (id: string, name: string, color: string) => void
}

const FolderItem: React.FC<FolderItemProps> = ({
	folder,
	onDelete,
	onEdit
}) => {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

	return (
		<>
			<div className="flex items-center justify-between mb-2">
				<Button variant="ghost" className="w-full justify-start">
					<FolderOpen
						size={16}
						className="mr-2"
						style={{ color: folder.color }}
					/>
					<span>{folder.name}</span>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<MoreVertical className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => setIsEditDialogOpen(true)}
						>
							<Pencil className="mr-2 h-4 w-4" />
							<span>Edit</span>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onDelete}>
							<Trash className="mr-2 h-4 w-4" />
							<span>Delete</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<EditFolderDialog
				folder={folder}
				isOpen={isEditDialogOpen}
				onClose={() => setIsEditDialogOpen(false)}
				onSave={onEdit}
			/>
		</>
	)
}

export default FolderItem
