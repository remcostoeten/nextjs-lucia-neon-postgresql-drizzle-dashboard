import { Flex } from '@/components/atoms'
import {
	ColorPicker,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Textarea
} from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	changeFolderColor,
	createFolder,
	deleteFolder,
	updateFolder
} from '@/core/server/actions/folders'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Folder, FolderPlus, Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { toast } from 'sonner'

type TreeItem = {
	id: string
	name: string
	type: 'folder'
	color: string
	description: string | null
	children?: TreeItem[]
}

type TreeItemProps = {
	item: TreeItem
	onSelect: (id: string, path: string[]) => void
	isSelected: boolean
	path: string[]
	refreshFolders: () => Promise<void>
}

export function TreeItem({
	item,
	onSelect,
	isSelected,
	path,
	refreshFolders
}: TreeItemProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [editName, setEditName] = useState(item.name)
	const [editColor, setEditColor] = useState(item.color)
	const [folderDescription, setFolderDescription] = useState(
		item.description || ''
	)
	const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	const [{ isDragging }, drag] = useDrag({
		type: 'TREE_ITEM',
		item: { id: item.id, type: item.type },
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	})

	const [{ isOver }, drop] = useDrop({
		accept: 'TREE_ITEM',
		drop: (draggedItem: { id: string; type: string }, monitor) => {
			if (monitor.isOver({ shallow: true })) {
				// Implement move logic here
				toast('Folder moved')
			}
		},
		collect: monitor => ({
			isOver: monitor.isOver({ shallow: true })
		})
	})

	const getTextColor = (bgColor: string) => {
		const r = parseInt(bgColor.slice(1, 3), 16)
		const g = parseInt(bgColor.slice(3, 5), 16)
		const b = parseInt(bgColor.slice(5, 7), 16)
		const brightness = (r * 299 + g * 587 + b * 114) / 1000
		return brightness > 128 ? '#000000' : '#FFFFFF'
	}

	const handleToggle = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsOpen(!isOpen)
	}

	const handleSelect = () => onSelect(item.id, path)

	const handleEdit = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsEditing(true)
		setEditName(item.name)
		setEditColor(item.color)
		setFolderDescription(item.description || '')
	}

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await updateFolder(item.id, editName, folderDescription)
			await changeFolderColor(item.id, editColor)
			setIsEditing(false)
			await refreshFolders()
			toast.success(`Updated ${editName}`)
		} catch (error) {
			console.error('Error updating folder:', error)
			toast.error('Error updating folder')
		}
	}

	const handleDelete = async () => {
		setIsDeleting(true)
		try {
			await deleteFolder(item.id)
			toast.success(`Deleted ${item.name}`)
			// The actual removal from the tree will be handled by the parent component
			// through the refreshFolders function after the animation completes
		} catch (error) {
			console.error('Error deleting folder:', error)
			toast.error('Error deleting folder')
			setIsDeleting(false)
		}
	}

	const handleCreate = async (e: React.MouseEvent) => {
		e.stopPropagation()
		const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
		try {
			await createFolder(`New Folder`, '', item.id)
			await refreshFolders()
			toast.success(`Created new folder under ${item.name}`)
		} catch (error) {
			console.error('Error creating folder:', error)
			toast.error('Error creating folder')
		}
	}

	return (
		<AnimatePresence>
			{!isDeleting && (
				<motion.div
					initial={{ opacity: 1, scale: 1 }}
					exit={{
						opacity: 0,
						scale: 0.8,
						transition: { duration: 0.2 }
					}}
					onAnimationComplete={() => {
						if (isDeleting) {
							refreshFolders()
						}
					}}
				>
					<div
						ref={node => drag(drop(node))}
						className={`tree-item ${isSelected ? 'selected' : ''} ${
							isOver ? 'drag-over' : ''
						}`}
						onClick={handleSelect}
					>
						<div className="flex items-center justify-between p-2">
							{isEditing ? (
								<form
									onSubmit={handleUpdate}
									className="w-full"
								>
									<Input
										value={editName}
										onChange={e =>
											setEditName(e.target.value)
										}
										placeholder="Folder name"
										required
									/>
									<Textarea
										value={folderDescription}
										onChange={e =>
											setFolderDescription(e.target.value)
										}
										placeholder="Folder description (optional)"
									/>
									<ColorPicker
										color={editColor}
										onChange={setEditColor}
									/>
									<Button
										type="submit"
										size="sm"
										variant="secondary"
									>
										Save
									</Button>
								</form>
							) : (
								<>
									<Flex align="center" gap="2">
										<button
											className="flex items-center justify-center"
											aria-label="Expand Button"
											aria-expanded={isOpen}
											aria-controls={`folder-content-${item.id}`}
											onClick={handleToggle}
										>
											<ChevronRight
												className={`text-muted-foreground size-4 transition-transform duration-200 ${
													isOpen ? 'rotate-90' : ''
												}`}
											/>
										</button>
										<div className="relative">
											<Folder
												className="size-5 flex-shrink-0"
												style={{ color: item.color }}
											/>
											<div
												className="absolute bottom-0 right-0 w-2 h-2 rounded-full"
												style={{
													backgroundColor: item.color
												}}
											/>
										</div>
										<span className="text-title">
											{item.name}
										</span>
									</Flex>
									<div className="flex items-center space-x-1">
										<Button
											size="icon"
											variant="ghost"
											onClick={handleEdit}
										>
											<Pencil className="text-title h-4 w-4" />
										</Button>
										<Popover
											open={isDeleteConfirmOpen}
											onOpenChange={
												setIsDeleteConfirmOpen
											}
										>
											<PopoverTrigger asChild>
												<Button
													size="icon"
													variant="ghost"
													onClick={e => {
														e.stopPropagation()
														setIsDeleteConfirmOpen(
															true
														)
													}}
												>
													<Trash2 className="text-title h-4 w-4" />
												</Button>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="center"
											>
												<div className="grid gap-1 p-4">
													<h4 className="font-medium leading-none">
														Are you sure?
													</h4>
													<p className="text-sm text-subtitle mb-2">
														This action cannot be
														undone.
													</p>
													<div className="flex gap-2">
														<Button
															className="h-8"
															onClick={() =>
																setIsDeleteConfirmOpen(
																	false
																)
															}
														>
															No
														</Button>
														<Button
															className="h-8"
															variant="destructive"
															onClick={
																handleDelete
															}
														>
															Yes
														</Button>
													</div>
												</div>
											</PopoverContent>
										</Popover>
										<Button
											size="icon"
											variant="ghost"
											onClick={handleCreate}
										>
											<FolderPlus className="text-title h-4 w-4" />
										</Button>
										<div
											className="w-6 h-6 rounded-full flex items-center justify-center"
											style={{
												backgroundColor: item.color
											}}
										>
											<span
												style={{
													color: getTextColor(
														item.color
													),
													fontSize: '0.7rem'
												}}
											>
												{item.name
													.charAt(0)
													.toUpperCase()}
											</span>
										</div>
									</div>
								</>
							)}
						</div>
						{isOpen && item.description && (
							<div className="mt-2 mb-4 text-sm text-muted-foreground">
								{item.description}
							</div>
						)}
						{item.children && (
							<div
								id={`folder-content-${item.id}`}
								className={`overflow-hidden transition-all duration-300 ${
									isOpen
										? 'max-h-[1000px] opacity-100'
										: 'max-h-0 opacity-0'
								}`}
								aria-labelledby={`item-${item.id}`}
								role="group"
							>
								<div className="pl-6" role="group">
									{item.children.map(child => (
										<TreeItem
											key={child.id}
											item={child}
											onSelect={onSelect}
											isSelected={isSelected}
											path={[...path, child.name]}
											refreshFolders={refreshFolders}
										/>
									))}
								</div>
							</div>
						)}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
