'use client'

import RichTextEditor from '@/components/rich-text-editor'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { deleteFolder, getFolders } from '@/lib/actions/folders'
import { createNote, deleteNote, getNotes, updateNote } from '@/lib/api/notes'
import { useEffect, useState } from 'react'
import { CreateFolderButton } from './_components/create-folder-button'
import FolderItem from './_components/folder-item'
import NoteItem from './_components/note-item'
import { toast } from 'sonner'

export type Folder = {
	id: string
	name: string
}

export type Note = {
	id: string
	title: string
	content: string
	folderId: string | null
}

export default function NotesAndFolders() {
	const [folders, setFolders] = useState<Folder[]>([])
	const [notes, setNotes] = useState<Note[]>([])
	const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] =
		useState<boolean>(false)
	const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] =
		useState<boolean>(false)
	const [newFolderName, setNewFolderName] = useState<string>('')
	const [newNoteTitle, setNewNoteTitle] = useState<string>('')
	const [newNoteContent, setNewNoteContent] = useState<string>('')
	const [selectedFolderId, setSelectedFolderId] = useState<string | null>(
		null
	)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const foldersData = await getFolders()
		const notesData = await getNotes()
		setFolders(foldersData?.folders || [])
		setNotes(notesData || [])
	}

	const handleCreateNote = async () => {
		const formData = new FormData()
		formData.append('title', newNoteTitle)
		formData.append('content', newNoteContent)
		if (selectedFolderId) {
			formData.append('folderId', selectedFolderId)
		}
		try {
			const newNote = await createNote(formData)
			setNotes(prevNotes => [...prevNotes, newNote])
			setIsNewNoteDialogOpen(false)
			setNewNoteTitle('')
			setNewNoteContent('')
			setSelectedFolderId(null)
			toast.success('Note created successfully')
		} catch (error) {
			toast.error('Failed to create note')
		}
	}

	const handleUpdateNote = async (
		noteId: string,
		title: string,
		content: string,
		folderId: string | null
	) => {
		const formData = new FormData()
		formData.append('id', noteId)
		formData.append('title', title)
		formData.append('content', content)
		if (folderId) {
			formData.append('folderId', folderId)
		}
		await updateNote(formData)
		fetchData()
	}

	const handleDeleteFolder = async (folderId: string) => {
		const formData = new FormData()
		formData.append('id', folderId)
		await deleteFolder(formData)
		fetchData()
	}

	const handleDeleteNote = async (noteId: string) => {
		const formData = new FormData()
		formData.append('id', noteId)
		await deleteNote(formData)
		fetchData()
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between mb-4">
				<Button onClick={() => setIsNewFolderDialogOpen(true)}>
					New Folder
				</Button>
				<Button onClick={() => setIsNewNoteDialogOpen(true)}>
					New Note
				</Button>
			</div>
			{folders.map(folder => (
				<div key={folder.id} className="mb-6">
					<FolderItem
						folder={folder}
						onDelete={() => handleDeleteFolder(folder.id)}
					/>
					<div className="ml-6 mt-2 space-y-2">
						{notes
							.filter(note => note.folderId === folder.id)
							.map(note => (
								<NoteItem
									key={note.id}
									note={note}
									onUpdate={(title, content) =>
										handleUpdateNote(
											note.id,
											title,
											content,
											folder.id
										)
									}
									onDelete={() => handleDeleteNote(note.id)}
								/>
							))}
					</div>
				</div>
			))}
			<div className="mt-6">
				<h3 className="text-lg font-semibold mb-2">
					Uncategorized Notes
				</h3>
				<div className="space-y-2">
					{notes
						.filter(note => !note.folderId)
						.map(note => (
							<NfoteItem
								key={note.id}
								note={note}
								onUpdate={(title, content) =>
									handleUpdateNote(note.id, title, content)
								}
								onDelete={() => handleDeleteNote(note.id)}
							/>
						))}
				</div>
			</div>
			<CreateFolderButton />
			<Dialog
				open={isNewNoteDialogOpen}
				onOpenChange={setIsNewNoteDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Note</DialogTitle>
					</DialogHeader>
					<Input
						value={newNoteTitle}
						onChange={e => setNewNoteTitle(e.target.value)}
						placeholder="Note Title"
					/>
					<RichTextEditor
						content={newNoteContent}
						onChange={setNewNoteContent}
					/>
					<select
						value={selectedFolderId || ''}
						onChange={e => setSelectedFolderId(e.target.value)}
					>
						<option value="">No Folder</option>
						{folders.map(folder => (
							<option key={folder.id} value={folder.id}>
								{folder.name}
							</option>
						))}
					</select>
					<Button onClick={handleCreateNote}>Create Note</Button>
				</DialogContent>
			</Dialog>
		</div>
	)
}
