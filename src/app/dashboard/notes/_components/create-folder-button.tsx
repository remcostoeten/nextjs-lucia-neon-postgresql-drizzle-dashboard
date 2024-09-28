'use client'

import Flex from '@/components/atoms/Flex'
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

export function CreateFolderButton({
	onFolderCreated
}: {
	onFolderCreated?: () => void
}) {
	const [open, setOpen] = useState(false)
	const [folderColor, setFolderColor] = useState('#000000')
	const router = useRouter()

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.target as HTMLFormElement)
		formData.append('color', folderColor)
		try {
			const result = await createFolder(formData)
			if (result.success) {
				setOpen(false)
				router.refresh()
				toast.success('Folder created successfully')
				if (onFolderCreated) onFolderCreated()
			} else {
				throw new Error(result.error)
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
				<Button variant="outline">New Folder</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new folder</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input name="name" placeholder="Folder name" required />
					<Input
						name="description"
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
