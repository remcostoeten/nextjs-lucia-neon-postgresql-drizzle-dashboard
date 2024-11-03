'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useAppState } from '@/core/hooks/use-app-state'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

export function Breadcrumbs() {
	const pathname = usePathname()
	const { workspace, folders, files } = useAppState()

	// Don't show breadcrumbs on the root dashboard
	if (pathname === '/dashboard') return null

	// Remove empty segments and get path parts
	const segments = pathname
		.split('/')
		.filter(Boolean)
		.map((segment, index, array) => {
			// Handle dashboard segment
			if (segment === 'dashboard') {
				return {
					name: 'Dashboard',
					path: '/dashboard',
					icon: null
				}
			}

			// Handle workspace segment
			if (index === 1 && workspace) {
				return {
					name: workspace.title,
					path: `/dashboard/${workspace.slug}`,
					icon: workspace.iconId
				}
			}

			// Handle folder segment
			const folder = folders?.find((f) => f.id === segment)
			if (folder) {
				return {
					name: folder.title,
					path: `/dashboard/${workspace?.slug}/${folder.id}`,
					icon: folder.iconId
				}
			}

			// Handle file segment
			const file = files?.find((f) => f.id === segment)
			if (file) {
				return {
					name: file.title,
					path: `/dashboard/${workspace?.slug}/${file.id}`,
					icon: file.iconId
				}
			}

			return {
				name: segment,
				path: `/${array.slice(0, index + 1).join('/')}`,
				icon: null
			}
		})

	return (
		<nav
			aria-label="Breadcrumb"
			className="flex items-center space-x-1 text-sm text-muted-foreground py-3 border-b"
		>
			<Button
				asChild
				variant="ghost"
				size="icon"
				className="size-8 hover:text-foreground"
			>
				<Link href="/dashboard">
					<Home className="size-4" />
				</Link>
			</Button>

			{segments.map((segment, index) => {
				const isLast = index === segments.length - 1

				return (
					<div key={segment.path} className="flex items-center">
						<ChevronRight className="mx-1 size-4" />
						<Button
							asChild={!isLast}
							variant="ghost"
							className={cn(
								'flex items-center gap-1.5 hover:text-foreground',
								isLast && 'cursor-default hover:bg-transparent'
							)}
						>
							{isLast ? (
								<div className="flex items-center gap-1.5">
									{segment.icon && (
										<span>{segment.icon}</span>
									)}
									<span className="font-medium text-foreground">
										{segment.name}
									</span>
								</div>
							) : (
								<Link
									href={segment.path}
									className="flex items-center gap-1.5"
								>
									{segment.icon && (
										<span>{segment.icon}</span>
									)}
									<span>{segment.name}</span>
								</Link>
							)}
						</Button>
					</div>
				)
			})}
		</nav>
	)
}
