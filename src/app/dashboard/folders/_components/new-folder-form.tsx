'use client'

import { Button, Input } from 'ui'
import { createFolder } from '@/lib/actions/folders'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<Button type="submit" disabled={pending}>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Creating...
				</>
			) : (
				'Create Folder'
			)}
		</Button>
	)
}

type NewFolderFormProps = {
	parentId: string | null
	onSuccess: () => void
}

export function NewFolderForm({ parentId, onSuccess }: NewFolderFormProps) {
	const [name, setName] = useState('')
	const [color, setColor] = useState('#000000')
	const router = useRouter()

	async function handleCreateFolder(formData: FormData) {
		const name = formData.get('name') as string
		const color = formData.get('color') as string

		if (name.trim()) {
			try {
				await createFolder(name.trim(), null, parentId, color)
				setName('')
				setColor('#000000')
				router.refresh()
				onSuccess()
			} catch (error) {
				console.error('Error creating folder:', error)
				// Here you might want to set an error state and display it to the user
			}
		}
	}

	return (
		<form action={handleCreateFolder} className="space-y-4">
			<div>
				<label
					htmlFor="folderName"
					className="block text-sm font-medium text-gray-700"
				>
					Folder Name
				</label>
				<Input
					id="folderName"
					name="name"
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder="Enter folder name"
					className="mt-1"
					required
				/>
			</div>
			<div>
				<label
					htmlFor="folderColor"
					className="block text-sm font-medium text-gray-700"
				>
					Folder Color
				</label>
				<Input
					id="folderColor"
					name="color"
					type="color"
					value={color}
					onChange={e => setColor(e.target.value)}
					className="mt-1"
				/>
			</div>
			<SubmitButton />
		</form>
	)
}
