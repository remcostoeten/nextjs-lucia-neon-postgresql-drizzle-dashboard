'use client'

import { Modal } from '@/app/(landing)/design-system/tree/CrudModal'
import { NoteEditor } from '@/components/NoteEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getNotes, deleteNote } from '@/core/server/actions/notes'
import { createFolder, updateFolder, getFolders } from '@/lib/actions/folders'
import type { Note } from '@/lib/db/schema/notes'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, ChevronUp, Edit, File, Folder, Pin, Plus, Search, Star, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { toast } from 'sonner'

type Folder = {
    id: string
    name: string
    color: string
    description: string
    parentId: string | null
    children: Folder[]
}

interface FolderItemProps {
    item: Folder
    level: number
    onUpdate: () => void
    onDelete: () => void
    onMove: (draggedId: string, targetId: string) => void
    searchTerm: string
}

const FolderItem: React.FC<FolderItemProps> = ({ item, level = 0, onUpdate, onDelete, onMove, searchTerm }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
    const [newItemName, setNewItemName] = useState('')
    const [newItemColor, setNewItemColor] = useState('#ffffff')
    const [newItemDescription, setNewItemDescription] = useState('')
    const [notes, setNotes] = useState<Note[]>([])
    const [isNoteEditorOpen, setIsNoteEditorOpen] = useState(false)
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    const [{ isDragging }, drag] = useDrag({
        type: 'FOLDER_ITEM',
        item: { id: item.id, type: 'folder' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const [, drop] = useDrop({
        accept: 'FOLDER_ITEM',
        drop: (draggedItem: { id: string; type: string }) => {
            if (draggedItem.id !== item.id) {
                onMove(draggedItem.id, item.id)
            }
        },
    })

    useEffect(() => {
        if (isOpen) {
            fetchNotes()
        }
    }, [isOpen])

    const fetchNotes = async () => {
        const result = await getNotes(item.id)
        if ('error' in result) {
            toast.error(result.error)
        } else {
            setNotes(result.notes)
        }
    }

    const handleToggle = () => setIsOpen(!isOpen)

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', newItemName)
        formData.append('color', newItemColor)
        if (newItemDescription) formData.append('description', newItemDescription)
        formData.append('parentId', item.id)

        const result = await createFolder(formData)
        if ('error' in result) {
            toast.error(`Failed to create folder: ${result.error}`)
        } else {
            toast.success('Folder created successfully!')
            setIsModalOpen(false)
            onUpdate()
        }
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', newItemName)
        formData.append('color', newItemColor)
        if (newItemDescription) formData.append('description', newItemDescription)
        if (item.parentId) formData.append('parentId', item.parentId)

        const result = await updateFolder(item.id, formData)
        if ('error' in result) {
            toast.error(`Failed to update folder: ${result.error}`)
        } else {
            toast.success('Folder updated successfully!')
            setIsModalOpen(false)
            onUpdate()
        }
    }

    const handleDelete = async () => {
        const result = await deleteFolder(item.id)
        if ('error' in result) {
            toast.error(result.error)
        } else {
            toast.success('Folder deleted successfully!')
            onDelete()
        }
    }

    const handleDeleteNote = async (noteId: string) => {
        const result = await deleteNote(noteId)
        if ('error' in result) {
            toast.error(result.error)
        } else {
            toast.success('Note deleted successfully!')
            fetchNotes()
        }
    }

    const openAddModal = () => {
        setModalMode('add')
        setNewItemName('')
        setNewItemColor('#ffffff')
        setNewItemDescription('')
        setIsModalOpen(true)
    }

    const openEditModal = () => {
        setModalMode('edit')
        setNewItemName(item.name)
        setNewItemColor(item.color)
        setNewItemDescription(item.description || '')
        setIsModalOpen(true)
    }

    const openNoteEditor = (note: Note | null = null) => {
        setSelectedNote(note)
        setIsNoteEditorOpen(true)
    }

    const isMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase())

    if (!isMatch && !isOpen) return null

    return (
        <div ref={(node) => drag(drop(node))} className={`ml-4 ${isDragging ? 'opacity-50' : ''}`}>
            <div className="flex items-center space-x-2 py-2">
                <button onClick={handleToggle} className="text-gray-400 hover:text-gray-200">
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <Folder size={16} color={item.color} />
                <span className="text-gray-200">{item.name}</span>
                <div className="flex space-x-1">
                    <Button onClick={openEditModal} size="sm" variant="ghost">
                        <Edit size={14} />
                    </Button>
                    <Button onClick={handleDelete} size="sm" variant="ghost">
                        <Trash size={14} />
                    </Button>
                    <Button onClick={openAddModal} size="sm" variant="ghost">
                        <Plus size={14} />
                    </Button>
                    <Button onClick={() => openNoteEditor()} size="sm" variant="ghost">
                        <File size={14} />
                    </Button>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {item.children && item.children.map((child) => (
                            <FolderItem
                                key={child.id}
                                item={child}
                                level={level + 1}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                                onMove={onMove}
                                searchTerm={searchTerm}
                            />
                        ))}
                        <div className="ml-6 mt-2">
                            <Button onClick={() => openNoteEditor()} size="sm" variant="outline">
                                <Plus size={14} className="mr-2" />
                                Create Note
                            </Button>
                        </div>
                        {notes.length > 0 && (
                            <div className="ml-6 mt-2 space-y-1">
                                <h4 className="text-sm font-semibold text-gray-300">Notes:</h4>
                                {notes.map((note) => (
                                    <div key={note.id} className="flex items-center space-x-2 py-1">
                                        <File size={14} />
                                        <span className="text-gray-300">{note.title}</span>
                                        {note.isFavorite && <Star size={14} className="text-yellow-500" />}
                                        {note.isPinned && <Pin size={14} className="text-blue-500" />}
                                        <Button onClick={() => openNoteEditor(note)} size="sm" variant="ghost">
                                            <Edit size={12} />
                                        </Button>
                                        <Button onClick={() => handleDeleteNote(note.id)} size="sm" variant="ghost">
                                            <Trash size={12} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === 'add' ? 'Add New Folder' : 'Edit Folder'}
            >
                <form onSubmit={modalMode === 'add' ? handleAdd : handleEdit} className="space-y-4">
                    <Input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="Folder name"
                        className="bg-gray-800 text-gray-200"
                    />
                    <div className="flex items-center space-x-2">
                        <label htmlFor="folderColor" className="text-gray-200">Color:</label>
                        <Input
                            id="folderColor"
                            type="color"
                            value={newItemColor}
                            onChange={(e) => setNewItemColor(e.target.value)}
                            className="bg-gray-800 w-12 h-8"
                        />
                    </div>
                    <Textarea
                        value={newItemDescription}
                        onChange={(e) => setNewItemDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="bg-gray-800 text-gray-200"
                    />
                    <Button type="submit" className="w-full">
                        {modalMode === 'add' ? 'Add Folder' : 'Update Folder'}
                    </Button>
                </form>
            </Modal>
            <Modal
                isOpen={isNoteEditorOpen}
                onClose={() => setIsNoteEditorOpen(false)}
                title={selectedNote ? 'Edit Note' : 'Add New Note'}
            >
                <NoteEditor
                    note={selectedNote}
                    folderId={item.id}
                    onSave={() => {
                        setIsNoteEditorOpen(false)
                        fetchNotes()
                    }}
                    onCancel={() => setIsNoteEditorOpen(false)}
                />
            </Modal>
        </div>
    )
}

const FolderStructure: React.FC = () => {
    const [folderStructure, setFolderStructure] = useState<Folder[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [expandAll, setExpandAll] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetchFolders()
    }, [])

    const fetchFolders = async () => {
        const result = await getFolders()
        if ('error' in result) {
            toast.error(result.error)
        } else {
            setFolderStructure(result.folders)
        }
    }

    const handleMove = async (draggedId: string, targetId: string) => {
        const result = await moveFolder(draggedId, targetId)
        if ('error' in result) {
            toast.error(result.error)
        } else {
            toast.success('Folder moved successfully!')
            fetchFolders()
        }
    }

    const toggleExpandAll = () => {
        setExpandAll(!expandAll)
        // Implement logic to expand/collapse all folders
        // This would involve updating the state of all FolderItem components
    }

    const handleAddTopLevel = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const result = await createFolder(formData)
        if ('error' in result) {
            toast.error(`Failed to create top-level folder: ${result.error}`)
        } else {
            toast.success('Top-level folder created successfully!')
            setIsModalOpen(false)
            fetchFolders()
        }
    }

    const buildFolderTree = (folders: Folder[], parentId: string | null = null): Folder[] => {
        return folders
            .filter(folder => folder.parentId === parentId)
            .map(folder => ({
                ...folder,
                children: buildFolderTree(folders, folder.id)
            }))
    }

    const folderTree = buildFolderTree(folderStructure)

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-6 bg-gray-950 min-h-screen text-sm">
                <h1 className="text-3xl font-bold mb-6 text-gray-100">Folder Structure</h1>
                <div className="mb-6 flex items-center space-x-4">
                    <div className="relative flex-grow">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search folders..."
                            className="bg-gray-900 text-gray-200 pl-10 w-full"
                        />
                    </div>
                    <Button onClick={toggleExpandAll} variant="outline">
                        {expandAll ? <ChevronUp size={16} className="mr-2" /> : <ChevronDown size={16} className="mr-2" />}
                        {expandAll ? 'Collapse All' : 'Expand All'}
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus size={16} className="mr-2" />
                        Add Top-Level Folder
                    </Button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                    {folderTree.map((folder) => (
                        <FolderItem
                            key={folder.id}
                            item={folder}
                            level={0}
                            onUpdate={fetchFolders}
                            onDelete={fetchFolders}
                            onMove={handleMove}
                            searchTerm={searchTerm}
                        />
                    ))}
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Add Top-Level Folder"
                >
                    <form onSubmit={handleAddTopLevel} className="space-y-4">
                        <Input
                            name="name"
                            placeholder="Folder name"
                            className="bg-gray-800 text-gray-200"
                            required
                        />
                        <div className="flex items-center space-x-2">
                            <label htmlFor="topLevelColor" className="text-gray-200">Color:</label>
                            <Input
                                id="topLevelColor"
                                name="color"
                                type="color"
                                defaultValue="#ffffff"
                                className="bg-gray-800 w-12 h-8"
                                required
                            />
                        </div>
                        <Textarea
                            name="description"
                            placeholder="Description (optional)"
                            className="bg-gray-800 text-gray-200"
                        />
                        <Button type="submit" className="w-full">
                            Add Top-Level Folder
                        </Button>
                    </form>
                </Modal>
            </div>
        </DndProvider>
    )
}

export default FolderStructure
