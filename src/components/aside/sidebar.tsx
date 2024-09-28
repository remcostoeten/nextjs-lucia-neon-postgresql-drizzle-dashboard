import { sidebarItems } from '@/core/config/menu-items/sidebar-menu-items'
import { useSiteSettingsStore } from '@/core/stores'
import { AnimatePresence, motion } from 'framer-motion'
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
import { toast } from 'sonner'
import SiteSettingsMenu from './site-settings-menu'
import { MainSidebarProps, SidebarIconProps } from './types.sidebar'

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
	const { disableAllAnimations, disableSidebarAnimations } =
		useSiteSettingsStore()

	const MotionComponent =
		disableAllAnimations || disableSidebarAnimations ? 'div' : motion.div

	return (
		<MotionComponent
			className={`relative z-50 flex items-center justify-center size-10 mb-2 rounded-md transition-colors duration-200 border-r-outline ${
				isActive
					? 'bg-body border-outline text-white'
					: '!border-transparent text-zinc-400 hover:text-title hover:bg-body hover:border-outline'
			}`}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			whileHover={
				disableAllAnimations || disableSidebarAnimations
					? undefined
					: { scale: 1.1 }
			}
			whileTap={
				disableAllAnimations || disableSidebarAnimations
					? undefined
					: { scale: 0.95 }
			}
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
			<AnimatePresence>
				{isHovered &&
					!disableAllAnimations &&
					!disableSidebarAnimations && (
						<motion.div
							className="absolute left-full -z-10 ml-2 px-2 py-1 bg-body border border-outline text-white text-xs font-medium rounded-md whitespace-nowrap !pointer-events-none"
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -10 }}
							transition={{ duration: 0.2 }}
						>
							{item.name}
						</motion.div>
					)}
			</AnimatePresence>
		</MotionComponent>
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
	const { disableAllAnimations, disableSidebarAnimations } =
		useSiteSettingsStore()
	const [isContentVisible, setIsContentVisible] = useState(!isCollapsed)

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (isCollapsed) {
			timer = setTimeout(() => {
				setIsContentVisible(false)
			}, 200) // Delay hiding content by 200ms
		} else {
			setIsContentVisible(true)
		}
		return () => clearTimeout(timer)
	}, [isCollapsed])

	const handleSettingsChange = (setting: string, value: boolean) => {
		if (setting === 'disableAllAnimations') {
			toast.success(`All animations ${value ? 'disabled' : 'enabled'}`)
		} else if (setting === 'disableSidebarAnimations') {
			toast.success(
				`Sidebar animations ${value ? 'disabled' : 'enabled'}`
			)
		}
	}

	const MotionAside =
		disableAllAnimations || disableSidebarAnimations
			? 'aside'
			: motion.aside
	const MotionDiv =
		disableAllAnimations || disableSidebarAnimations ? 'div' : motion.div
	const MotionNav =
		disableAllAnimations || disableSidebarAnimations ? 'nav' : motion.nav
	const MotionButton =
		disableAllAnimations || disableSidebarAnimations
			? 'button'
			: motion.button

	return (
		<>
			<div className="relative">
				<MotionAside
					initial={false}
					animate={{
						width: isCollapsed ? 0 : 'var(--sidebar-width)',
						transition: { duration: 0.3, ease: 'easeInOut' }
					}}
					className="fixed left-0 top-[var(--header-height)] w-sidebar bottom-0 flex items-center transition-all duration-300 ease-in-out z-10 overflow-hidden"
				>
					<AnimatePresence>
						{isContentVisible && (
							<MotionDiv
								initial={{ opacity: 1 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="h-full bg-body border-r-outline flex flex-col items-center py-4 z-40 transition-all duration-300 ease-in-out w-full"
							>
								<MotionNav
									initial={
										disableAllAnimations ||
										disableSidebarAnimations
											? false
											: { opacity: 0, y: 20 }
									}
									animate={
										disableAllAnimations ||
										disableSidebarAnimations
											? undefined
											: { opacity: 1, y: 0 }
									}
									transition={{ duration: 0.3, delay: 0.2 }}
									className="flex gap-2 flex-col items-center flex-grow"
								>
									{sidebarItems.map((item, index) => (
										<MotionDiv
											key={item.path}
											initial={
												disableAllAnimations ||
												disableSidebarAnimations
													? false
													: { opacity: 0, x: -20 }
											}
											animate={
												disableAllAnimations ||
												disableSidebarAnimations
													? undefined
													: { opacity: 1, x: 0 }
											}
											transition={{
												duration: 0.3,
												delay: 0.1 * (index + 1)
											}}
										>
											<Link href={item.path}>
												<SidebarIcon
													item={item}
													isActive={isActivePath(
														item.path
													)}
												/>
											</Link>
										</MotionDiv>
									))}
								</MotionNav>
								<MotionDiv
									initial={
										disableAllAnimations ||
										disableSidebarAnimations
											? false
											: { opacity: 0, y: 20 }
									}
									animate={
										disableAllAnimations ||
										disableSidebarAnimations
											? undefined
											: { opacity: 1, y: 0 }
									}
									transition={{ duration: 0.3, delay: 0.4 }}
									className="flex flex-col items-center mt-auto"
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
									<button
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
									</button>
								</MotionDiv>
							</MotionDiv>
						)}
					</AnimatePresence>
				</MotionAside>
				<MotionButton
					initial={
						disableAllAnimations || disableSidebarAnimations
							? false
							: { opacity: 0, x: 20 }
					}
					animate={
						disableAllAnimations || disableSidebarAnimations
							? undefined
							: { opacity: 1, x: 0 }
					}
					transition={{ duration: 0.3, delay: 0.5 }}
					onClick={toggleCollapse}
					className={`fixed top-[66px] p-1 bg-body border border-outline text-white hover:bg-opacity-80 z-20 border-outline rounded-full shadow-xl backdrop-filter backdrop-blur-lg ${isCollapsed ? 'left-2' : 'left-0'} filter drop-shadow-[0_4px_6px_rgba(255,165,0,0.4)]`}
					aria-label={
						isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
					}
				>
					{isCollapsed ? (
						<ChevronRight size={20} aria-hidden="true" />
					) : (
						<ChevronLeft size={20} aria-hidden="true" />
					)}
				</MotionButton>
			</div>
			<SiteSettingsMenu
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
				onSettingChange={handleSettingsChange}
			/>
		</>
	)
}
