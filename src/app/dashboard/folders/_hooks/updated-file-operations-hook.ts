// src/components/FileTree/useFileOperations.ts

import { useCallback } from 'react'
import { TreeItemType } from './types'
import {
	getFolders,
	createFolder,
	updateFolder,
	deleteFolder,
	moveFolder,
	changeFolderColor
} from '@/lib/actions/folders'

export const useFileOperations = () => {
	const fetchFolders = useCallback(async (): Promise<TreeItemType[]> => {
		try {
			return await getFolders()
		} catch (error) {
			console.error('Error fetching folders:', error)
			throw error
		}
	}, [])

	const addFolder = useCallback(
		async (name: string, description: string | null = null) => {
			try {
				await createFolder(name, description)
			} catch (error) {
				console.error('Error creating folder:', error)
				throw error
			}
		},
		[]
	)

	const editFolder = useCallback(
		async (id: string, name: string, description: string | null = null) => {
			try {
				await updateFolder(id, name, description)
			} catch (error) {
				console.error('Error updating folder:', error)
				throw error
			}
		},
		[]
	)

	const removeFolder = useCallback(async (id: string) => {
		try {
			await deleteFolder(id)
		} catch (error) {
			console.error('Error deleting folder:', error)
			throw error
		}
	}, [])

	const reorderFolder = useCallback(
		async (id: string, newPosition: number) => {
			try {
				await moveFolder(id, newPosition)
			} catch (error) {
				console.error('Error moving folder:', error)
				throw error
			}
		},
		[]
	)

	const updateFolderColor = useCallback(async (id: string, color: string) => {
		try {
			await changeFolderColor(id, color)
		} catch (error) {
			console.error('Error changing folder color:', error)
			throw error
		}
	}, [])

	return {
		fetchFolders,
		addFolder,
		editFolder,
		removeFolder,
		reorderFolder,
		updateFolderColor
	}
}
