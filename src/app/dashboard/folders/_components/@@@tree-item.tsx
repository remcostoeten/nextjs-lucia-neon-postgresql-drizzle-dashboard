'use client'

import { Card, CardContent, CardHeader, CardTitle } from 'ui'
import { Folder, Tree, TreeViewElement } from '@/components/elements/tree'
import Spinner from '@/components/ui/spinner'
import {
	createFolder,
	deleteFolder,
	getFolders,
	moveFolder,
	updateFolder
} from '@/lib/actions/folders'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FolderContextMenu } from './folder-context-menu'
import { NewFolderForm } from './new-folder-form'

type FolderType = {
	id: string
	name: string
	color: string
	parentId: string | null
}

const FileTree = () => {
	const [folders, setFolders] = useState<FolderType[]>([])
	const [treeElements, setTreeElements] = useState<TreeViewElement[]>([])
	const [selectedItem, setSelectedItem] = useState<string | null>(null)
	const [breadcrumb, setBreadcrumb] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [expandedItems, setExpandedItems] = useState<string[]>([])

	useEffect(() => {
		fetchFolders()
	}, [])

	useEffect(() => {
		setTreeElements(buildTreeElements(folders))
	}, [folders])

	const fetchFolders = async () => {
		try {
			setIsLoading(true)
			const { folders } = await getFolders()
			setFolders(folders)
		} catch (error) {
			console.error('Error fetching folders:', error)
			toast.error('Failed to fetch folders')
		} finally {
			setIsLoading(false)
		}
	}

	const buildTreeElements = (folders: FolderType[]): TreeViewElement[] => {
		const map: { [key: string]: TreeViewElement } = {}

		folders.forEach(folder => {
			map[folder.id] = {
				id: folder.id,
				name: folder.name,
				isSelectable: true,
				children: [],
				color: folder.color
			}
		})

		const tree: TreeViewElement[] = []

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

	const handleSelect = (id: string) => {
		setSelectedItem(id)
		const path = getPath(id, treeElements)
		setBreadcrumb(path)
	}

	const getPath = (
		id: string,
		elements: TreeViewElement[],
		currentPath: string[] = []
	): string[] => {
		for (const element of elements) {
			if (element.id === id) {
				return [...currentPath, element.name]
			}
			if (element.children) {
				const path = getPath(id, element.children, [
					...currentPath,
					element.name
				])
				if (path.length) return path
			}
		}
		return []
	}

	const handleCreateFolder = async (
		parentId: string | null,
		name: string,
		color: string
	) => {
		try {
			await createFolder(name, null, parentId, color)
			await fetchFolders()
			toast.success('Folder created')
			if (parentId) {
				setExpandedItems(prev => [...prev, parentId])
			}
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
			setSelectedItem(null)
			setBreadcrumb([])
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

	const renderTreeItems = (elements: TreeViewElement[]): React.ReactNode => {
		return elements.map(element => {
			const hasChildren = element.children && element.children.length > 0
			const isExpanded = expandedItems.includes(element.id)

			return (
				<Folder
					key={element.id}
					element={
						<div className="flex items-center">
							<span>{element.name}</span>
							{hasChildren && (
								<span className="ml-2 text-xs text-muted-foreground">
									({element.children?.length})
								</span>
							)}
						</div>
					}
					value={element.id}
					openIcon={<ChevronDown className="h-4 w-4" />}
					closeIcon={<ChevronRight className="h-4 w-4" />}
					color={element.color}
					isSelectable={true}
					isSelect={selectedItem === element.id}
					hasChildren={hasChildren}
				>
					<FolderContextMenu
						folderId={element.id}
						folderName={element.name}
						folderColor={element.color}
						onUpdate={handleUpdateFolder}
						onDelete={handleDeleteFolder}
					/>
					{isExpanded &&
						hasChildren &&
						renderTreeItems(element.children || [])}
				</Folder>
			)
		})
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
				<NewFolderForm
					onCreateFolder={handleCreateFolder}
					parentId={selectedItem}
				/>
				{isLoading ? (
					<div className="flex justify-center">
						<Spinner />
					</div>
				) : (
					<Tree
						className="h-[60vh] overflow-y-auto"
						initialSelectedId={selectedItem || undefined}
						initialExpandedItems={expandedItems}
						onExpandedItemsChange={setExpandedItems}
						onSelect={handleSelect}
					>
						{renderTreeItems(treeElements)}
					</Tree>
				)}
			</CardContent>
		</Card>
	)
}

export default FileTree
