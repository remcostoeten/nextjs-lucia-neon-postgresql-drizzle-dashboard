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
			: 'hidden'
		: hasSubSidebar && isSubSidebarOpen
			? 'ml-[calc(var(--sidebar-width)+var(--sidebar-sub-width))] hidden'
			: 'ml-[var(--sidebar-width)] hidden'

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
				className={`flex-1 overflow-x-hidden overflow-y-auto  transition-all duration-300 ease-in-out ${marginClass}`}
			>
				{children}
			</main>
		</>
	)
}
