'use client'

import { DropdownAction } from '@/components/elements'
import ConfirmationModal from '@/components/elements/crud/confirmation-modal'
import FolderCrudButton from '@/components/elements/crud/crud-button'
import { useNotesStore, useSiteSettingsStore } from '@/core/stores'

import { Flex } from 'atoms'
import { motion } from 'framer-motion'
import { Edit, FolderOpen, PlusCircle, Star, Tag, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	ColorPicker,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Input
} from 'ui'
import { FolderType } from '../types.sidear'
import {
	createFolder,
	deleteFolder,
	getFolders,
	updateFolder
} from '@/core/server/actions/folders'

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
	const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
		useState(false)
	const [folderToDelete, setFolderToDelete] = useState<FolderType | null>(
		null
	)

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

	const handleDeleteFolder = (folderId: string) => {
		const folder = folders.find(folder => folder.id === folderId)
		if (folder) {
			setFolderToDelete(folder)
			setIsDeleteConfirmationOpen(true)
		}
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

	const getFolderActions = (folder: FolderType): DropdownAction[] => [
		{
			label: 'Edit',
			icon: <Edit size={16} />,
			onClick: () => {
				setEditingFolder(folder)
				setIsEditFolderDialogOpen(true)
			}
		},
		{
			label: 'Delete',
			icon: <Trash2 size={16} />,
			onClick: () => handleDeleteFolder(folder.id)
		}
	]

	const getAnimationProps = (delay: number) => ({
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { delay, duration: 0.3 }
	})

	const handleFolderSelect = (folderId: string) => {
		setSelectedFolderId(folderId)
	}

	return (
		<aside className="w-64 bg-background p-4 border-r border-border h-full overflow-y-auto">
			<motion.div {...getAnimationProps(0.1)}>
				<h2 className="text-xl font-semibold mb-4">Notes</h2>
			</motion.div>

			<motion.div {...getAnimationProps(0.2)}>
				<Input
					type="text"
					placeholder="Search folders..."
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className="mb-4"
				/>
			</motion.div>

			<motion.div {...getAnimationProps(0.3)}>
				<Button
					onClick={() => setIsNewFolderDialogOpen(true)}
					className="w-full mb-4"
				>
					<PlusCircle size={16} className="mr-2" />
					New Folder
				</Button>
			</motion.div>

			<motion.div {...getAnimationProps(0.4)}>
				<h3 className="text-lg font-semibold mb-2">Quick Access</h3>
				<ul className="space-y-2">
					<li className="flex items-center">
						<Star size={16} className="mr-2" />
						<span>Favorites</span>
					</li>
					<li className="flex items-center">
						<Tag size={16} className="mr-2" />
						<span>Tags</span>
					</li>
				</ul>
			</motion.div>

			<motion.div {...getAnimationProps(0.5)}>
				<h3 className="text-lg font-semibold my-4">Folders</h3>
				{filteredFolders.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No folders found
					</p>
				) : (
					<ul className="space-y-2">
						{filteredFolders.map((folder, index) => (
							<motion.li
								key={folder.id}
								{...getAnimationProps(0.6 + index * 0.1)}
								className="flex items-center justify-between"
							>
								<div
									className="flex items-center min-w-0 flex-grow cursor-pointer"
									onClick={() =>
										handleFolderSelect(folder.id)
									}
								>
									<FolderOpen
										size={16}
										className="mr-2 flex-shrink-0"
										style={{
											color:
												folder.color || 'currentColor'
										}}
									/>
									<span
										className={`text-subtitle truncate flex-grow ${selectedFolderId === folder.id ? 'font-bold' : ''}`}
									>
										{folder.name}
									</span>
								</div>
								<div className="flex-shrink-0 ml-2">
									<FolderCrudButton
										folder={folder}
										onDelete={() =>
											handleDeleteFolder(folder.id)
										} // Implement this function to handle folder deletion
									/>
								</div>
							</motion.li>
						))}
					</ul>
				)}
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
				icon={<Trash2 className="h-12 w-12 text-subtitle" />}
			/>
		</aside>
	)
}
