'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import RichTextEditor from '@/components/rich-text-editor'
import { deleteFolder, getFolders, updateFolder } from '@/lib/actions/folders'
import { createNote, deleteNote, getNotes, updateNote } from '@/lib/api/notes'
import { CreateFolderButton } from './_components/create-folder-button'
import FolderItem from './_components/folder-item'
import NoteItem from './_components/note-item'

export type Folder = {
	id: string
	name: string
	color: string
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
	const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] =
		useState<boolean>(false)
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
		if (foldersData.folders) setFolders(foldersData.folders)
		if (notesData) setNotes(notesData)
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
		try {
			await updateNote(formData)
			setNotes(prevNotes =>
				prevNotes.map(note =>
					note.id === noteId
						? { ...note, title, content, folderId }
						: note
				)
			)
			toast.success('Note updated successfully')
		} catch (error) {
			toast.error('Failed to update note')
		}
	}

	const handleDeleteFolder = async (folderId: string) => {
		const formData = new FormData()
		formData.append('id', folderId)
		try {
			await deleteFolder(formData)
			setFolders(prevFolders =>
				prevFolders.filter(folder => folder.id !== folderId)
			)
			setNotes(prevNotes =>
				prevNotes.filter(note => note.folderId !== folderId)
			)
			toast.success('Folder deleted successfully')
		} catch (error) {
			toast.error('Failed to delete folder')
		}
	}

	const handleDeleteNote = async (noteId: string) => {
		const formData = new FormData()
		formData.append('id', noteId)
		try {
			await deleteNote(formData)
			setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
			toast.success('Note deleted successfully')
		} catch (error) {
			toast.error('Failed to delete note')
		}
	}

	const handleEditFolder = async (
		id: string,
		name: string,
		color: string
	) => {
		try {
			const formData = new FormData()
			formData.append('id', id)
			formData.append('name', name)
			formData.append('color', color)
			const result = await updateFolder(formData)
			if (result.success) {
				setFolders(prevFolders =>
					prevFolders.map(folder =>
						folder.id === id ? { ...folder, name, color } : folder
					)
				)
				toast.success('Folder updated successfully')
			} else {
				throw new Error(result.error || 'Failed to update folder')
			}
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: 'Failed to update folder'
			)
		}
	}

	return (
		<div className="flex h-full">
			<div className="w-1/4 pr-4 overflow-y-auto">
				<CreateFolderButton
					onFolderCreated={newFolder => {
						setFolders(prevFolders => [
							...prevFolders,
							{
								id: newFolder.id,
								name: newFolder.name || 'Untitled Folder',
								color: newFolder.color || '#000000'
							}
						])
					}}
				/>
				{folders.map(folder => (
					<div key={folder.id} className="mb-6">
						<FolderItem
							folder={folder}
							onDelete={() => handleDeleteFolder(folder.id)}
							onEdit={handleEditFolder}
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
										onDelete={() =>
											handleDeleteNote(note.id)
										}
									/>
								))}
						</div>
					</div>
				))}
			</div>
			<div className="w-3/4 pl-4 overflow-y-auto">
				<div className="mt-6">
					<h3 className="text-lg font-semibold mb-2">
						Uncategorized Notes
					</h3>
					<div className="space-y-2">
						{notes
							.filter(note => !note.folderId)
							.map(note => (
								<NoteItem
									key={note.id}
									note={note}
									onUpdate={(title, content) =>
										handleUpdateNote(
											note.id,
											title,
											content,
											null
										)
									}
									onDelete={() => handleDeleteNote(note.id)}
								/>
							))}
					</div>
				</div>
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
		</div>
	)
}
