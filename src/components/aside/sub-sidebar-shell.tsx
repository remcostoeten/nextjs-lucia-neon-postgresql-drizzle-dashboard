'use client'

import { subSidebarConfig } from '@/core/config/menu-items/sidebar-menu-items'
import { customEasing } from '@/core/constants/animations'
import { useMainSidebarStore } from '@/core/stores'
import { useSiteSettingsStore } from '@/core/stores/store.site-settings'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import SubSidebarSkeletonLoader from './skeleton.sub-sidebar'
import { SubSidebarShellProps } from './types.sidear'

function SubSidebarShell({ isSubSidebarOpen }: SubSidebarShellProps) {
	const pathname = usePathname()
	const [currentConfig, setCurrentConfig] = useState<any>(null)
	const { disableAllAnimations, disableSidebarAnimations } =
		useSiteSettingsStore()
	const { isCollapsed: isMainSidebarCollapsed } = useMainSidebarStore()

	useEffect(() => {
		const config = subSidebarConfig[pathname]
		setCurrentConfig(config)
	}, [pathname])

	if (!currentConfig) {
		return null
	}

	const { component: SidebarContent } = currentConfig

	const leftPosition = isMainSidebarCollapsed ? '0' : 'var(--sidebar-width)'
	const width = isSubSidebarOpen ? '240px' : '0px'

	const sidebarVariants = {
		hidden: { width: 0, opacity: 0 },
		visible: {
			width,
			opacity: 1,
			transition: {
				width: {
					duration: 0.5,
					ease: customEasing
				},
				opacity: {
					duration: 0.5,
					delay: 0.2,
					ease: customEasing
				}
			}
		},
		exit: {
			width: 0,
			opacity: 0,
			transition: {
				width: {
					duration: 0.5,
					ease: customEasing
				},
				opacity: {
					duration: 0.2,
					ease: customEasing
				}
			}
		}
	}

	const SidebarComponent = disableAllAnimations ? 'div' : motion.div

	return (
		<>
			{isSubSidebarOpen &&
				(disableAllAnimations ? (
					<div
						style={{
							left: leftPosition,
							width: width,
							transition: disableSidebarAnimations
								? 'none'
								: `width 0.5s ${customEasing}, opacity 0.5s ${customEasing}`
						}}
						className="fixed z-[1] top-[var(--header-height)] bottom-0 bg-body border-outline-right overflow-hidden border-right"
					>
						<Suspense fallback={<SubSidebarSkeletonLoader />}>
							<SidebarContent />
						</Suspense>
					</div>
				) : (
					<AnimatePresence>
						<SidebarComponent
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={sidebarVariants}
							style={{ left: leftPosition }}
							className="fixed z-[1] top-[var(--header-height)] bottom-0 bg-body border-outline-right overflow-hidden border-right"
						>
							<Suspense fallback={<SubSidebarSkeletonLoader />}>
								<SidebarContent />
							</Suspense>
						</SidebarComponent>
					</AnimatePresence>
				))}
		</>
	)
}

export default SubSidebarShell
