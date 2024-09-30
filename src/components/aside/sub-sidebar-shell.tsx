import { subSidebarConfig } from '@/core/config/menu-items/sidebar-menu-items'
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
	const { disableSidebarAnimations } = useSiteSettingsStore()
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

	return (
		<AnimatePresence>
			{isSubSidebarOpen && (
				<motion.div
					initial={{ width: 0 }}
					animate={{ width, left: leftPosition }}
					exit={{ width: 0 }}
					transition={
						disableSidebarAnimations ? {} : { duration: 0.3 }
					}
					className="fixed z-[1] top-[var(--header-height)] bottom-0 bg-body border-outline-right overflow-hidden border-right"
				>
					<Suspense fallback={<SubSidebarSkeletonLoader />}>
						<SidebarContent />
					</Suspense>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default SubSidebarShell
