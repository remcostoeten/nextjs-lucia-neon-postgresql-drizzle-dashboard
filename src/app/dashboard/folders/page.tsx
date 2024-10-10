'use client'

import { TreeViewElement } from '@/components/elements/tree-renderer'
import {
	createFolder,
	deleteFolder,
	getFolders,
	moveFolder,
	updateFolder
} from '@/lib/actions/folders'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import FileTree from './_components/file-tree'

export default function FoldersPage() {
	const [folders, setFolders] = useState<TreeViewElement[]>([])

	useEffect(() => {
		const fetchFolders = async () => {
			try {
				const { folders } = await getFolders()
				setFolders(buildTree(folders))
			} catch (error) {
				toast.error('Failed to fetch folders')
			}
		}
		fetchFolders()
	}, [])

	const buildTree = (folders: TreeViewElement[]): TreeViewElement[] => {
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

	const handleUpdateFolder = async (
		id: string,
		name: string,
		color: string
	) => {
		try {
			await updateFolder(id, { name, color })
			const { folders } = await getFolders()
			setFolders(buildTree(folders))
			toast.success('Folder updated successfully')
		} catch (error) {
			toast.error('Failed to update folder')
		}
	}

	const handleDeleteFolder = async (id: string) => {
		try {
			await deleteFolder(id)
			const { folders } = await getFolders()
			setFolders(buildTree(folders))
			toast.success('Folder deleted successfully')
		} catch (error) {
			toast.error('Failed to delete folder')
		}
	}

	const handleMoveFolder = async (id: string, newParentId: string | null) => {
		try {
			await moveFolder(id, newParentId)
			const { folders } = await getFolders()
			setFolders(buildTree(folders))
			toast.success('Folder moved successfully')
		} catch (error) {
			toast.error('Failed to move folder')
		}
	}

	const handleCreateFolder = async (
		name: string,
		color: string,
		parentId: string | null
	) => {
		try {
			const { success, folder } = await createFolder(
				name,
				null,
				parentId,
				color
			)
			if (success && folder) {
				const { folders } = await getFolders()
				setFolders(buildTree(folders))
				toast.success('Folder created successfully')
			} else {
				throw new Error('Failed to create folder')
			}
		} catch (error) {
			toast.error('Failed to create folder')
		}
	}

	return (
		<div className="w-full max-w-3xl">
			<h1 className="text-2xl font-bold mb-4 text-title">
				File Explorer
			</h1>
			<FileTree
				initialElements={folders}
				onUpdateFolder={handleUpdateFolder}
				onDeleteFolder={handleDeleteFolder}
				onMoveFolder={handleMoveFolder}
				onCreateFolder={handleCreateFolder}
			/>
		</div>
	)
}
