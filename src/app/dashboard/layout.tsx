import type { PropsWithChildren } from 'react'

export default async function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex min-h-screen flex-col">
			<main className="flex-1">{children}</main>
		</div>
	)
}
