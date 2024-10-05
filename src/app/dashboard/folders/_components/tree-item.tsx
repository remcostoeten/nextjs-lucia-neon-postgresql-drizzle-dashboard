'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight, Folder, FolderPlus, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

type TreeItemProps = {
	item: {
		id: string
		name: string
		type: 'folder'
		children?: Array<{
			id: string
			name: string
			type: 'folder'
			children?: any[]
		}>
	}
	onSelect: (id: string, path: string[]) => void
	isSelected: boolean
	path: string[]
	createItem: (parentId: string, type: 'folder') => void
	updateItem: (id: string, newName: string) => void
	deleteItem: (id: string) => void
	moveItem: (draggedId: string, targetId: string) => void
}

export function TreeItem({
	item,
	onSelect,
	isSelected,
	path,
	createItem,
	updateItem,
	deleteItem,
	moveItem
}: TreeItemProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [editName, setEditName] = useState(item.name)

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
				moveItem(draggedItem.id, item.id)
			}
		},
		collect: monitor => ({
			isOver: monitor.isOver({ shallow: true })
		})
	})

	const handleToggle = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsOpen(!isOpen)
	}

	const handleSelect = (e: React.MouseEvent) => {
		e.stopPropagation()
		onSelect(item.id, path)
	}

	const handleEdit = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsEditing(true)
		setEditName(item.name)
	}

	const handleUpdate = (e: React.FormEvent) => {
		e.preventDefault()
		updateItem(item.id, editName)
		setIsEditing(false)
	}

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation()
		deleteItem(item.id)
	}

	return (
		<div
			ref={node => drag(drop(node))}
			className={`
        rounded-md transition-colors duration-200
        ${isSelected ? 'bg-section border border-primary' : ''}
        ${isDragging ? 'opacity-50' : ''}
        ${isOver ? 'bg-secondary' : ''}
      `}
			role="treeitem"
			aria-expanded={isOpen}
			id={`item-${item.id}`}
		>
			<div
				className="flex w-full items-center gap-x-2 py-2 px-3 hover:bg-card rounded-md cursor-pointer"
				onClick={handleSelect}
			>
				<button
					className="flex items-center justify-center "
					aria-label="Expand Button"
					aria-expanded={isOpen}
					aria-controls={`folder-content-${item.id}`}
					onClick={handleToggle}
				>
					<ChevronRight
						className={`text-muted-foreground size-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
					/>
				</button>
				{isEditing ? (
					<form
						onSubmit={handleUpdate}
						className="flex-grow flex items-center"
					>
						<Input
							type="text"
							value={editName}
							onChange={e => setEditName(e.target.value)}
							className="h-8"
							autoFocus
						/>
						<Button
							type="submit"
							size="sm"
							variant="secondary"
							className="ml-2 text-subtitle"
						>
							Save
						</Button>
					</form>
				) : (
					<>
						<Folder className="text-subtitle size-5 flex-shrink-0" />
						<span className="text-subtitle">{item.name}</span>
						<div className="ml-auto flex items-center space-x-1">
							<Button
								size="icon"
								variant="ghost"
								onClick={handleEdit}
							>
								<Pencil className="h-4 w-4 text-subtitle" />
							</Button>
							<Button
								size="icon"
								variant="ghost"
								onClick={handleDelete}
							>
								<Trash2 className="h-4 w-4 text-subtitle" />
							</Button>
							<Button
								size="icon"
								variant="ghost"
								onClick={e => {
									e.stopPropagation()
									createItem(item.id, 'folder')
								}}
							>
								<FolderPlus className="h-4 w-4 text-subtitle" />
							</Button>
						</div>
					</>
				)}
			</div>
			{item.children && (
				<div
					id={`folder-content-${item.id}`}
					className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
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
								createItem={createItem}
								updateItem={updateItem}
								deleteItem={deleteItem}
								moveItem={moveItem}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
