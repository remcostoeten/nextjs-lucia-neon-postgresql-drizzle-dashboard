'use client'

import { designSystemItems } from '@/core/config/design-system-config'
import { TooltipContent } from '@radix-ui/react-tooltip'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Tooltip, TooltipTrigger } from 'ui'
import { TabProps } from '../design-system.types'

const Tab = ({ href, label, isActive, disabled }: TabProps) => {
	const [isHovered, setIsHovered] = useState(false)
	const [hoverDirection, setHoverDirection] = useState('')

	const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
		const { clientX, clientY, target } = event
		const { left, top, right, bottom } = (
			target as HTMLElement
		).getBoundingClientRect()
		const horizontalCenter = (left + right) / 2
		const verticalCenter = (top + bottom) / 2

		if (clientX < horizontalCenter) {
			setHoverDirection('left')
		} else {
			setHoverDirection('right')
		}
		if (clientY < verticalCenter) {
			setHoverDirection(prev =>
				prev === 'left' ? 'top-left' : 'top-right'
			)
		} else {
			setHoverDirection(prev =>
				prev === 'left' ? 'bottom-left' : 'bottom-right'
			)
		}
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
	}

	const tabContent = (
		<motion.div
			className={`relative px-4 flex items-center justify-center rounded-md transition-colors h-10 duration-300 ease-in-out flex-shrink-0 
      ${isActive ? 'bg-[rgba(255,255,255,0.01)]  border-outline shadow-purple-800 hover:shadow-sm hover:shadow-purple-700 trans-all-500 text-white' : 'bg-transparent text-muted hover:text-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
			onMouseEnter={disabled ? undefined : handleMouseEnter}
			onMouseLeave={disabled ? undefined : handleMouseLeave}
		>
			<span className="relative z-10">{label}</span>
			{!isActive && isHovered && !disabled && (
				<motion.div
					className={`absolute inset-0 rounded-md`}
					layoutId="hoverTab"
					initial={{
						opacity: 0,
						translateX: hoverDirection.includes('left') ? -10 : 10,
						translateY: hoverDirection.includes('top') ? -10 : 10
					}}
					animate={{ opacity: 1, translateX: 0, translateY: 0 }}
					exit={{
						opacity: 0,
						translateX: hoverDirection.includes('left') ? -10 : 10,
						translateY: hoverDirection.includes('top') ? -10 : 10
					}}
					transition={{ duration: 0.3 }}
					style={{
						backgroundColor: 'var(--dark-section--lighter)',
						boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
					}}
				/>
			)}
		</motion.div>
	)

	return disabled ? (
		<Tooltip>
			<TooltipTrigger>{tabContent}</TooltipTrigger>
			<TooltipContent side="bottom">
				{' '}
				This item is unavaialble
			</TooltipContent>
		</Tooltip>
	) : (
		<Link href={href} passHref>
			{tabContent}
		</Link>
	)
}

export default function DesignSystemTabs() {
	const pathname = usePathname()
	const scrollContainerRef = useRef<HTMLDivElement | null>(null)
	const [showLeftArrow, setShowLeftArrow] = useState(false)
	const [showRightArrow, setShowRightArrow] = useState(false)

	const handleScroll = () => {
		const container = scrollContainerRef.current
		if (container) {
			setShowLeftArrow(container.scrollLeft > 0)
			setShowRightArrow(
				container.scrollLeft <
					container.scrollWidth - container.clientWidth
			)
		}
	}

	useEffect(() => {
		const container = scrollContainerRef.current
		if (container) {
			container.addEventListener('scroll', handleScroll)
			handleScroll() // Check initial state
		}
		return () => container?.removeEventListener('scroll', handleScroll)
	}, [])

	const scroll = (direction: 'left' | 'right') => {
		const container = scrollContainerRef.current
		if (container) {
			container.scrollBy({
				left: direction === 'left' ? -200 : 200,
				behavior: 'smooth'
			})
		}
	}

	return (
		<nav className="w-full pt-[12px] border-b border-seperator relative">
			<div className="max-w-full mx-auto px-4 relative">
				{showLeftArrow && (
					<button
						onClick={() => scroll('left')}
						className="absolute left-0 top-1/2 transform -translate-y-1/2  rounded-full p-1 z-10"
					>
						<ChevronLeft size={24} />
					</button>
				)}
				<motion.div
					ref={scrollContainerRef}
					className="flex space-x-1 overflow-x-auto justify-center items-center scrollbar-hide"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					{designSystemItems.map(item => (
						<Tab
							key={item.href}
							href={item.href}
							label={item.alias}
							isActive={pathname === item.href}
							disabled={item.disabled} // Pass disabled prop
						/>
					))}
				</motion.div>
				{showRightArrow && (
					<button
						onClick={() => scroll('right')}
						className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-dark-section--lighter rounded-full p-1 z-10"
					>
						<ChevronRight size={24} />
					</button>
				)}
			</div>
		</nav>
	)
}
