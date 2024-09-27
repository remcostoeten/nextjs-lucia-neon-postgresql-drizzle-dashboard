import Navigation from '@/components/dashboard/navigation'
import { dashboardMetadata as metadata } from '@/core/config/metadata/dashboard.metadata'
import { ReactNode } from 'react'
import ClientWrapper from './layout.client'

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
				<ClientWrapper
					isSubSidebarOpen={isSubSidebarOpen}
					toggleSubSidebar={toggleSubSidebar}
					isMainSidebarCollapsed={isMainSidebarCollapsed}
					toggleMainSidebar={toggleMainSidebar}
				>
					{children}
				</ClientWrapper>
			</div>
		</div>
	)
}
