'use client'

import RichTextEditor from '@/components/rich-text-editor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { createFolder, deleteFolder, getFolders } from '@/lib/actions/folders'
import { createNote, deleteNote, getNotes, updateNote } from '@/lib/api/notes'
import { useEffect, useState } from 'react'
import FolderItem from './folder-item'
import NoteItem from './note-item'

export default function NotesAndFolders() {
	const [folders, setFolders] = useState([])
	const [notes, setNotes] = useState([])
	const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
	const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false)
	const [newFolderName, setNewFolderName] = useState('')
	const [newNoteTitle, setNewNoteTitle] = useState('')
	const [newNoteContent, setNewNoteContent] = useState('')
	const [selectedFolderId, setSelectedFolderId] = useState(null)
	const [activeFolder, setActiveFolder] = useState(null)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const foldersData = await getFolders()
		const notesData = await getNotes()
		setFolders(foldersData?.folders || [])
		setNotes(notesData || [])
	}

	const handleCreateFolder = async () => {
		const formData = new FormData()
		formData.append('name', newFolderName)
		await createFolder(formData)
		setIsNewFolderDialogOpen(false)
		setNewFolderName('')
		fetchData()
	}

	const handleCreateNote = async () => {
		const formData = new FormData()
		formData.append('title', newNoteTitle)
		formData.append('content', newNoteContent)
		formData.append('folderId', activeFolder || '')
		await createNote(formData)
		setIsNewNoteDialogOpen(false)
		setNewNoteTitle('')
		setNewNoteContent('')
		fetchData()
	}

	const handleUpdateNote = async (noteId, title, content, folderId) => {
		const formData = new FormData()
		formData.append('id', noteId)
		formData.append('title', title)
		formData.append('content', content)
		formData.append('folderId', folderId || '')
		await updateNote(formData)
		fetchData()
	}

	const handleDeleteFolder = async folderId => {
		const formData = new FormData()
		formData.append('id', folderId)
		await deleteFolder(formData)
		if (activeFolder === folderId) {
			setActiveFolder(null)
		}
		fetchData()
	}

	const handleDeleteNote = async noteId => {
		const formData = new FormData()
		formData.append('id', noteId)
		await deleteNote(formData)
		fetchData()
	}

	const handleFolderClick = folderId => {
		setActiveFolder(folderId === activeFolder ? null : folderId)
	}

	const activeFolderNotes = notes.filter(
		note => note.folderId === activeFolder
	)
	const uncategorizedNotes = notes.filter(note => !note.folderId)

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
						folder={folder}
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
