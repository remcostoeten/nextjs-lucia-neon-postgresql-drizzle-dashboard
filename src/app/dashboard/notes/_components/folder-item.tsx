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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { createFolder, deleteFolder, getFolders } from '@/lib/api/folders'
import { createNote, deleteNote, getNotes, updateNote } from '@/lib/api/notes'
import { FolderOpen, MoreVertical, Pencil, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Folder = {
	id: string
	name: string
	color: string
}

type Note = {
	id: string
	title: string
	content: string
	folderId: string | null
}

export default function NotesAndFolders() {
	const [folders, setFolders] = useState<Folder[]>([])
	const [notes, setNotes] = useState<Note[]>([])
	const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
	const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false)
	const [newFolderName, setNewFolderName] = useState('')
	const [newFolderColor, setNewFolderColor] = useState('#000000')
	const [newNoteTitle, setNewNoteTitle] = useState('')
	const [newNoteContent, setNewNoteContent] = useState('')
	const [activeFolder, setActiveFolder] = useState<string | null>(null)

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
		try {
			const newFolder = await createFolder(formData)
			setFolders(prevFolders => [...prevFolders, newFolder])
			setIsNewFolderDialogOpen(false)
			setNewFolderName('')
			setNewFolderColor('#000000')
			toast.success('Folder created successfully')
		} catch (error) {
			toast.error('Failed to create folder')
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

	const handleDeleteFolder = async (folderId: string) => {
		const formData = new FormData()
		formData.append('id', folderId)
		try {
			await deleteFolder(formData)
			setFolders(prevFolders =>
				prevFolders.filter(folder => folder.id !== folderId)
			)
			if (activeFolder === folderId) {
				setActiveFolder(null)
			}
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

	const handleFolderClick = (folderId: string) => {
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
					<div
						key={folder.id}
						className="flex items-center justify-between mb-2"
					>
						<Button
							variant="ghost"
							className={`w-full justify-start ${activeFolder === folder.id ? 'bg-primary text-primary-foreground' : ''}`}
							onClick={() => handleFolderClick(folder.id)}
						>
							<FolderOpen
								size={16}
								className="mr-2"
								style={{ color: folder.color }}
							/>
							<span>{folder.name}</span>
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<MoreVertical className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem
									onClick={() => {
										/* Implement edit folder */
									}}
								>
									<Pencil className="mr-2 h-4 w-4" />
									<span>Edit</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										handleDeleteFolder(folder.id)
									}
								>
									<Trash className="mr-2 h-4 w-4" />
									<span>Delete</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
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
							<div
								key={note.id}
								className="mb-4 p-4 border rounded"
							>
								<h3 className="text-lg font-semibold mb-2">
									{note.title}
								</h3>
								<p className="mb-2">{note.content}</p>
								<Button
									onClick={() => handleDeleteNote(note.id)}
									variant="destructive"
								>
									Delete Note
								</Button>
							</div>
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
