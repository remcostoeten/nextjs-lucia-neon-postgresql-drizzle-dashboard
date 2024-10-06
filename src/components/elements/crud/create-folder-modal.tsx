'use client'

import { createFolder } from '@/lib/api/@@folders'
import { FolderType } from '@/types/types.folder'
import { Flex } from 'atoms'
import { toast } from 'sonner'
import { ColorPicker } from 'ui'

import { useState } from 'react'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Textarea
} from 'ui'

type CreateFolderModalProps = {
	onSuccess?: (newFolder: FolderType) => void
	trigger?: React.ReactNode
}

export default function CreateFolderModal({
	onSuccess,
	trigger
}: CreateFolderModalProps) {
	const [open, setOpen] = useState(false)
	const [folderName, setFolderName] = useState('')
	const [folderColor, setFolderColor] = useState('#000000')
	const [folderDescription, setFolderDescription] = useState('')

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData()
		formData.append('name', folderName)
		formData.append('description', folderDescription)
		formData.append('color', folderColor)
		try {
			const { success, folder, error } = await createFolder(formData)
			if (success && folder) {
				setOpen(false)
				onSuccess?.(folder)
				toast('Folder created sucesfuly')
				setFolderName('')
				setFolderDescription('')
				setFolderColor('#000000')
			} else if (error) {
				throw new Error(error)
			}
		} catch (error) {
			toast('Error creating folder')
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
						onChange={e => setFolderName(e.target.value)}
						placeholder="Folder name"
						required
					/>
					<Textarea
						value={folderDescription}
						onChange={e => setFolderDescription(e.target.value)}
						placeholder="Folder description (optional)"
					/>
					<Flex dir="col" gap="2">
						<label className="text-xs" htmlFor="folder-color">
							Folder Color:
						</label>
						<ColorPicker
							color={folderColor}
							onChange={setFolderColor}
						/>
					</Flex>
					<Button type="submit">Create Folder</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
