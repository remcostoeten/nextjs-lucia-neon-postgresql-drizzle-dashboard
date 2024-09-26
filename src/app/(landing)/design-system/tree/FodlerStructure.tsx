'use client'

import RichTextEditor from '@/components/rich-text-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createFolder, deleteFolder, getFolders } from '@/lib/actions/folders'
import { createNote, deleteNote, getNotes } from '@/lib/actions/notes'
import { Folder, Note } from '@/lib/db/schema'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const FolderItem: React.FC<{ folder: Folder; onDelete: () => void }> = ({ folder, onDelete }) => {
    const [notes, setNotes] = useState<Note[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [newNoteTitle, setNewNoteTitle] = useState('')
    const [newNoteContent, setNewNoteContent] = useState('')

    useEffect(() => {
        if (isOpen) {
            fetchNotes()
        }
    }, [isOpen, folder.id])

    const fetchNotes = async () => {
        const result = await getNotes(folder.id)
        if ('error' in result) {
            toast.error(result.error)
        } else {
            setNotes(result.notes)
        }
    }

    const handleCreateNote = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', newNoteTitle)
        formData.append('content', newNoteContent)
        formData.append('folderId', folder.id)

        const result = await createNote(formData)
        if ('error' in result) {
            toast.error(result.error)
        } else {
            toast.success('Note created successfully')
            setNewNoteTitle('')
            setNewNoteContent('')
            fetchNotes()
        }
    }

    const handleDeleteNote = async (noteId: string) => {
        const result = await deleteNote(noteId)
        if ('error' in result) {
            toast.error(result.error)
        } else {
            toast.success('Note deleted successfully')
            fetchNotes()
        }
    }

    return (
        <div className="mb-4 p-4 bg-card border rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{folder.name}</h3>
                <div>
                    <Button onClick={() => setIsOpen(!isOpen)} variant="outline" size="sm">
                        {isOpen ? 'Close' : 'Open'}
                    </Button>
                    <Button onClick={onDelete} variant="destructive" size="sm" className="ml-2">
                        Delete
                    </Button>
                </div>
            </div>
            {isOpen && (
                <div>
                    <h4 className="font-medium mb-2">Notes:</h4>
                    {notes.map((note) => (
                        <div key={note.id} className="mb-2 p-2 bg-white rounded">
                            <h5 className="font-medium">{note.title}</h5>
                            <div dangerouslySetInnerHTML={{ __html: note.content || '' }} />
                            <Button onClick={() => handleDeleteNote(note.id)} variant="destructive" size="sm" className="mt-2">
                                Delete Note
                            </Button>
                        </div>
                    ))}
                    <form onSubmit={handleCreateNote} className="mt-4">
                        <Input
                            type="text"
                            value={newNoteTitle}
                            onChange={(e) => setNewNoteTitle(e.target.value)}
                            placeholder="Note title"
                            className="mb-2"
                        />
                        <RichTextEditor content={newNoteContent} onChange={setNewNoteContent} />
                        <Button type="submit" className="mt-2">Add Note</Button>
                    </form>
                </div>
            )}
        </div>
    )
}

const FolderStructure: React.FC = () => {
    const [folders, setFolders] = useState<Folder[]>([])
    const [newFolderName, setNewFolderName] = useState('')

    useEffect(() => {
        fetchFolders()
    }, [])

    const fetchFolders = async () => {
        const result = await getFolders()
        if ('error' in result) {
            toast.error(result.error)
        } else {
            setFolders(result.folders)
        }
    }

    const handleCreateFolder = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', newFolderName)

        const result = await createFolder(formData)
        if ('error' in result) {
            toast.error(result.error)
        } else {
            toast.success('Folder created successfully')
            setNewFolderName('')
            fetchFolders()
        }
    }

    const handleDeleteFolder = async (folderId: string) => {
        const result = await deleteFolder(folderId)
        if ('error' in result) {
            toast.error(result.error)
        } else {
            toast.success('Folder deleted successfully')
            fetchFolders()
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Folder Structure</h1>
            <form onSubmit={handleCreateFolder} className="mb-4">
                <Input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="New folder name"
                    className="mr-2"
                />
                <Button type="submit">Create Folder</Button>
            </form>
            {folders.map((folder) => (
                <FolderItem key={folder.id} folder={folder} onDelete={() => handleDeleteFolder(folder.id)} />
            ))}
        </div>
    )
}

export default FolderStructure
