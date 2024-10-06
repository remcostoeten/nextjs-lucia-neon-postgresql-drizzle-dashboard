'use client'

import { Button, Card, CardContent, CardHeader, CardTitle, Input } from 'ui'
import SkeletonLoader from '@/components/effects/loaders/skeleton-loader'
import { ConfirmationDialog } from '@/components/elements/crud/confirm-dialog'
import {
	CustomDropdown,
	DropdownAction
} from '@/components/elements/custom-dropdown'
import {
	Folder,
	TreeRenderer,
	TreeViewElement
} from '@/components/elements/tree-renderer'
import { useSkeletonLoader } from '@/core/hooks'
import {
	deleteFolder,
	getFolderCount,
	getFolders,
	moveFolder,
	updateFolder
} from '@/lib/actions/folders'
import {
	ChevronDown,
	ChevronRight,
	FolderIcon,
	FolderPlus,
	Pencil,
	Trash
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useOptimistic, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { NewFolderForm } from './new-folder-form'

type FolderType = {
	id: string
	name: string
	color: string
	parentId: string | null
}

function FileTree() {
	const [folders, setFolders] = useState<FolderType[]>([])
	const [optimisticFolders, addOptimisticFolder] = useOptimistic<
		FolderType[]
	>(folders, (state, newFolder: FolderType) => [...state, newFolder])
	const [treeElements, setTreeElements] = useState<TreeViewElement[]>([])
	const [selectedItem, setSelectedItem] = useState<string | null>(null)
	const [breadcrumb, setBreadcrumb] = useState<string[]>([])
	const [expandedItems, setExpandedItems] = useState<string[]>([])
	const [editingFolder, setEditingFolder] = useState<FolderType | null>(null)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const {
		data: loadedFolders,
		isLoading,
		itemCount
	} = useSkeletonLoader<FolderType>({
		fetchData: getFolders,
		getItemCount: getFolderCount
	})

	useEffect(() => {
		if (loadedFolders) {
			setFolders(loadedFolders)
		}
	}, [loadedFolders])

	useEffect(() => {
		setTreeElements(buildTreeElements(optimisticFolders))
	}, [optimisticFolders])

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

	const handleUpdateFolder = async (
		id: string,
		name: string,
		color: string
	) => {
		startTransition(async () => {
			try {
				await updateFolder(id, { name, color })
				router.refresh()
				toast.success('Folder updated')
				setIsEditDialogOpen(false)
			} catch (error) {
				console.error('Error updating folder:', error)
				toast.error('Failed to update folder')
			}
		})
	}

	const handleDeleteFolder = async (id: string) => {
		startTransition(async () => {
			try {
				await deleteFolder(id)
				router.refresh()
				if (selectedItem === id) {
					setSelectedItem(null)
					setBreadcrumb([])
				}
				toast.success('Folder deleted')
				setIsDeleteDialogOpen(false)
			} catch (error) {
				console.error('Error deleting folder:', error)
				toast.error('Failed to delete folder')
			}
		})
	}

	const handleMoveFolder = async (draggedId: string, targetId: string) => {
		startTransition(async () => {
			try {
				await moveFolder(draggedId, targetId)
				router.refresh()
				toast.success('Folder moved')
			} catch (error) {
				console.error('Error moving folder:', error)
				toast.error('Failed to move folder')
			}
		})
	}

	const handleNewFolderSuccess = () => {
		setIsNewFolderDialogOpen(false)
		router.refresh()
	}

	const renderFolderSkeleton = () => (
		<div className="flex items-center space-x-2 py-2 px-4">
			<FolderIcon className="w-4 h-4 text-muted-foreground" />
			<div className="h-4 bg-muted rounded w-3/4"></div>
		</div>
	)

	const renderTreeItems = (elements: TreeViewElement[]): React.ReactNode => {
		return elements.map(element => {
			const hasChildren = element.children && element.children.length > 0
			const isExpanded = expandedItems.includes(element.id)
			const isSelected = selectedItem === element.id

			const folderActions: DropdownAction[] = [
				{
					label: 'New Subfolder',
					icon: <FolderPlus className="h-4 w-4" />,
					onClick: () => {
						setSelectedItem(element.id)
						setIsNewFolderDialogOpen(true)
					}
				},
				{
					label: 'Edit',
					icon: <Pencil className="h-4 w-4" />,
					onClick: () => {
						setEditingFolder(
							folders.find(f => f.id === element.id) || null
						)
						setIsEditDialogOpen(true)
					}
				},
				{
					label: 'Delete',
					icon: <Trash className="h-4 w-4" />,
					onClick: () => {
						setEditingFolder(
							folders.find(f => f.id === element.id) || null
						)
						setIsDeleteDialogOpen(true)
					}
				}
			]

			return (
				<Folder
					key={element.id}
					element={
						<div className="flex items-center justify-between w-full">
							<div
								className={`flex items-center ${isSelected ? 'font-bold' : ''}`}
							>
								<span>{element.name}</span>
								{hasChildren && (
									<span className="ml-2 text-xs text-muted-foreground">
										({element.children?.length})
									</span>
								)}
							</div>
							<CustomDropdown actions={folderActions} />
						</div>
					}
					value={element.id}
					openIcon={
						hasChildren ? <ChevronDown className="h-4 w-4" /> : null
					}
					closeIcon={
						hasChildren ? (
							<ChevronRight className="h-4 w-4" />
						) : null
					}
					color={element.color}
					isSelectable={true}
					isSelect={isSelected}
					hasChildren={hasChildren}
					isExpanded={isExpanded}
					onToggle={() => {
						if (hasChildren) {
							setExpandedItems(prev =>
								prev.includes(element.id)
									? prev.filter(id => id !== element.id)
									: [...prev, element.id]
							)
						}
					}}
				>
					{hasChildren &&
						isExpanded &&
						renderTreeItems(element.children)}
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
				<Button
					onClick={() => setIsNewFolderDialogOpen(true)}
					className="mb-4"
				>
					New Folder
				</Button>
				{isLoading ? (
					<SkeletonLoader
						count={itemCount}
						className="w-full h-8 mb-2"
						as={renderFolderSkeleton}
					/>
				) : (
					<TreeRenderer
						className="h-[60vh] overflow-y-auto"
						initialSelectedId={selectedItem || undefined}
						initialExpandedItems={expandedItems}
						onExpandedItemsChange={setExpandedItems}
						onSelect={event => {
							const target = event.target as HTMLElement
							const id = target
								.closest('[data-value]')
								?.getAttribute('data-value')
							if (id) handleSelect(id)
						}}
					>
						{treeElements.length > 0 &&
							renderTreeItems(treeElements)}
					</TreeRenderer>
				)}
			</CardContent>

			<ConfirmationDialog
				isOpen={isEditDialogOpen}
				onClose={() => setIsEditDialogOpen(false)}
				onConfirm={() => {
					if (editingFolder) {
						handleUpdateFolder(
							editingFolder.id,
							editingFolder.name,
							editingFolder.color
						)
					}
				}}
				title="Edit Folder"
				confirmLabel="Save"
				cancelLabel="Cancel"
			>
				<div className="space-y-4">
					<div>
						<label
							htmlFor="folderName"
							className="block text-sm font-medium text-gray-700"
						>
							Folder Name
						</label>
						<Input
							id="folderName"
							value={editingFolder?.name || ''}
							onChange={e =>
								setEditingFolder(prev =>
									prev
										? { ...prev, name: e.target.value }
										: null
								)
							}
							className="mt-1"
						/>
					</div>
					<div>
						<label
							htmlFor="folderColor"
							className="block text-sm font-medium text-gray-700"
						>
							Folder Color
						</label>
						<Input
							id="folderColor"
							type="color"
							value={editingFolder?.color || '#000000'}
							onChange={e =>
								setEditingFolder(prev =>
									prev
										? { ...prev, color: e.target.value }
										: null
								)
							}
							className="mt-1"
						/>
					</div>
				</div>
			</ConfirmationDialog>

			<ConfirmationDialog
				isOpen={isDeleteDialogOpen}
				onClose={() => setIsDeleteDialogOpen(false)}
				onConfirm={() => {
					if (editingFolder) {
						handleDeleteFolder(editingFolder.id)
					}
				}}
				title="Delete Folder"
				confirmLabel="Yes"
				cancelLabel="No"
			>
				<p>
					Are you sure you want to delete this folder? This action
					cannot be undone.
				</p>
			</ConfirmationDialog>

			<ConfirmationDialog
				isOpen={isNewFolderDialogOpen}
				onClose={() => setIsNewFolderDialogOpen(false)}
				title="New Folder"
				hideConfirmButton={true}
			>
				<NewFolderForm
					parentId={selectedItem}
					onSuccess={handleNewFolderSuccess}
				/>
			</ConfirmationDialog>
		</Card>
	)
}

export default FileTree
