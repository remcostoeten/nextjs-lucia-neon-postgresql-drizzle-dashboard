'use client'

import { Breadcrumb } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
	createFolder,
	deleteFolder,
	getFolders,
	moveFolder,
	updateFolder
} from '@/core/server/actions/folders'
import { FolderPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TreeItem } from './tree-item'

type TreeItemType = {
	id: string
	name: string
	description: string | null
	color: string
	userId: string
	createdAt: Date
	updatedAt: Date
	type: 'folder'
	children?: TreeItemType[]
}

export default function FileTree() {
	const [data, setData] = useState<TreeItemType[]>([])
	const [selectedItem, setSelectedItem] = useState<string | null>(null)
	const [breadcrumb, setBreadcrumb] = useState<string[]>([])
	const [newItemName, setNewItemName] = useState('')
	const [isEditing, setIsEditing] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchFolders = async () => {
			try {
				setIsLoading(true)
				const folders = await getFolders()
				setData(folders)
			} catch (error) {
				console.error('Error fetching folders:', error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchFolders()
	}, [])

	const handleSelect = (id: string, path: string[]) => {
		setSelectedItem(id)
		setBreadcrumb(path)
	}

	const handleCreateItem = async () => {
		if (!newItemName) return
		try {
			await createFolder(newItemName)
			const updatedFolders = await getFolders()
			setData(updatedFolders)
			setNewItemName('')
		} catch (error) {
			console.error('Error creating folder:', error)
		}
	}

	const handleUpdateItem = async (id: string, newName: string) => {
		try {
			await updateFolder(id, newName)
			const updatedFolders = await getFolders()
			setData(updatedFolders)
			setIsEditing(false)
		} catch (error) {
			console.error('Error updating folder:', error)
		}
	}

	const handleDeleteItem = async (id: string) => {
		try {
			await deleteFolder(id)
			const updatedFolders = await getFolders()
			setData(updatedFolders)
			if (selectedItem === id) {
				setSelectedItem(null)
				setBreadcrumb([])
			}
		} catch (error) {
			console.error('Error deleting folder:', error)
		}
	}

	const handleMoveItem = async (draggedId: string, targetId: string) => {
		try {
			const draggedIndex = data.findIndex(item => item.id === draggedId)
			const targetIndex = data.findIndex(item => item.id === targetId)
			if (draggedIndex !== -1 && targetIndex !== -1) {
				await moveFolder(draggedId, targetIndex)
				const updatedFolders = await getFolders()
				setData(updatedFolders)
			}
		} catch (error) {
			console.error('Error moving folder:', error)
		}
	}

	const renderSkeletons = () => {
		return Array(5)
			.fill(null)
			.map((_, index) => (
				<div key={index} className="flex items-center space-x-2 mb-2">
					<Skeleton className="h-4 w-4" />
					<Skeleton className="h-4 w-40" />
				</div>
			))
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="">
				<Breadcrumb path={breadcrumb} />
				<div className="flex items-center gap-2 mt-4 mb-2">
					<Input
						type="text"
						placeholder="New folder name"
						value={newItemName}
						onChange={e => setNewItemName(e.target.value)}
					/>
					<Button onClick={handleCreateItem}>
						<FolderPlus className="mr-2 h-4 w-4" />
						New Folder
					</Button>
				</div>
				<div
					className="accordion-treeview-root mt-4"
					role="tree"
					aria-orientation="vertical"
				>
					<div
						className="accordion"
						role="group"
						data-accordion-always-open
					>
						{isLoading
							? renderSkeletons()
							: data.map(item => (
									<TreeItem
										key={item.id}
										item={item}
										onSelect={handleSelect}
										isSelected={selectedItem === item.id}
										path={[item.name]}
										createItem={handleCreateItem}
										updateItem={handleUpdateItem}
										deleteItem={handleDeleteItem}
										moveItem={handleMoveItem}
										isEditing={isEditing}
										setIsEditing={setIsEditing}
									/>
								))}
					</div>
				</div>
			</div>
		</DndProvider>
	)
}
