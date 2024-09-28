import MainContentWrapper from '@/components/base/layout/main-content-wrapper'
import Navigation from '@/components/dashboard/navigation'
import { dashboardMetadata as metadata } from '@/core/config/metadata/dashboard.metadata'
import { ReactNode } from 'react'

type DashboardLayoutProps = {
	children: ReactNode
	isSubSidebarOpen: boolean
	toggleSubSidebar: () => void
	isMainSidebarCollapsed: boolean
	toggleMainSidebar: () => void
}

export { metadata }

export default async function DashboardLayout({
	children,
	isSubSidebarOpen,
	toggleSubSidebar,
	isMainSidebarCollapsed,
	toggleMainSidebar
}: DashboardLayoutProps) {
	return (
		<div className="flex flex-col h-screen bg-body w-screen">
			<Navigation />
			<div className="flex flex-1 overflow-hidden">
				<MainContentWrapper>{children}</MainContentWrapper>
				{/* <ClientWrapper
					toggleSubSidebar={toggleSubSidebar}
					mainSidebarCollapsed={isMainSidebarCollapsed}
					toggleMainSidebar={toggleMainSidebar}
				> */}
				{children}
				{/* </ClientWrapper> */}
			</div>
		</div>
	)
}
