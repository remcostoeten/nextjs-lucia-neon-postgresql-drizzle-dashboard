"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Folder, FolderPlus, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { toast } from 'toast'
interface ColorPickerProps {
    label: string
    color: string
    onChange: (color: string) => void
}

function ColorPicker({ label, color, onChange }: ColorPickerProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={`color-${label}`}>{label}</Label>
            <div className="flex items-center space-x-2">
                <input
                    type="color"
                    id={`color-${label}`}
                    value={color}
                    onChange={e => onChange(e.target.value)}
                    className="w-8 h-8 rounded-md border border-input cursor-pointer"
                />
                <Input
                    type="text"
                    value={color}
                    onChange={e => onChange(e.target.value)}
                    className="w-24"
                />
            </div>
        </div>
    )
}

type TreeItemProps = {
    item: {
        id: string
        name: string
        type: 'folder'
        color: string
        children?: Array<TreeItemProps['item']>
    }
    onSelect: (id: string, path: string[]) => void
    isSelected: boolean
    path: string[]
    createItem: (parentId: string, type: 'folder', color: string) => void
    updateItem: (id: string, newName: string, newColor: string) => void
    deleteItem: (id: string) => void
    moveItem: (draggedId: string, targetId: string) => void
}

export function TreeItem({ item, onSelect, isSelected, path, createItem, updateItem, deleteItem, moveItem }: TreeItemProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState(item.name)
    const [editColor, setEditColor] = useState(item.color)
    const showToast = toast((state) => state.showToast)

    const [{ isDragging }, drag] = useDrag({
        type: 'TREE_ITEM',
        item: { id: item.id, type: item.type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{ isOver }, drop] = useDrop({
        accept: 'TREE_ITEM',
        drop: (draggedItem: { id: string, type: string }, monitor) => {
            if (monitor.isOver({ shallow: true })) {
                moveItem(draggedItem.id, item.id)
                showToast(`Moved item to ${item.name}`, 'success')
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
        }),
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
        setEditColor(item.color)
    }

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault()
        updateItem(item.id, editName, editColor)
        setIsEditing(false)
        showToast(`Updated ${item.name}`, 'success')
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        deleteItem(item.id)
        showToast(`Deleted ${item.name}`, 'info')
    }

    const handleCreate = (e: React.MouseEvent) => {
        e.stopPropagation()
        const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
        createItem(item.id, 'folder', newColor)
        showToast(`Created new folder in ${item.name}`, 'success')
    }

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={`
        rounded-md transition-colors duration-200
        ${isSelected ? 'bg-accent' : ''}
        ${isDragging ? 'opacity-50' : ''}
        ${isOver ? 'bg-secondary' : ''}
      `}
            role="treeitem"
            aria-expanded={isOpen}
            id={`item-${item.id}`}
        >
            <div
                className="flex w-full items-center gap-x-2 py-2 px-3 hover:bg-accent/50 rounded-md cursor-pointer"
                onClick={handleSelect}
            >
                <button
                    className="flex items-center justify-center"
                    aria-label="Expand Button"
                    aria-expanded={isOpen}
                    aria-controls={`folder-content-${item.id}`}
                    onClick={handleToggle}
                >
                    <ChevronRight className={`text-muted-foreground size-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isEditing ? (
                    <form onSubmit={handleUpdate} className="flex-grow flex items-center space-x-2">
                        <Input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="h-8"
                            autoFocus
                        />
                        <ColorPicker
                            label="Folder Color"
                            color={editColor}
                            onChange={setEditColor}
                        />
                        <Button type="submit" size="sm" variant="secondary">Save</Button>
                    </form>
                ) : (
                    <>
                        <Folder className="size-5 flex-shrink-0" style={{ color: item.color }} />
                        <span className="text-foreground">{item.name}</span>
                        <div className="ml-auto flex items-center space-x-1">
                            <Button size="icon" variant="ghost" onClick={handleEdit}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={handleDelete}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={handleCreate}>
                                <FolderPlus className="h-4 w-4" />
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
                        {item.children.map((child) => (
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
