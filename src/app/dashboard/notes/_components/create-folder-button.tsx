'use client'

import { ColorPicker } from '@/components/ui/color-picker'
import { createFolder } from '@/lib/api/folders'
import { useRouter } from 'next/navigation'
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

interface CreateFolderButtonProps {
	onFolderCreated: (newFolder: {
		id: string
		name: string
		color: string
	}) => void
}

export function CreateFolderButton({
	onFolderCreated
}: CreateFolderButtonProps) {
	const [open, setOpen] = useState(false)
	const [folderColor, setFolderColor] = useState('#000000')
	const router = useRouter()

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.target as HTMLFormElement)
		formData.append('color', folderColor)
		try {
			const result = await createFolder(formData)
			if (result.success && result.folder) {
				setOpen(false)
				router.refresh()
				toast.success('Folder created successfully')
				onFolderCreated(result.folder)
			} else {
				throw new Error(result.error || 'Failed to create folder')
			}
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: 'Failed to create folder'
			)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Create Folder</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Folder</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<Input name="name" placeholder="Folder Name" required />
					<Input
						name="description"
						placeholder="Folder Description"
					/>
					<ColorPicker
						color={folderColor}
						onChange={setFolderColor}
						value={''}
					/>
					<Button type="submit">Create Folder</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
