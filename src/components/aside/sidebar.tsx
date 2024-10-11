'use client'

import { sidebarItems } from '@/core/config/menu-items/sidebar-menu-items'
import { customEasing } from '@/core/constants/animations'
import { motion } from 'framer-motion'
import {
	ChevronLeft,
	ChevronRight,
	LucideIcon,
	PanelLeftClose,
	PanelLeftOpen,
	Settings2Icon
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSiteSettingsStore } from 'stores'
import UnifiedSettingsComponent from './site-settings-menu'
import { MainSidebarProps, SidebarIconProps } from './types.sidear'

function useActivePath(): (path: string) => boolean {
	const pathname = usePathname()

	const isActivePath = (path: string) => {
		if (path === '/' && pathname !== path) {
			return false
		}
		return pathname.startsWith(path)
	}

	return isActivePath
}

function SidebarIcon({ item, isActive, onClick }: SidebarIconProps) {
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const { disableAllAnimations } = useSiteSettingsStore()

	const IconComponent = disableAllAnimations ? 'div' : motion.div

	return (
		<IconComponent
			className={`relative z-50 flex items-center justify-center size-10 mb-2 rounded-md transition-colors duration-200 ${
				isActive
					? 'bg-body border-outline text-white'
					: 'text-zinc-400 hover:text-title hover:bg-body'
			} ${isHovered ? 'border border-outline' : ''}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			whileHover={disableAllAnimations ? undefined : { scale: 1.1 }}
			whileTap={disableAllAnimations ? undefined : { scale: 0.95 }}
			onClick={onClick}
		>
			<item.icon className="w-4 h-4" aria-hidden="true" />
			<span className="sr-only">{item.name}</span>
			{item.hasAlert && (
				<div className="absolute -top-1 -right-1 flex items-center justify-center size-4 px-1 bg-body border border-outline rounded-full shadow-xl backdrop-filter backdrop-blur-lg z-10">
					<span className="text-[12px] font-bold text-title z-20">
						{item.alertCount && item.alertCount > 99
							? '99+'
							: item.alertCount}
						<div className="absolute -z-10 inset-0 rounded-full shadow-[0_0_10px_rgba(255,165,0,.7)] blur-[5px]"></div>
					</span>
				</div>
			)}
			{isHovered && (
				<div className="absolute left-full -z-10 ml-2 px-2 py-1 bg-body border border-outline text-white text-xs font-medium rounded-md whitespace-nowrap !pointer-events-none">
					{item.name}
				</div>
			)}
		</IconComponent>
	)
}

export default function MainSidebar({
	isSubSidebarOpen,
	toggleSubSidebar,
	isCollapsed,
	toggleCollapse
}: MainSidebarProps) {
	const isActivePath = useActivePath()
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
	const [isSidebarVisible, setIsSidebarVisible] = useState(false)
	const { disableAllAnimations } = useSiteSettingsStore()

	useEffect(() => {
		const timer = setTimeout(() => setIsSidebarVisible(true), 300)
		return () => clearTimeout(timer)
	}, [])

	const sidebarVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { duration: 0.3 }
		}
	}

	const contentVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delay: 0.3,
				staggerChildren: 0.1,
				when: 'beforeChildren'
			}
		}
	}

	const itemVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: { opacity: 1, y: 0 }
	}

	const SidebarComponent = disableAllAnimations ? 'aside' : motion.aside
	const ContentComponent = disableAllAnimations ? 'div' : motion.div
	const ItemComponent = disableAllAnimations ? 'div' : motion.div
	const ButtonComponent = disableAllAnimations ? 'button' : motion.button

	return (
		<>
			<div className="relative">
				<SidebarComponent
					initial={disableAllAnimations ? undefined : 'hidden'}
					animate={
						disableAllAnimations
							? undefined
							: isSidebarVisible
								? 'visible'
								: 'hidden'
					}
					variants={
						disableAllAnimations ? undefined : sidebarVariants
					}
					className="fixed border-right left-0 top-[var(--header-height)] w-sidebar bottom-0 flex items-center z-10 overflow-hidden"
					style={{
						width: isCollapsed ? 0 : 'var(--sidebar-width)',
						transition: `width 0.3s ${customEasing}`
					}}
				>
					<ContentComponent
						variants={
							disableAllAnimations ? undefined : contentVariants
						}
						initial={disableAllAnimations ? undefined : 'hidden'}
						animate={disableAllAnimations ? undefined : 'visible'}
						className="h-full bg-body border-r-outline flex flex-col items-center py-4 z-40 w-full"
					>
						<nav className="flex gap-2 flex-col items-center flex-grow">
							{sidebarItems.map(item => (
								<ItemComponent
									key={item.path}
									variants={
										disableAllAnimations
											? undefined
											: itemVariants
									}
								>
									<Link href={item.path}>
										<SidebarIcon
											item={item}
											isActive={isActivePath(item.path)}
										/>
									</Link>
								</ItemComponent>
							))}
						</nav>
						<div className="flex flex-col items-center mt-auto">
							<ItemComponent
								variants={
									disableAllAnimations
										? undefined
										: itemVariants
								}
							>
								<SidebarIcon
									item={{
										name: 'Settings',
										path: '#settings',
										icon: Settings2Icon as LucideIcon
									}}
									isActive={false}
									onClick={() => setIsSettingsOpen(true)}
								/>
							</ItemComponent>
							<ButtonComponent
								variants={
									disableAllAnimations
										? undefined
										: itemVariants
								}
								onClick={toggleSubSidebar}
								className="size-[55px] opacity-50 flex items-center justify-center text-zinc-400 hover:text-title mt-2"
								aria-label={
									isSubSidebarOpen
										? 'Close sub sidebar'
										: 'Open sub sidebar'
								}
							>
								{isSubSidebarOpen ? (
									<PanelLeftClose
										className="w-6 h-6"
										aria-hidden="true"
									/>
								) : (
									<PanelLeftOpen
										className="w-6 h-6"
										aria-hidden="true"
									/>
								)}
							</ButtonComponent>
						</div>
					</ContentComponent>
				</SidebarComponent>
				<ButtonComponent
					onClick={toggleCollapse}
					className={`fixed top-[66px] p-1 bg-body border border-outline text-white hover:bg-opacity-80 z-20 border-outline rounded-full shadow-xl backdrop-filter backdrop-blur-lg ${
						isCollapsed ? 'left-2' : 'left-0'
					} filter drop-shadow-[0_4px_6px_rgba(255,165,0,0.4)]`}
					aria-label={
						isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
					}
					animate={
						disableAllAnimations
							? undefined
							: { left: isCollapsed ? 8 : 0 }
					}
					transition={
						disableAllAnimations
							? undefined
							: { duration: 0.3, ease: customEasing }
					}
				>
					{isCollapsed ? (
						<ChevronRight size={20} aria-hidden="true" />
					) : (
						<ChevronLeft size={20} aria-hidden="true" />
					)}
				</ButtonComponent>
			</div>
			<UnifiedSettingsComponent
				variant="modal"
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>
		</>
	)
}
