'use client'

import SidebarSkeletonLoader from '@/components/aside/skeleton.sidebbar'
import SubSidebarShell from '@/components/aside/sub-sidebar-shell'
import MainContentWrapper from '@/components/base/layout/main-content-wrapper'
import { useMainSidebarStore, useSubSidebarStore } from '@/core/stores'
import { ReactNode, Suspense, lazy } from 'react'
const MainSidebar = lazy(() => import('@/components/aside/sidebar'))

type ClientWrapperProps = {
	children?: ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
	const {
		isCollapsed: isMainSidebarCollapsed,
		toggleCollapse: toggleMainSidebar
	} = useMainSidebarStore()
	const { isOpen: isSubSidebarOpen, toggle: toggleSubSidebar } =
		useSubSidebarStore()

	return (
		<>
			<Suspense fallback={<SidebarSkeletonLoader />}>
				<MainSidebar
					isSubSidebarOpen={isSubSidebarOpen}
					toggleSubSidebar={toggleSubSidebar}
					isCollapsed={isMainSidebarCollapsed}
					toggleCollapse={toggleMainSidebar}
				/>
			</Suspense>
			<SubSidebarShell
				isSubSidebarOpen={isSubSidebarOpen}
			/>
			<MainContentWrapper>{children}</MainContentWrapper>
		</>
	)
}
