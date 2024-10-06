'use client'

import RichTextEditor from '@/components/rich-text-editor'
import { createNote } from '@/lib/api/@@notes'
import { useRouter } from 'next/navigation'
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

type CreateNoteButtonProps = {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	title: string
	onTitleChange: (title: string) => void
	content: string
	onContentChange: (content: string) => void
	onCreateNote: () => Promise<void>
}

export function CreateNoteButton({
	isOpen,
	onOpenChange,
	title,
	onTitleChange,
	content,
	onContentChange,
	onCreateNote
}: CreateNoteButtonProps) {
	const router = useRouter()

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		try {
			await onCreateNote()
			onOpenChange(false)
			router.refresh()
			toast.success('Note created successfully')
		} catch (error) {
			toast.error('Failed to create note')
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button>Add a new note</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create a new note</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						name="title"
						placeholder="Note title"
						required
						value={title}
						onChange={e => onTitleChange(e.target.value)}
					/>
					<RichTextEditor
						content={content}
						onChange={onContentChange}
					/>
					<Button type="submit">Create Note</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
