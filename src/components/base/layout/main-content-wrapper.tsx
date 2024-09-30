'use client'

import MainSidebar from '@/components/aside/sidebar'
import SubSidebarShell from '@/components/aside/sub-sidebar-shell'
import Navbar from '@/components/Navbar'
import { subSidebarConfig } from '@/core/config/menu-items/sidebar-menu-items'
import { useMainSidebarStore, useSubSidebarStore } from '@/core/stores'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

type MainContentWrapperProps = {
	children?: ReactNode
}

export default function MainContentWrapper({
	children
}: MainContentWrapperProps) {
	const pathname = usePathname()
	const [hasSubSidebar, setHasSubSidebar] = useState(false)
	const {
		isCollapsed: isMainSidebarCollapsed,
		toggleCollapse: toggleMainSidebar
	} = useMainSidebarStore()
	const { isOpen: isSubSidebarOpen, toggle: toggleSubSidebar } =
		useSubSidebarStore()

	useEffect(() => {
		setHasSubSidebar(!!subSidebarConfig[pathname])
	}, [pathname])

	const marginClass = isMainSidebarCollapsed
		? hasSubSidebar && isSubSidebarOpen
			? 'ml-[var(--sidebar-sub-width)]'
			: 'ml-0'
		: hasSubSidebar && isSubSidebarOpen
			? 'ml-[calc(var(--sidebar-width)+var(--sidebar-sub-width))]'
			: 'ml-[var(--sidebar-width)]'

	return (
		<>
			<Navbar />
			<MainSidebar
				isSubSidebarOpen={isSubSidebarOpen}
				toggleSubSidebar={toggleSubSidebar}
				isCollapsed={isMainSidebarCollapsed}
				toggleCollapse={toggleMainSidebar}
			/>
			{hasSubSidebar && (
				<SubSidebarShell isSubSidebarOpen={isSubSidebarOpen} />
			)}
			<main
				className={`border-left pl-6 pt-4 mt-[77px] flex-1 overflow-x-hidden overflow-y-auto  transition-all duration-300 ease-in-out ${marginClass}`}
			>
				{children}
			</main>
		</>
	)
}
