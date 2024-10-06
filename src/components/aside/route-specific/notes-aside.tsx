'use client'

import { useNotesStore, useSiteSettingsStore } from '@/core/stores'
import { createFolder, getFolders } from '@/lib/api/@@folders'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FolderType } from '../types.sidear'

export default function NotesSidebar() {
	const [folders, setFolders] = useState<FolderType[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredFolders, setFilteredFolders] = useState<FolderType[]>([])
	const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
	const [isEditFolderDialogOpen, setIsEditFolderDialogOpen] = useState(false)
	const [editingFolder, setEditingFolder] = useState<FolderType | null>(null)
	const [newFolderName, setNewFolderName] = useState('')
	const [newFolderDescription, setNewFolderDescription] = useState('')
	const [newFolderColor, setNewFolderColor] = useState('#000000')
	const { selectedFolderId, setSelectedFolderId } = useNotesStore()
	const { disableSidebarAnimations } = useSiteSettingsStore()
	const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
	const [folderToDelete, setFolderToDelete] = useState<FolderType | null>(null)

	useEffect(() => {
		fetchFolders()
	}, [])

	useEffect(() => {
		const filtered = folders.filter(
			folder =>
				folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(folder.description &&
					folder.description
						.toLowerCase()
						.includes(searchTerm.toLowerCase()))
		)
		setFilteredFolders(filtered)
	}, [searchTerm, folders])

	const fetchFolders = async () => {
		try {
			const fetchedFolders = await getFolders()
			console.log('Fetched folders:', fetchedFolders)
			if (fetchedFolders?.folders) {
				const formattedFolders = fetchedFolders.folders.map(folder => ({
					...folder,
					color: folder.color || '#000000'
				}))
				setFolders(formattedFolders)
				setFilteredFolders(formattedFolders)
			}
		} catch (error) {
			console.error('Error fetching folders:', error)
			toast.error('Failed to fetch folders')
		}
	}

	const handleCreateFolder = async () => {
		const formData = new FormData()
		formData.append('name', newFolderName)
		formData.append('description', newFolderDescription)
		formData.append('color', newFolderColor)
		try {
			const { success, folder } = await createFolder(formData)
			if (success && folder) {
				setFolders(prevFolders => [...prevFolders, folder])
				setFilteredFolders(prevFiltered => [...prevFiltered, folder])
				setIsNewFolderDialogOpen(false)
				setNewFolderName('')
				setNewFolderDescription('')
				setNewFolderColor('#000000')
				toast.success('Folder created successfully')
			} else {
				throw new Error('Failed to create folder')
			}
		} catch (error) {
			toast.error('Failed to create folder')
		}
	}

	// ... rest of the component code
}
