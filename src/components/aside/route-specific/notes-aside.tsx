'use client'

import Flex from '@/components/atoms/Flex'
import { CustomDropdown } from '@/components/elements'
import ConfirmationModal from '@/components/elements/crud/confirmation-modal'
import { ColorPicker } from '@/components/ui/color-picker'
import { useNotesStore, useSiteSettingsStore } from '@/core/stores'
import {
	createFolder,
	deleteFolder,
	getFolders,
	updateFolder
} from '@/lib/api/folders'
import { motion } from 'framer-motion'
import {
	Edit,
	FolderOpen,
	PlusCircle,
	Search,
	Star,
	Tag,
	Trash2
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Input
} from 'ui'

type FolderType = {
	id: string
	name: string
	description: string | null
	color: string
}

type DropdownAction = {
	label: string
	icon: React.ReactNode
	onClick: () => void
}

export default function NotesSidebar() {
	const [folders, setFolders] = useState<FolderType[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
	const [isEditFolderDialogOpen, setIsEditFolderDialogOpen] = useState(false)
	const [editingFolder, setEditingFolder] = useState<FolderType | null>(null)
	const [newFolderName, setNewFolderName] = useState('')
	const [newFolderDescription, setNewFolderDescription] = useState('')
	const [newFolderColor, setNewFolderColor] = useState('#000000')
	const { selectedFolderId, setSelectedFolderId } = useNotesStore()
	const { disableSidebarAnimations } = useSiteSettingsStore()
	const router = useRouter()
	const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
		useState(false)
	const [folderToDelete, setFolderToDelete] = useState<FolderType | null>(
		null
	)

	useEffect(() => {
		fetchFolders()
	}, [])

	const fetchFolders = async () => {
		const fetchedFolders = await getFolders()
		setFolders(
			fetchedFolders?.folders?.map(folder => ({
				...folder,
				color: folder.color || '#000000'
			})) || []
		)
	}

	const handleEditFolder = async () => {
		if (editingFolder) {
			const formData = new FormData()
			formData.append('id', editingFolder.id)
			formData.append('name', editingFolder.name)
			formData.append('description', editingFolder.description || '')
			formData.append('color', editingFolder.color)
			try {
				const result = await updateFolder(formData)
				if (result.success) {
					setFolders(prevFolders =>
						prevFolders.map(folder =>
							folder.id === editingFolder.id
								? editingFolder
								: folder
						)
					)
					setIsEditFolderDialogOpen(false)
					setEditingFolder(null)
					toast.success('Folder updated successfully')
				} else {
					throw new Error(result.error)
				}
			} catch (error) {
				console.error('Failed to update folder:', error)
				toast.error('Failed to update folder')
			}
		}
	}

	const handleCreateFolder = async () => {
		const formData = new FormData()
		formData.append('name', newFolderName)
		formData.append('description', newFolderDescription)
		formData.append('color', newFolderColor)
		try {
			const newFolder = await createFolder(formData)
			setFolders(prevFolders => [...prevFolders, newFolder])
			setIsNewFolderDialogOpen(false)
			setNewFolderName('')
			setNewFolderDescription('')
			setNewFolderColor('#000000')
			toast.success('Folder created successfully')
		} catch (error) {
			toast.error('Failed to create folder')
		}
	}

	const handleDeleteFolder = (folder: FolderType) => {
		setFolderToDelete(folder)
		setIsDeleteConfirmationOpen(true)
	}

	const confirmDelete = async () => {
		if (folderToDelete) {
			const formData = new FormData()
			formData.append('id', folderToDelete.id)
			try {
				await deleteFolder(formData)
				setFolders(prevFolders =>
					prevFolders.filter(
						folder => folder.id !== folderToDelete.id
					)
				)
				if (selectedFolderId === folderToDelete.id) {
					setSelectedFolderId(null)
				}
				toast.success('Folder deleted successfully')
			} catch (error) {
				toast.error('Failed to delete folder')
			}
		}
		setIsDeleteConfirmationOpen(false)
		setFolderToDelete(null)
	}

	const handleFolderSelect = (folderId: string | null) => {
		setSelectedFolderId(folderId)
	}

	const getFolderActions = (folder: FolderType): DropdownAction[] => [
		{
			label: 'Edit',
			icon: <Edit className="h-4 w-4" />,
			onClick: () => {
				setEditingFolder(folder)
				setIsEditFolderDialogOpen(true)
			}
		},
		{
			label: 'Delete',
			icon: <Trash2 className="h-4 w-4" />,
			onClick: () => handleDeleteFolder(folder)
		}
	]

	const menuItems = [
		{ icon: FolderOpen, text: 'All Notes', id: null },
		{ icon: Star, text: 'Favorites', id: 'favorites' },
		{ icon: Tag, text: 'Tags', id: 'tags' }
	]

	const getAnimationProps = (delay: number) => {
		if (disableSidebarAnimations) return {}
		return {
			initial: { opacity: 0, y: 20 },
			animate: { opacity: 1, y: 0 },
			transition: { delay }
		}
	}

	return (
		<div className="text-white p-4 h-full w-full overflow-y-auto">
			<motion.div
				{...getAnimationProps(0.1)}
				className="flex justify-between items-center mb-6"
			>
				<h2 className="text-2xl font-bold">Notes</h2>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setIsNewFolderDialogOpen(true)}
				>
					<PlusCircle size={24} />
				</Button>
			</motion.div>
			<motion.div {...getAnimationProps(0.2)} className="relative mb-6">
				<Input
					type="text"
					placeholder="Search notes"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className="pl-10"
				/>
				<Search
					size={18}
					className="absolute left-3 top-2.5 text-gray-400"
				/>
			</motion.div>
			<nav>
				<ul className="space-y-2">
					{menuItems.map((item, index) => (
						<motion.li
							key={item.text}
							{...getAnimationProps(0.1 * (index + 1))}
						>
							<Button
								variant="ghost"
								className={`w-full justify-start ${selectedFolderId === item.id ? 'bg-primary text-primary-foreground' : ''}`}
								onClick={() => handleFolderSelect(item.id)}
							>
								<item.icon size={20} className="mr-2" />
								<span className="text-subtitle">
									{item.text}
								</span>
							</Button>
						</motion.li>
					))}
				</ul>
			</nav>
			<motion.div {...getAnimationProps(0.5)} className="mt-8">
				<h3 className="text-lg font-semibold mb-4">Folders</h3>
				<ul className="space-y-2">
					{folders.map((folder, index) => (
						<motion.li
							key={folder.id}
							{...getAnimationProps(0.6 + index * 0.1)}
							className="flex items-center justify-between"
						>
							<div className="flex items-center min-w-0 flex-grow">
								<FolderOpen
									size={16}
									className="mr-2 flex-shrink-0"
									style={{
										color: folder.color || 'currentColor'
									}}
								/>
								<span className="truncate flex-grow">
									{folder.name}
								</span>
							</div>
							<div className="flex-shrink-0 ml-2">
								<CustomDropdown
									actions={getFolderActions(folder)}
								/>
							</div>
						</motion.li>
					))}
				</ul>
			</motion.div>

			<Dialog
				open={isNewFolderDialogOpen}
				onOpenChange={setIsNewFolderDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Folder</DialogTitle>
					</DialogHeader>
					<Input
						value={newFolderName}
						onChange={e => setNewFolderName(e.target.value)}
						placeholder="Folder Name"
					/>
					<Input
						value={newFolderDescription}
						onChange={e => setNewFolderDescription(e.target.value)}
						placeholder="Folder Description (optional)"
					/>
					<Flex dir="col" gap="2">
						<label className="text-xs" htmlFor="folder-color">
							Folder Color:
						</label>
						<ColorPicker
							value={newFolderColor}
							onChange={setNewFolderColor}
						/>
					</Flex>
					<Button onClick={handleCreateFolder}>Create Folder</Button>
				</DialogContent>
			</Dialog>

			<Dialog
				open={isEditFolderDialogOpen}
				onOpenChange={setIsEditFolderDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Folder</DialogTitle>
					</DialogHeader>
					<Input
						value={editingFolder?.name || ''}
						onChange={e =>
							setEditingFolder(prev =>
								prev ? { ...prev, name: e.target.value } : null
							)
						}
						placeholder="Folder Name"
					/>
					<Input
						value={editingFolder?.description || ''}
						onChange={e =>
							setEditingFolder(prev =>
								prev
									? { ...prev, description: e.target.value }
									: null
							)
						}
						placeholder="Folder Description (optional)"
					/>
					<Flex dir="col" gap="2">
						<label className="text-xs" htmlFor="folder-color">
							Folder Color:
						</label>
						<ColorPicker
							value={editingFolder?.color || '#000000'}
							onChange={color =>
								setEditingFolder(prev =>
									prev ? { ...prev, color } : null
								)
							}
						/>
					</Flex>
					<Button onClick={handleEditFolder}>Save Changes</Button>
				</DialogContent>
			</Dialog>

			<ConfirmationModal
				isOpen={isDeleteConfirmationOpen}
				onClose={() => setIsDeleteConfirmationOpen(false)}
				onConfirm={confirmDelete}
				title="Delete Folder"
				message={`Are you sure you want to delete the folder "${folderToDelete?.name}"? This action cannot be undone.`}
				confirmText="Delete"
				cancelText="Cancel"
				icon={<Trash2 className="h-12 w-12 text-red-500" />}
			/>
		</div>
	)
}
