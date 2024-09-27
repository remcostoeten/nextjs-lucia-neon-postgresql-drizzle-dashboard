'use client'

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

export function CreateFolderButton() {
	const [open, setOpen] = useState(false)
	const router = useRouter()

	async function handleSubmit(event: {
		preventDefault: () => void
		target: HTMLFormElement | undefined
	}) {
		event.preventDefault()
		const formData = new FormData(event.target)
		try {
			await createFolder(formData)
			setOpen(false)
			router.refresh()
			toast.success('Folder created successfully')
		} catch (error) {
			toast.error('Failed to create folder')
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
				<form
					onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
						handleSubmit(event)
					}
					className="space-y-4"
				>
					<Input name="name" placeholder="Folder name" required />
					<Input
						name="description"
						placeholder="Folder description (optional)"
					/>
					<Button type="submit">Create Folder</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
