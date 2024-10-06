// File: app/components/FileTree.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import {
	createFolder,
	deleteFolder,
	getFolders,
	moveFolder,
	updateFolder
} from '@/lib/actions/folders'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ChevronDown,
	ChevronRight,
	Edit2,
	Folder,
	FolderPlus,
	Trash2
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type TreeItemType = {
	id: string
	name: string
	color: string
	path: string
	children?: TreeItemType[]
}

type TreeItemProps = {
	item: TreeItemType
	onSelect: (id: string, path: string[]) => void
	isSelected: boolean
	path: string[]
	onCreateFolder: (
		parentId: string | null,
		name: string,
		color: string
	) => void
	onUpdateFolder: (id: string, name: string, color: string) => void
	onDeleteFolder: (id: string) => void
	onMoveFolder: (draggedId: string, targetId: string) => void
	level: number
}

const TreeItem: React.FC<TreeItemProps> = ({
	item,
	onSelect,
	isSelected,
	path,
	onCreateFolder,
	onUpdateFolder,
	onDeleteFolder,
	onMoveFolder,
	level
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [newName, setNewName] = useState(item.name)
	const [newColor, setNewColor] = useState(item.color)
	const [isAddingSubfolder, setIsAddingSubfolder] = useState(false)
	const [newSubfolderName, setNewSubfolderName] = useState('')
	const [newSubfolderColor, setNewSubfolderColor] = useState('#000000')

	const handleToggle = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsOpen(!isOpen)
	}

	const handleSelect = () => onSelect(item.id, [...path, item.name])

	const handleEdit = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsEditing(true)
	}

	const handleSave = () => {
		onUpdateFolder(item.id, newName, newColor)
		setIsEditing(false)
	}

	const handleDelete = () => {
		onDeleteFolder(item.id)
	}

	const handleAddSubfolder = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsAddingSubfolder(true)
	}

	const handleCreateSubfolder = () => {
		onCreateFolder(item.id, newSubfolderName, newSubfolderColor)
		setIsAddingSubfolder(false)
		setNewSubfolderName('')
		setNewSubfolderColor('#000000')
		setIsOpen(true)
	}

	const handleDragStart = (e: React.DragEvent) => {
		e.dataTransfer.setData('text/plain', item.id)
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		const draggedId = e.dataTransfer.getData('text')
		onMoveFolder(draggedId, item.id)
	}

	return (
		<div className="relative">
			<div
				className={`tree-item ${
					isSelected ? 'bg-section-lighter border' : ''
				} p-2 rounded-md hover:bg-accent/50 transition-colors flex items-center space-x-2`}
				style={{ paddingLeft: `${level * 20 + 8}px` }}
				onClick={handleSelect}
				draggable
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				{level > 0 && (
					<div
						className="absolute left-0 top-0 bottom-0 w-px bg-border"
						style={{ left: `${(level - 1) * 20 + 12}px` }}
					/>
				)}
				<button
					onClick={handleToggle}
					className="text-muted-foreground"
				>
					{item.children && item.children.length > 0 ? (
						isOpen ? (
							<ChevronDown size={16} />
						) : (
							<ChevronRight size={16} />
						)
					) : (
						<span className="w-4" />
					)}
				</button>
				<Folder size={16} color={item.color} />
				{isEditing ? (
					<div
						className="flex items-center space-x-2"
						onClick={e => e.stopPropagation()}
					>
						<Input
							value={newName}
							onChange={e => setNewName(e.target.value)}
							className="h-6 py-1 px-2 text-sm"
						/>
						<Input
							type="color"
							value={newColor}
							onChange={e => setNewColor(e.target.value)}
							className="w-6 h-6 p-0 border-none"
						/>
						<Button
							onClick={handleSave}
							size="sm"
							variant="outline"
						>
							Save
						</Button>
					</div>
				) : (
					<>
						<span className="flex-grow">{item.name}</span>
						<div className="flex items-center space-x-1">
							<Button
								onClick={handleAddSubfolder}
								size="icon"
								variant="ghost"
							>
								<FolderPlus size={14} />
							</Button>
							<Button
								onClick={handleEdit}
								size="icon"
								variant="ghost"
							>
								<Edit2 size={14} />
							</Button>
							<Button
								onClick={handleDelete}
								size="icon"
								variant="ghost"
							>
								<Trash2 size={14} />
							</Button>
						</div>
					</>
				)}
			</div>
			{isAddingSubfolder && (
				<div
					className="ml-6 mt-2 flex items-center space-x-2"
					style={{ paddingLeft: `${(level + 1) * 20 + 8}px` }}
				>
					<Input
						value={newSubfolderName}
						onChange={e => setNewSubfolderName(e.target.value)}
						placeholder="Subfolder name"
						className="h-6 py-1 px-2 text-sm"
					/>
					<Input
						type="color"
						value={newSubfolderColor}
						onChange={e => setNewSubfolderColor(e.target.value)}
						className="w-6 h-6 p-0 border-none"
					/>
					<Button
						onClick={handleCreateSubfolder}
						size="sm"
						variant="outline"
					>
						Create
					</Button>
				</div>
			)}
			<AnimatePresence>
				{isOpen && item.children && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
					>
						{item.children.map(child => (
							<TreeItem
								key={child.id}
								item={child}
								onSelect={onSelect}
								isSelected={isSelected}
								path={[...path, item.name]}
								onCreateFolder={onCreateFolder}
								onUpdateFolder={onUpdateFolder}
								on
								DeleteFolder={onDeleteFolder}
								onMoveFolder={onMoveFolder}
								level={level + 1}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default function FileTree() {
	const [data, setData] = useState<TreeItemType[]>([])
	const [selectedItem, setSelectedItem] = useState<string | null>(null)
	const [breadcrumb, setBreadcrumb] = useState<string[]>([])
	const [newFolderName, setNewFolderName] = useState('')
	const [newFolderColor, setNewFolderColor] = useState('#000000')
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchFolders()
	}, [])

	const fetchFolders = async () => {
		try {
			setIsLoading(true)
			const { folders } = await getFolders()
			const treeData = buildTree(folders)
			setData(treeData)
		} catch (error) {
			console.error('Error fetching folders:', error)
			toast.error('Failed to fetch folders')
		} finally {
			setIsLoading(false)
		}
	}

	const buildTree = (folders: any[]): TreeItemType[] => {
		const tree: TreeItemType[] = []
		const map: { [key: string]: TreeItemType } = {}

		folders.forEach(folder => {
			map[folder.id] = { ...folder, children: [] }
		})

		folders.forEach(folder => {
			if (folder.parentId) {
				const parent = map[folder.parentId]
				if (parent) {
					parent.children = parent.children || []
					parent.children.push(map[folder.id])
				}
			} else {
				tree.push(map[folder.id])
			}
		})

		return tree
	}

	const handleSelect = (id: string, path: string[]) => {
		setSelectedItem(id)
		setBreadcrumb(path)
	}

	const handleCreateFolder = async (
		parentId: string | null,
		name: string,
		color: string
	) => {
		try {
			if (name.trim() === '') {
				toast.error('Folder name cannot be empty')
				return
			}
			await createFolder(name, null, parentId, color)
			await fetchFolders()
			setNewFolderName('')
			setNewFolderColor('#000000')
			toast.success('Folder created')
		} catch (error) {
			console.error('Error creating folder:', error)
			toast.error('Failed to create folder')
		}
	}

	const handleUpdateFolder = async (
		id: string,
		name: string,
		color: string
	) => {
		try {
			await updateFolder(id, { name, color })
			await fetchFolders()
			toast.success('Folder updated')
		} catch (error) {
			console.error('Error updating folder:', error)
			toast.error('Failed to update folder')
		}
	}

	const handleDeleteFolder = async (id: string) => {
		try {
			await deleteFolder(id)
			await fetchFolders()
			toast.success('Folder deleted')
		} catch (error) {
			console.error('Error deleting folder:', error)
			toast.error('Failed to delete folder')
		}
	}

	const handleMoveFolder = async (draggedId: string, targetId: string) => {
		try {
			await moveFolder(draggedId, targetId)
			await fetchFolders()
			toast.success('Folder moved')
		} catch (error) {
			console.error('Error moving folder:', error)
			toast.error('Failed to move folder')
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>File Explorer</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<div className="text-sm text-muted-foreground">
						{breadcrumb.join(' > ')}
					</div>
				</div>
				<div className="flex items-center space-x-2 mb-4">
					<Input
						type="text"
						placeholder="New folder name"
						value={newFolderName}
						onChange={e => setNewFolderName(e.target.value)}
						className="flex-grow"
					/>
					<Input
						type="color"
						value={newFolderColor}
						onChange={e => setNewFolderColor(e.target.value)}
						className="w-10 h-10 p-0 border-none"
					/>
					<Button
						onClick={() =>
							handleCreateFolder(
								null,
								newFolderName,
								newFolderColor
							)
						}
						variant="outline"
					>
						<FolderPlus className="mr-2 h-4 w-4" />
						New
					</Button>
				</div>
				{isLoading ? (
					<div className="flex justify-center">
						<Spinner />
					</div>
				) : (
					<div className="tree-view space-y-2 max-h-[60vh] overflow-y-auto">
						{data.map(item => (
							<TreeItem
								key={item.id}
								item={item}
								onSelect={handleSelect}
								isSelected={selectedItem === item.id}
								path={[]}
								onCreateFolder={handleCreateFolder}
								onUpdateFolder={handleUpdateFolder}
								onDeleteFolder={handleDeleteFolder}
								onMoveFolder={handleMoveFolder}
								level={0}
							/>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	)
}
