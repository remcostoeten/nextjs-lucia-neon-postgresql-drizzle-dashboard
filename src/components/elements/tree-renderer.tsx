import { ReactNode, useEffect, useState } from 'react'

export interface TreeViewElement {
	id: string
	name: string
	isSelectable: boolean
	children?: TreeViewElement[]
	color?: string
}

interface TreeRendererProps {
	children: ReactNode
	className?: string
	initialSelectedId?: string
	initialExpandedItems?: string[]
	onExpandedItemsChange?: (expandedItems: string[]) => void
	onSelect?: (event: React.MouseEvent<HTMLDivElement>) => void
	indicator?: boolean
	elements?: TreeViewElement[]
	openIcon?: ReactNode
	closeIcon?: ReactNode
}

export const TreeRenderer: React.FC<TreeRendererProps> = ({
	children,
	className,
	initialSelectedId,
	initialExpandedItems = [],
	onExpandedItemsChange,
	onSelect,
	indicator = false,
	elements = [],
	openIcon,
	closeIcon
}) => {
	const [expandedItems, setExpandedItems] =
		useState<string[]>(initialExpandedItems)
	const [selectedId, setSelectedId] = useState<string | undefined>(
		initialSelectedId
	)

	useEffect(() => {
		if (onExpandedItemsChange) {
			onExpandedItemsChange(expandedItems)
		}
	}, [expandedItems, onExpandedItemsChange])

	const handleToggle = (id: string) => {
		setExpandedItems(prev =>
			prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
		)
	}

	const handleSelect = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement
		const id = target.closest('[data-value]')?.getAttribute('data-value')
		if (id) {
			setSelectedId(id)
			onSelect?.(event)
		}
	}

	const renderTreeItems = (items: TreeViewElement[]): ReactNode => {
		return items.map(item => (
			<Folder
				key={item.id}
				element={
					<div
						className={`flex items-center ${selectedId === item.id ? 'font-bold' : ''}`}
					>
						{indicator &&
							item.children?.length > 0 &&
							(expandedItems.includes(item.id)
								? openIcon
								: closeIcon)}
						<span>{item.name}</span>
					</div>
				}
				value={item.id}
				color={item.color}
				isSelectable={item.isSelectable}
				isSelect={selectedId === item.id}
				hasChildren={!!item.children?.length}
				isExpanded={expandedItems.includes(item.id)}
				onToggle={() => handleToggle(item.id)}
			>
				{item.children?.length > 0 &&
					expandedItems.includes(item.id) &&
					renderTreeItems(item.children)}
			</Folder>
		))
	}

	return (
		<div className={className} onClick={handleSelect}>
			{elements.length > 0 ? renderTreeItems(elements) : children}
		</div>
	)
}

interface FolderProps {
	element: ReactNode
	value: string
	color?: string
	isSelectable?: boolean
	isSelect?: boolean
	hasChildren?: boolean
	isExpanded?: boolean
	onToggle?: () => void
	children?: ReactNode
}

export const Folder: React.FC<FolderProps> = ({
	element,
	value,
	color,
	isSelectable,
	isSelect,
	hasChildren,
	isExpanded,
	onToggle,
	children
}) => {
	return (
		<div>
			<div
				onClick={onToggle}
				data-value={value}
				className={`
                    cursor-pointer transition-all duration-300 ease-in-out hover:bg-section-lighter hover:scale-[1.01]
                    ${isSelectable ? '' : 'border-error'} 
                    ${isSelect ? 'bg-section-lighter border' : ''}
                `}
				style={{ borderLeft: color ? `4px solid ${color}` : undefined }}
			>
				{element}
			</div>
			{isExpanded && children && <div className="ml-4">{children}</div>}
		</div>
	)
}
