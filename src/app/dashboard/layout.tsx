'use client'

import MainSidebar from '@/components/aside/sidebar'
import SidebarSkeletonLoader from '@/components/aside/skeleton.sidebbar'
import SubSidebarShell from '@/components/aside/sub-sidebar-shell'
import MainContentWrapper from '@/components/base/layout/main-content-wrapper'
import Navigation from '@/components/dashboard/navigation.client'
import { useMainSidebarStore, useSubSidebarStore } from '@/core/stores'
import { ReactNode, Suspense } from 'react'

type DashboardLayoutProps = {
	children: ReactNode
	isSubSidebarOpen: boolean
	toggleSubSidebar: () => void
	isMainSidebarCollapsed: boolean
	toggleMainSidebar: () => void
	userName: string
	userEmail: string
}

export default function ClientWrapper({
	children,
	userName,
	userEmail
}: DashboardLayoutProps) {
	const {
		isCollapsed: isMainSidebarCollapsed,
		toggleCollapse: toggleMainSidebar
	} = useMainSidebarStore()
	const { isOpen: isSubSidebarOpen, toggle: toggleSubSidebar } =
		useSubSidebarStore()

	return (
		<>
			<Navigation userName={userName} userEmail={userEmail} />
			<Suspense fallback={<SidebarSkeletonLoader />}>
				<MainSidebar
					isSubSidebarOpen={isSubSidebarOpen}
					toggleSubSidebar={toggleSubSidebar}
					isCollapsed={isMainSidebarCollapsed}
					toggleCollapse={toggleMainSidebar}
				/>
			</Suspense>
			<SubSidebarShell isSubSidebarOpen={isSubSidebarOpen} />
			<MainContentWrapper>{children}</MainContentWrapper>
		</>
	)
}
