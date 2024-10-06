'use client'

import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
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
import { toast } from 'sonner'
import { TreeItem } from './tree-item'

type TreeItemType = {
	id: string
	name: string
	description: string | null
	color: string
	userId: string
	createdAt: Date
	updatedAt: Date
	parentId: string | null
	type: 'folder'
	children?: TreeItemType[]
}

export default function FileTree() {
	const [data, setData] = useState<TreeItemType[]>([])
	const [selectedItem, setSelectedItem] = useState<string | null>(null)
	const [breadcrumb, setBreadcrumb] = useState<string[]>([])
	const [newItemName, setNewItemName] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchFolders = async () => {
			try {
				setIsLoading(true)
				const folders = await getFolders()
				const nestedFolders = buildNestedStructure(folders)
				setData(nestedFolders)
			} catch (error) {
				console.error('Error fetching folders:', error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchFolders()
	}, [])

	const buildNestedStructure = (folders: TreeItemType[]): TreeItemType[] => {
		const folderMap = new Map<string, TreeItemType>()
		const rootFolders: TreeItemType[] = []

		folders.forEach(folder => {
			folderMap.set(folder.id, { ...folder, children: [] })
		})

		folders.forEach(folder => {
			if (folder.parentId) {
				const parent = folderMap.get(folder.parentId)
				if (parent) {
					parent.children?.push(folderMap.get(folder.id)!)
				}
			} else {
				rootFolders.push(folderMap.get(folder.id)!)
			}
		})

		return rootFolders
	}

	const handleSelect = (id: string, path: string[]) => {
		setSelectedItem(id)
		setBreadcrumb(path)
	}

	const handleCreateItem = async (
		parentId: string | null,
		name: string,
		color: string
	) => {
		try {
			if (name.trim() === '') {
				toast('Folder name cannot be empty')
				return
			}
			await createFolder(name, null, parentId)
			const updatedFolders = await getFolders()
			const nestedFolders = buildNestedStructure(updatedFolders)
			setData(nestedFolders)
			setNewItemName('')
			toast('Folder created')
		} catch (error) {
			toast('Error creating folder')
			console.error('Error creating folder:', error)
		}
	}

	const handleUpdateItem = async (
		id: string,
		newName: string,
		newColor: string
	) => {
		try {
			await updateFolder(id, newName, newColor)
			const updatedFolders = await getFolders()
			const nestedFolders = buildNestedStructure(updatedFolders)
			setData(nestedFolders)
		} catch (error) {
			console.error('Error updating folder:', error)
		}
	}

	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [folderToDelete, setFolderToDelete] = useState<string | null>(null)

	const handleDeleteItem = async (id: string) => {
		setFolderToDelete(id)
		setIsDeleteDialogOpen(true)
	}

	const confirmDelete = async () => {
		if (folderToDelete) {
			try {
				await deleteFolder(folderToDelete)
				const updatedFolders = await getFolders()
				const nestedFolders = buildNestedStructure(updatedFolders)
				setData(nestedFolders)
				if (selectedItem === folderToDelete) {
					setSelectedItem(null)
					setBreadcrumb([])
				}
				toast.success('Folder deleted successfully')
			} catch (error) {
				console.error('Error deleting folder:', error)
				toast.error('Failed to delete folder')
			}
			setIsDeleteDialogOpen(false)
			setFolderToDelete(null)
		}
	}

	const handleMoveItem = async (draggedId: string, targetId: string) => {
		try {
			await moveFolder(draggedId, targetId)
			const updatedFolders = await getFolders()
			const nestedFolders = buildNestedStructure(updatedFolders)
			setData(nestedFolders)
		} catch (error) {
			console.error('Error moving folder:', error)
		}
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="p-4">
				<Breadcrumb path={breadcrumb} />
				<div className="flex items-center gap-2 mt-4 mb-2">
					<Input
						type="text"
						placeholder="New folder name"
						value={newItemName}
						onChange={e => setNewItemName(e.target.value)}
					/>
					<Button
						variant="outline"
						onClick={() =>
							handleCreateItem(null, newItemName, '#000000')
						}
					>
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
						{isLoading ? (
							<Spinner />
						) : (
							data.map((item: TreeItemType) => (
								<TreeItem
									key={item.id}
									item={item}
									onSelect={handleSelect}
									isSelected={selectedItem === item.id}
									path={[item.name]}
									refreshFolders={async () => {
										const updatedFolders =
											await getFolders()
										const nestedFolders =
											buildNestedStructure(updatedFolders)
										setData(nestedFolders)
									}}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</DndProvider>
	)
}
