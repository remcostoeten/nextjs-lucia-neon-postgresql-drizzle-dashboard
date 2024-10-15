import React from 'react'

export default function DocsLayout({
	children
}: {
	children: React.ReactNode
}) {
	return <main className="mt-16"> {children}</main>
}
