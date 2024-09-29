'use client'

import { useState } from 'react'
export default function NotesLayout({
	children
}: {
	children: React.ReactNode
}) {
	const [searchQuery, setSearchQuery] = useState('')

	return (
		<div className="flex h-screen ">
			<div className="flex flex-col flex-1">
				<header className="flex items-center justify-between p-4 border-b">
					<h1 className="pl-2 text-2xl font-bold text-title">
						Notes
					</h1>
					{/* Todo add toggle sidebar button */}
				</header>
				<div className="flex flex-1 overflow-hidden">
					<main className="flex-1 overflow-y-auto">{children}</main>
				</div>
			</div>
		</div>
	)
}
