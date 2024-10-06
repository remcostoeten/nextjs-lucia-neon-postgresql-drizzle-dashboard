'use client'

import { Button, Card, CardContent, CardHeader, CardTitle } from 'ui'
import NewNoteModal from '@/components/elements/crud/add-note-modal'
import NoticeBox from '@/components/elements/notice-box'
import { createNote, deleteNote, getNotes, updateNote } from '@/lib/api/@@notes'
import { useCallback, useEffect, useState } from 'react'
import { useNotesStore } from 'stores'
import NoteItem from './note-item'
export default function NotesMainView() {
	const [notes, setNotes] = useState([])
	const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false)
	const { selectedFolderId } = useNotesStore()

	const fetchNotes = useCallback(async () => {
		const fetchedNotes = await getNotes(selectedFolderId)
		setNotes(fetchedNotes || [])
	}, [selectedFolderId])

	useEffect(() => {
		fetchNotes()
	}, [fetchNotes])

	const handleCreateNote = async (title, content) => {
		const formData = new FormData()
		formData.append('title', title)
		formData.append('content', content)
		if (selectedFolderId) {
			formData.append('folderId', selectedFolderId)
		}
		await createNote(formData)
		setIsNewNoteDialogOpen(false)
		fetchNotes()
	}

	const handleUpdateNote = async (noteId, title, content) => {
		const formData = new FormData()
		formData.append('id', noteId)
		formData.append('title', title)
		formData.append('content', content)
		if (selectedFolderId) {
			formData.append('folderId', selectedFolderId)
		}
		await updateNote(formData)
		fetchNotes()
	}

	const handleDeleteNote = async noteId => {
		const formData = new FormData()
		formData.append('id', noteId)
		await deleteNote(formData)
		fetchNotes()
	}

	return (
		<>
			<Card className="w-full">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-2xl font-bold">
						{selectedFolderId ? 'Folder Notes' : 'All Notes'}
					</CardTitle>
					<Button onClick={() => setIsNewNoteDialogOpen(true)}>
						New Note
					</Button>
				</CardHeader>
				<CardContent>
					{notes.length > 0 ? (
						notes.map(note => (
							<NoteItem
								key={note.id}
								note={note}
								onUpdate={(title, content) =>
									handleUpdateNote(note.id, title, content)
								}
								onDelete={() => handleDeleteNote(note.id)}
							/>
						))
					) : (
						<div className="flex justify-center items-center h-full mx-auto w-64">
							<NoticeBox title="No notes found" />
						</div>
					)}
				</CardContent>
			</Card>
			<NewNoteModal
				isOpen={isNewNoteDialogOpen}
				onClose={() => setIsNewNoteDialogOpen(false)}
				onCreateNote={handleCreateNote}
			/>
		</>
	)
}
