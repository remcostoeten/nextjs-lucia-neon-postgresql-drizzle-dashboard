'use client'

import RichTextEditor from '@/components/rich-text-editor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ColorPicker } from '@/components/ui/color-picker'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { createFolder, deleteFolder, getFolders } from '@/lib/api/folders'
import { createNote, deleteNote, getNotes, updateNote } from '@/lib/api/notes'
import { SetStateAction, useEffect, useState } from 'react'
import FolderItem from './folder-item'
import NoteItem from './note-item'
import { toast } from 'sonner'

export default function NotesAndFolders() {
	const [folders, setFolders] = useState([])
	const [notes, setNotes] = useState([])
	const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
	const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false)
	const [newFolderName, setNewFolderName] = useState('')
	const [newFolderColor, setNewFolderColor] = useState('#000000')
	const [newNoteTitle, setNewNoteTitle] = useState('')
	const [newNoteContent, setNewNoteContent] = useState('')
	const [activeFolder, setActiveFolder] = useState(null)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const foldersData = await getFolders()
		const notesData = await getNotes()
		setFolders(foldersData?.folders || [])
		setNotes(notesData?.notes || [])
	}

	const handleCreateFolder = async () => {
		const formData = new FormData()
		formData.append('name', newFolderName)
		formData.append('color', newFolderColor)
		await createFolder(formData)
		setIsNewFolderDialogOpen(false)
		setNewFolderName('')
		setNewFolderColor('#000000')
		fetchData()
	}

	const handleUpdateNote = async (
		noteId: string | Blob,
		title: string | Blob,
		content: string | Blob,
		folderId: any
	) => {
		const formData = new FormData()
		formData.append('id', noteId)
		formData.append('title', title)
		formData.append('content', content)
		formData.append('folderId', folderId || '')
		await updateNote(formData)
		fetchData()
	}

	const handleCreateNote = async () => {
		const formData = new FormData()
		formData.append('title', newNoteTitle)
		formData.append('content', newNoteContent)
		if (activeFolder) {
			formData.append('folderId', activeFolder)
		}
		try {
			const newNote = await createNote(formData)
			setNotes(prevNotes => [...prevNotes, newNote])
			setIsNewNoteDialogOpen(false)
			setNewNoteTitle('')
			setNewNoteContent('')
			toast.success('Note created successfully')
		} catch (error: any) {
			if (error.message === 'Invalid folder ID') {
				toast.error('Invalid folder selected. Please try again.')
			} else {
				toast.error('Failed to create note. Please try again.')
			}
		}
	}

	const handleDeleteFolder = async (folderId: string | Blob | null) => {
		const formData = new FormData()
		formData.append('id', folderId)
		await deleteFolder(formData)
		if (activeFolder === folderId) {
			setActiveFolder(null)
		}
		fetchData()
	}

	const handleDeleteNote = async (noteId: string | Blob) => {
		const formData = new FormData()
		formData.append('id', noteId)
		await deleteNote(formData)
		fetchData()
	}

	const handleFolderClick = (folderId: SetStateAction<null>) => {
		setActiveFolder(folderId === activeFolder ? null : folderId)
	}
	type Note = {
		id: string
		folderId?: string
	}

	const activeFolderNotes = notes.filter(
		(note: Note) => note.folderId === activeFolder
	)
	const uncategorizedNotes = notes.filter((note: Note) => !note.folderId)

	return (
		<div className="flex h-full">
			<div className="w-1/4 pr-4 overflow-y-auto">
				<Button
					onClick={() => setIsNewFolderDialogOpen(true)}
					className="mb-4 w-full"
				>
					New Folder
				</Button>
				{folders.map(folder => (
					<FolderItem
						key={folder.id}
						id={folder.id}
						name={folder.name}
						onDelete={() => handleDeleteFolder(folder.id)}
						onClick={() => handleFolderClick(folder.id)}
						isActive={folder.id === activeFolder}
					/>
				))}
			</div>
			<div className="w-3/4 pl-4 border-l overflow-y-auto">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="text-2xl font-bold">
							{activeFolder
								? folders.find(f => f.id === activeFolder)
										?.name || 'Selected Folder'
								: 'All Notes'}
						</CardTitle>
						<Button onClick={() => setIsNewNoteDialogOpen(true)}>
							New Note
						</Button>
					</CardHeader>
					<CardContent>
						{(activeFolder
							? activeFolderNotes
							: uncategorizedNotes
						).map(note => (
							<NoteItem
								key={note.id}
								note={note}
								onUpdate={(title, content) =>
									handleUpdateNote(
										note.id,
										title,
										content,
										note.folderId
									)
								}
								onDelete={() => handleDeleteNote(note.id)}
							/>
						))}
						{(activeFolder ? activeFolderNotes : uncategorizedNotes)
							.length === 0 && (
							<p className="text-muted-foreground">
								No notes in this folder.
							</p>
						)}
					</CardContent>
				</Card>
			</div>

			<Dialog
				open={isNewFolderDialogOpen}
				onOpenChange={setIsNewFolderDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Folder</DialogTitle>
					</DialogHeader>
					<Input
						value={newFolderName}
						onChange={e => setNewFolderName(e.target.value)}
						placeholder="Folder Name"
					/>
					<ColorPicker
						value={newFolderColor}
						onChange={setNewFolderColor}
					/>
					<Button onClick={handleCreateFolder}>Create Folder</Button>
				</DialogContent>
			</Dialog>

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
					<Button onClick={handleCreateNote}>Create Note</Button>
				</DialogContent>
			</Dialog>
		</div>
	)
}
