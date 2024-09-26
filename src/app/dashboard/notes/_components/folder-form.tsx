'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createFolder, deleteFolder, getFolders, moveFolder, updateFolder } from '@/lib/actions/folders'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, ChevronUp, Edit, Folder, Plus, Search, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { toast } from 'sonner'

const FolderItem = ({ item, level = 0, onUpdate, onDelete, onMove, searchTerm }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [newItemColor, setNewItemColor] = useState('#ffffff')
  const [newItemDescription, setNewItemDescription] = useState('')

  const [{ isDragging }, drag] = useDrag({
    type: 'FOLDER_ITEM',
    item: { id: item.id, type: 'folder' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'FOLDER_ITEM',
    drop: (draggedItem: { id: string }) => {
      if (draggedItem.id !== item.id) {
        onMove(draggedItem.id, item.id)
      }
    },
  })

  const handleToggle = () => setIsOpen(!isOpen)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', newItemName)
    formData.append('color', newItemColor)
    formData.append('description', newItemDescription)
    formData.append('parentId', item.id)

    const result = await createFolder(formData)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Folder created successfully!')
      setIsAdding(false)
      setNewItemName('')
      setNewItemColor('#ffffff')
      setNewItemDescription('')
      onUpdate()
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', newItemName)
    formData.append('color', newItemColor)
    formData.append('description', newItemDescription)
    formData.append('parentId', item.parentId || '')

    const result = await updateFolder(item.id, formData)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Folder updated successfully!')
      setIsEditing(false)
      onUpdate()
    }
  }

  const handleDelete = async () => {
    const result = await deleteFolder(item.id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Folder deleted successfully!')
      onDelete()
    }
  }

  const isMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase())

  if (!isMatch && !isOpen) return null

  return (
    <div ref={(node) => drag(drop(node))} className={`ml-4 ${isDragging ? 'opacity-50' : ''}`}>
      <div className="flex items-center space-x-2">
        {item.children && item.children.length > 0 && (
          <button onClick={handleToggle} className="text-gray-400 hover:text-gray-200">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
        <Folder size={16} color={item.color} />
        <span className="text-gray-200">{item.name}</span>
        <Button onClick={() => setIsEditing(true)} size="sm">
          <Edit size={16} />
        </Button>
        <Button onClick={handleDelete} size="sm" variant="destructive">
          <Trash size={16} />
        </Button>
        <Button onClick={() => setIsAdding(true)} size="sm">
          <Plus size={16} />
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.children.map((child) => (
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
          </motion.div>
        )}
      </AnimatePresence>
      {isAdding && (
        <form onSubmit={handleAdd} className="mt-2 space-y-2">
          <Input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="New folder name"
            className="bg-gray-800 text-gray-200"
          />
          <Input
            type="color"
            value={newItemColor}
            onChange={(e) => setNewItemColor(e.target.value)}
            className="bg-gray-800"
          />
          <Textarea
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            placeholder="Description (optional)"
            className="bg-gray-800 text-gray-200"
          />
          <Button type="submit">Add Folder</Button>
        </form>
      )}
      {isEditing && (
        <form onSubmit={handleEdit} className="mt-2 space-y-2">
          <Input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Edit folder name"
            className="bg-gray-800 text-gray-200"
          />
          <Input
            type="color"
            value={newItemColor}
            onChange={(e) => setNewItemColor(e.target.value)}
            className="bg-gray-800"
          />
          <Textarea
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            placeholder="Description (optional)"
            className="bg-gray-800 text-gray-200"
          />
          <Button type="submit">Update Folder</Button>
        </form>
      )}
    </div>
  )
}

export default function FolderStructure() {
  const [folderStructure, setFolderStructure] = useState<Folder[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [expandAll, setExpandAll] = useState(false)
  const [isAddingTopLevel, setIsAddingTopLevel] = useState(false)
  const [newTopLevelName, setNewTopLevelName] = useState('')
  const [newTopLevelColor, setNewTopLevelColor] = useState('#ffffff')
  const [newTopLevelDescription, setNewTopLevelDescription] = useState('')

  useEffect(() => {
    fetchFolders()
  }, [])

  const fetchFolders = async () => {
    const result = await getFolders()
    if (result.error) {
      toast.error(result.error)
    } else {
      setFolderStructure(result.folders)
    }
  }

  const handleMove = async (draggedId: string, targetId: string) => {
    const result = await moveFolder(draggedId, targetId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Folder moved successfully!')
      fetchFolders()
    }
  }

  const toggleExpandAll = () => {
    setExpandAll(!expandAll)
    // Implement logic to expand/collapse all folders
  }

  const handleAddTopLevel = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', newTopLevelName)
    formData.append('color', newTopLevelColor)
    formData.append('description', newTopLevelDescription)

    const result = await createFolder(formData)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Top-level folder created successfully!')
      setIsAddingTopLevel(false)
      setNewTopLevelName('')
      setNewTopLevelColor('#ffffff')
      setNewTopLevelDescription('')
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
      <div className="p-4 bg-gray-900 min-h-screen text-sm">
        <h1 className="text-2xl font-bold mb-4 text-gray-100">Folder Structure</h1>
        <div className="mb-4 flex items-center space-x-2">
          <Search size={16} className="text-gray-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="bg-gray-800 text-gray-200"
          />
          <Button onClick={toggleExpandAll}>
            {expandAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {expandAll ? 'Collapse All' : 'Expand All'}
          </Button>
          <Button onClick={() => setIsAddingTopLevel(true)}>
            <Plus size={16} />
            Add Top-Level Folder
          </Button>
        </div>
        {isAddingTopLevel && (
          <form onSubmit={handleAddTopLevel} className="mb-4 space-y-2">
            <Input
              type="text"
              value={newTopLevelName}
              onChange={(e) => setNewTopLevelName(e.target.value)}
              placeholder="New top-level folder name"
              className="bg-gray-800 text-gray-200"
            />
            <Input
              type="color"
              value={newTopLevelColor}
              onChange={(e) => setNewTopLevelColor(e.target.value)}
              className="bg-gray-800"
            />
            <Textarea
              value={newTopLevelDescription}
              onChange={(e) => setNewTopLevelDescription(e.target.value)}
              placeholder="Description (optional)"
              className="bg-gray-800 text-gray-200"
            />
            <Button type="submit">Add Top-Level Folder</Button>
          </form>
        )}
        {folderTree.map((folder) => (
          <FolderItem
            key={folder.id}
            item={folder}
            onUpdate={fetchFolders}
            onDelete={fetchFolders}
            onMove={handleMove}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    </DndProvider>
  )
}
