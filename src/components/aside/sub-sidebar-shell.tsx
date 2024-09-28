'use client'

import { subSidebarConfig } from '@/core/config/menu-items/sidebar-menu-items'
import { useSiteSettingsStore } from '@/core/stores/store.site-settings'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubSidebarShellProps } from './types.sidear'

function SubSidebarShell({ isSubSidebarOpen }: SubSidebarShellProps) {
	const pathname = usePathname()
	const [currentConfig, setCurrentConfig] = useState<any>(null)
	const { disableSidebarAnimations } = useSiteSettingsStore()

	useEffect(() => {
		const config = subSidebarConfig[pathname]
		setCurrentConfig(config)
	}, [pathname])

	if (!currentConfig) {
		return null
	}

	const { component: SidebarContent } = currentConfig

	return (
		<AnimatePresence>
			{isSubSidebarOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={disableSidebarAnimations ? {} : { duration: 2.3, ease: 'easeIn' }}
					className="fixed z-[1] left-[var(--sidebar-width)] top-[var(--header-height)] bottom-0 bg-body border-outline-right overflow-hidden border-outline-right  w-sub-sidebar"
				>
					<SidebarContent />
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default SubSidebarShell
