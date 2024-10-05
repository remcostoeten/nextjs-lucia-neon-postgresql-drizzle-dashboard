'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, MoreHorizontal, MoreVertical } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface MenuItem {
	title: string
	icon?: React.ReactNode
	href?: string
	onClick?: () => void
	subMenu?: MenuItem[]
}

interface DropdownMenuProps {
	items: MenuItem[]
	direction?: 'horizontal' | 'vertical'
	className?: string
}

export default function DropdownMenu({
	items,
	direction = 'vertical',
	className = ''
}: DropdownMenuProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null)
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
				setActiveSubMenu(null)
			}
		}

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				if (activeSubMenu !== null) {
					setActiveSubMenu(null)
				} else {
					setIsOpen(false)
				}
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleEscapeKey)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscapeKey)
		}
	}, [activeSubMenu])

	const toggleMenu = () => setIsOpen(!isOpen)

	const renderMenuItem = (item: MenuItem, index: number) => {
		const hasSubMenu = item.subMenu && item.subMenu.length > 0

		return (
			<li key={index} className="relative">
				<a
					href={item.href}
					onClick={e => {
						if (hasSubMenu) {
							e.preventDefault()
							setActiveSubMenu(
								activeSubMenu === index ? null : index
							)
						} else if (item.onClick) {
							item.onClick()
						}
					}}
					className={`flex items-center px-4 py-2 text-subtitle hover:text-title hover:bg-section-lighter transition-colors ${
						hasSubMenu ? 'pr-8' : ''
					}`}
					target={
						item.href && item.href.startsWith('http')
							? '_blank'
							: undefined
					}
					rel={
						item.href && item.href.startsWith('http')
							? 'noopener noreferrer'
							: undefined
					}
				>
					{item.icon && <span className="mr-2">{item.icon}</span>}
					{item.title}
					{hasSubMenu && (
						<ChevronRight
							className="absolute right-2 top-1/2 transform -translate-y-1/2"
							size={16}
						/>
					)}
				</a>
				{hasSubMenu && (
					<AnimatePresence>
						{activeSubMenu === index && (
							<motion.div
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -10 }}
								className="absolute left-full top-0 bg-card border rounded-md shadow-lg"
								style={{ zIndex: 10 }}
							>
								<ul className="py-1">
									{item.subMenu!.map((subItem, subIndex) =>
										renderMenuItem(
											subItem,
											`${index}-${subIndex}`
										)
									)}
								</ul>
							</motion.div>
						)}
					</AnimatePresence>
				)}
			</li>
		)
	}

	return (
		<div ref={menuRef} className={`relative ${className}`}>
			<button
				onClick={toggleMenu}
				className="p-2 rounded-full hover:bg-section-lighter transition-colors"
				aria-haspopup="true"
				aria-expanded={isOpen}
			>
				{direction === 'horizontal' ? (
					<MoreHorizontal />
				) : (
					<MoreVertical />
				)}
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="absolute right-0 mt-2 bg-card border rounded-md shadow-lg z-50"
					>
						<ul className="py-1">
							{items.map((item, index) =>
								renderMenuItem(item, index)
							)}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
