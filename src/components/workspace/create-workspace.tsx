'use client'

import { Logo } from '@/components/brand/logo'
import Link from 'next/link'
import { Button } from 'ui'

export function CreateWorkspace() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="flex items-center justify-between border-b px-6 py-4">
				<div className="flex items-center gap-4">
					<Logo className="h-8 w-8" />
					<h1 className="text-xl font-semibold">Create Workspace</h1>
				</div>
				<Link href="/">
					<Button variant="ghost">← Back to Home</Button>
				</Link>
			</header>

			<main className="flex-1 p-6">
				<div className="mx-auto max-w-2xl space-y-8">
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">
							What is a Workspace?
						</h2>
						<div className="space-y-4 text-muted-foreground">
							<p>
								A workspace is your personal or team environment
								where you can:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Organize and manage your projects</li>
								<li>Collaborate with team members</li>
								<li>Store and share resources</li>
								<li>Track progress and manage tasks</li>
								<li>
									Customize settings for your specific needs
								</li>
							</ul>
							<p>
								Think of it as your digital headquarters - a
								centralized space where all your work comes
								together.
							</p>
						</div>
					</div>

					{/* Your existing workspace creation form */}
				</div>
			</main>
		</div>
	)
}
