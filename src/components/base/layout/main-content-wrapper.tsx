'use client'

import { MainSidebar } from '@/components/aside/sidebar'
import SubSidebarShell from '@/components/aside/sub-sidebar-shell'
import { useMainSidebarStore, useSubSidebarStore } from '@/core/stores'
import { ReactNode } from 'react'

type MainContentWrapperProps = {
    children?: ReactNode
}

export default function MainContentWrapper({
    children,
}: MainContentWrapperProps) {
    const {
        isCollapsed: isMainSidebarCollapsed,
        toggleCollapse: toggleMainSidebar,
    } = useMainSidebarStore()
    const { isOpen: isSubSidebarOpen, toggle: toggleSubSidebar } =
        useSubSidebarStore()

    const marginClass = isMainSidebarCollapsed
        ? ''
        : isSubSidebarOpen
            ? 'ml-[calc(var(--sidebar-width)+var(--sidebar-sub-width))]'
            : 'ml-[var(--sidebar-width)]'

    return (
        <>
            <MainSidebar
                isSubSidebarOpen={isSubSidebarOpen}
                toggleSubSidebar={toggleSubSidebar}
                isCollapsed={isMainSidebarCollapsed}
                toggleCollapse={toggleMainSidebar}
            />
            <SubSidebarShell isSubSidebarOpen={isSubSidebarOpen} />
            <main
                className={`flex-1 overflow-x-hidden overflow-y-auto p-6 transition-all duration-300 ease-in-out ${marginClass}`}
            >
                {children}
            </main>
        </>
    )
}
