'use client'

import {
	File,
	Folder,
	Tree,
	TreeViewElement
} from '@/components/elements/file-tree'
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
import { FolderPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

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
	const [newFolderName, setNewFolderName] = useState('')
	const [newFolderColor, setNewFolderColor] = useState('#000000')
	const [isLoading, setIsLoading] = useState(true)

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
				children: []
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

	const renderTreeItems = (elements: TreeViewElement[]): React.ReactNode => {
		return elements.map(element => {
			if (element.children && element.children.length > 0) {
				return (
					<Folder
						key={element.id}
						element={element.name}
						value={element.id}
					>
						{renderTreeItems(element.children)}
					</Folder>
				)
			} else {
				return (
					<File key={element.id} value={element.id}>
						{element.name}
					</File>
				)
			}
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
					<Tree
						className="h-[60vh] overflow-y-auto"
						initialSelectedId={selectedItem || undefined}
					>
						{renderTreeItems(treeElements)}
					</Tree>
				)}
			</CardContent>
		</Card>
	)
}

export default FileTree
