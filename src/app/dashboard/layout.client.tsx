'use client'

import MainSidebar from '@/components/aside/sidebar'
import SubSidebarShell from '@/components/aside/sub-sidebar-shell'
import MainContentWrapper from '@/components/base/layout/main-content-wrapper'
import { useMainSidebarStore, useSubSidebarStore } from '@/core/stores'
import { ReactNode } from 'react'

type ClientWrapperProps = {
	children?: ReactNode
	isSubSidebarOpen: boolean
	toggleSubSidebar: () => void
	isMainSidebarCollapsed: boolean
	toggleMainSidebar: () => void
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
			<MainSidebar
				isSubSidebarOpen={isSubSidebarOpen}
				toggleSubSidebar={toggleSubSidebar}
				isCollapsed={isMainSidebarCollapsed}
				toggleCollapse={toggleMainSidebar}
			/>
			<SubSidebarShell isSubSidebarOpen={isSubSidebarOpen} />
			<MainContentWrapper>{children}</MainContentWrapper>
		</>
	)
}
