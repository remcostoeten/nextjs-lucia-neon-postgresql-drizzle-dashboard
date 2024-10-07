'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { createFolder, deleteFolder, getFolders, moveFolder, updateFolder } from '@/lib/actions/folders'
import { FolderType } from '@/types/types.folder'
import { AnimatePresence, motion, Reorder } from 'framer-motion'
import { ChevronDown, ChevronRight, Folder, FolderPlus, Pencil, Trash } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface TreeViewElement extends FolderType {
	children?: TreeViewElement[]
}

const FileTree: React.FC = () => {
	const [elements, setElements] = useState<TreeViewElement[]>([])
	const [expandedItems, setExpandedItems] = useState<string[]>([])
	const [selectedItem, setSelectedItem] = useState<string | null>(null)
	const [editingFolder, setEditingFolder] = useState<TreeViewElement | null>(null)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
	const [newFolderName, setNewFolderName] = useState('')
	const [newFolderColor, setNewFolderColor] = useState('#000000')

	useEffect(() => {
		const fetchFolders = async () => {
			try {
				const { folders } = await getFolders()
				setElements(buildTree(folders))
			} catch (error) {
				toast.error('Failed to fetch folders')
			}
		}
		fetchFolders()
	}, [])

	const buildTree = (folders: FolderType[]): TreeViewElement[] => {
		const map: { [key: string]: TreeViewElement } = {}
		const tree: TreeViewElement[] = []

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

	const handleToggle = useCallback((id: string) => {
		setExpandedItems(prev =>
			prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
		)
	}, [])

	const handleSelect = useCallback((id: string) => {
		setSelectedItem(prev => prev === id ? null : id)
	}, [])

	const handleUpdateFolder = async () => {
		if (editingFolder) {
			try {
				await updateFolder(editingFolder.id, {
					name: editingFolder.name,
					description: editingFolder.description,
					color: editingFolder.color
				})
				setElements(prev => updateElementInTree(prev, editingFolder))
				setIsEditDialogOpen(false)
				toast.success('Folder updated successfully')
			} catch (error) {
				toast.error('Failed to update folder')
			}
		}
	}

	const handleDeleteFolder = async () => {
		if (editingFolder) {
			try {
				await deleteFolder(editingFolder.id)
				setElements(prev => removeElementFromTree(prev, editingFolder.id))
				setIsDeleteDialogOpen(false)
				toast.success('Folder deleted successfully')
			} catch (error) {
				toast.error('Failed to delete folder')
			}
		}
	}

	const handleCreateFolder = async () => {
		try {
			const { folder } = await createFolder(newFolderName, null, selectedItem, newFolderColor)
			setElements(prev => addElementToTree(prev, folder, selectedItem))
			setIsNewFolderDialogOpen(false)
			setNewFolderName('')
			setNewFolderColor('#000000')
			toast.success('Folder created successfully')
		} catch (error) {
			toast.error('Failed to create folder')
		}
	}

	const handleMoveFolder = async (draggedId: string, targetId: string | null) => {
		try {
			await moveFolder(draggedId, targetId)
			const { folders } = await getFolders()
			setElements(buildTree(folders))
			toast.success('Folder moved successfully')
		} catch (error) {
			toast.error('Failed to move folder')
		}
	}

	const updateElementInTree = (elements: TreeViewElement[], updatedElement: TreeViewElement): TreeViewElement[] => {
		return elements.map(element => {
			if (element.id === updatedElement.id) {
				return { ...element, ...updatedElement }
			}
			if (element.children) {
				return { ...element, children: updateElementInTree(element.children, updatedElement) }
			}
			return element
		})
	}

	const removeElementFromTree = (elements: TreeViewElement[], id: string): TreeViewElement[] => {
		return elements.filter(element => {
			if (element.id === id) {
				return false
			}
			if (element.children) {
				element.children = removeElementFromTree(element.children, id)
			}
			return true
		})
	}

	const addElementToTree = (elements: TreeViewElement[], newElement: FolderType, parentId: string | null): TreeViewElement[] => {
		if (!parentId) {
			return [...elements, { ...newElement, children: [] }]
		}
		return elements.map(element => {
			if (element.id === parentId) {
				return { ...element, children: [...(element.children || []), { ...newElement, children: [] }] }
			}
			if (element.children) {
				return { ...element, children: addElementToTree(element.children, newElement, parentId) }
			}
			return element
		})
	}

	const renderTreeItems = (items: TreeViewElement[]): React.ReactNode => (
		<Reorder.Group axis="y" onReorder={(newOrder) => {
			setElements(newOrder)
			newOrder.forEach((item, index) => {
				if (index > 0) {
					handleMoveFolder(item.id, newOrder[index - 1].id)
				} else {
					handleMoveFolder(item.id, null)
				}
			})
		}} values={items}>
			{items.map(item => (
				<Reorder.Item key={item.id} value={item}>
					<div className="flex items-center py-1 px-2 hover:bg-section-lighter text-subtitle hover:text-title cursor-pointer transition-all duration-300">
						<div
							className="flex items-center flex-grow"
							onClick={() => handleSelect(item.id)}
						>
							{item.children && item.children.length > 0 && (
								<Button
									variant="ghost"
									size="sm"
									className="p-0 h-6 w-6"
									onClick={(e) => {
										e.stopPropagation()
										handleToggle(item.id)
									}}
								>
									{expandedItems.includes(item.id) ? (
										<ChevronDown className="h-4 w-4" />
									) : (
										<ChevronRight className="h-4 w-4" />
									)}
								</Button>
							)}
							<Folder className="h-4 w-4 mr-2" style={{ color: item.color }} />
							<span className={selectedItem === item.id ? 'font-bold' : ''}>{item.name}</span>
						</div>
						<div className="flex space-x-1">
							<Button
								variant="ghost"
								size="sm"
								className="p-0 h-6 w-6"
								onClick={() => {
									setEditingFolder(item)
									setIsEditDialogOpen(true)
								}}
							>
								<Pencil className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="p-0 h-6 w-6"
								onClick={() => {
									setEditingFolder(item)
									setIsDeleteDialogOpen(true)
								}}
							>
								<Trash className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<AnimatePresence initial={false}>
						{expandedItems.includes(item.id) && item.children && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.2 }}
								className="ml-4"
							>
								{renderTreeItems(item.children)}
							</motion.div>
						)}
					</AnimatePresence>
				</Reorder.Item>
			))}
		</Reorder.Group>
	)

	return (
		<div className="w-full max-w-md mx-auto p-4">
			<Button
				onClick={() => setIsNewFolderDialogOpen(true)}
				className="mb-4"
			>
				<FolderPlus className="mr-2 h-4 w-4" />
				New Folder
			</Button>
			<div className="border rounded-md p-2">
				{renderTreeItems(elements)}
			</div>

			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Folder</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<label htmlFor="folderName" className="block text-sm font-medium">
								Folder Name
							</label>
							<Input
								id="folderName"
								value={editingFolder?.name || ''}
								onChange={e => setEditingFolder(prev => prev ? { ...prev, name: e.target.value } : null)}
								className="mt-1"
							/>
						</div>
						<div>
							<label htmlFor="folderColor" className="block text-sm font-medium">
								Folder Color
							</label>
							<Input
								id="folderColor"
								type="color"
								value={editingFolder?.color || '#000000'}
								onChange={e => setEditingFolder(prev => prev ? { ...prev, color: e.target.value } : null)}
								className="mt-1"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleUpdateFolder}>
							Save
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Folder</DialogTitle>
					</DialogHeader>
					<p>Are you sure you want to delete this folder? This action cannot be undone.</p>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleDeleteFolder}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>New Folder</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<label htmlFor="newFolderName" className="block text-sm font-medium">
								Folder Name
							</label>
							<Input
								id="newFolderName"
								value={newFolderName}
								onChange={e => setNewFolderName(e.target.value)}
								className="mt-1"
							/>
						</div>
						<div>
							<label htmlFor="newFolderColor" className="block text-sm font-medium">
								Folder Color
							</label>
							<Input
								id="newFolderColor"
								type="color"
								value={newFolderColor}
								onChange={e => setNewFolderColor(e.target.value)}
								className="mt-1"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleCreateFolder}>
							Create
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default FileTree
