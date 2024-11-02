'use client'

import { Sidebar } from '@/components/sidebar/sidebar'
import { Navbar } from '@/components/site-header/navbar'
import { useLayoutStore } from '@/core/stores/store.resizable-layout'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'ui'

type ResizableLayoutProps = {
	defaultLayout: number[]
	defaultCollapsed: boolean
	children: React.ReactNode
}

export default function ResizableLayout({
	defaultLayout = [16, 84],
	defaultCollapsed = false,
	children
}: ResizableLayoutProps) {
	const { layout, isCollapsed, setLayout, setCollapsed } = useLayoutStore()
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return null // or a loading state
	}

	return (
		<ResizablePanelGroup
			direction="horizontal"
			onLayout={(sizes) => {
				setLayout(sizes)
			}}
		>
			<ResizablePanel
				defaultSize={layout[0] ?? defaultLayout[0]}
				collapsedSize={3}
				collapsible={true}
				minSize={14}
				maxSize={20}
				onExpand={() => {
					setCollapsed(false)
				}}
				onCollapse={() => {
					setCollapsed(true)
				}}
				className={cn(
					'hidden lg:block',
					isCollapsed &&
						'min-w-14 !overflow-visible transition-all duration-300 ease-in-out'
				)}
			>
				<Sidebar isCollapsed={isCollapsed} />
			</ResizablePanel>

			<ResizableHandle withHandle className="hidden lg:flex" />

			<ResizablePanel defaultSize={layout[1] ?? defaultLayout[1]}>
				<Navbar />
				<main className="overflow-auto">{children}</main>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
