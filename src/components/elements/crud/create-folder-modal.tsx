'use client'

import { ColorPicker } from 'ui'
import Flex from '@/components/atoms/Flex'
import { createFolder } from '@/lib/api/folders'
import { FolderType } from '@/types/types.folder'
import { useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input
} from 'ui'

type CreateFolderModalProps = {
	onSuccess?: (newFolder: FolderType) => void
	trigger?: React.ReactNode
}

export function CreateFolderModal({
	onSuccess,
	trigger
}: CreateFolderModalProps) {
	const [open, setOpen] = useState(false)
	const [folderName, setFolderName] = useState('')
	const [folderDescription, setFolderDescription] = useState('')
	const [folderColor, setFolderColor] = useState('#000000')

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData()
		formData.append('name', folderName)
		formData.append('description', folderDescription)
		formData.append('color', folderColor)
		try {
			const newFolder = await createFolder(formData)
			setOpen(false)
			toast.success('Folder created successfully')
			onSuccess?.(newFolder)
			setFolderName('')
			setFolderDescription('')
			setFolderColor('#000000')
		} catch (error) {
			toast.error('Failed to create folder')
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger || <Button variant="outline">New Folder</Button>}
			</DialogTrigger>
			<DialogContent className="w-full max-w-[450px]">
				<DialogHeader>
					<DialogTitle>Create a new folder</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						value={folderName}
						onChange={(e) => setFolderName(e.target.value)}
						placeholder="Folder name"
						required
					/>
					<Input
						value={folderDescription}
						onChange={(e) => setFolderDescription(e.target.value)}
						placeholder="Folder description (optional)"
					/>
					<Flex dir="col" gap="2">
						<label className="text-xs" htmlFor="folder-color">
							Folder Color:
						</label>
						<ColorPicker
							value={folderColor}
							onChange={setFolderColor}
						/>
					</Flex>
					<Button type="submit">Create Folder</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
