'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
	const pathname = usePathname()
	const segments = pathname.split('/').filter(Boolean)

	return (
		<nav
			aria-label="Breadcrumb"
			className="flex items-center space-x-2 text-sm text-muted-foreground"
		>
			<Link
				href="/dashboard"
				className="flex items-center hover:text-foreground transition-colors"
			>
				<Home className="h-4 w-4" />
			</Link>

			{segments.map((segment, index) => {
				const path = `/${segments.slice(0, index + 1).join('/')}`
				const isLast = index === segments.length - 1

				return (
					<div key={path} className="flex items-center">
						<ChevronRight className="h-4 w-4 mx-1" />
						{isLast ?
							<span className="capitalize text-foreground">
								{segment.replace(/-/g, ' ')}
							</span>
						:	<Link
								href={path}
								className="capitalize hover:text-foreground transition-colors"
							>
								{segment.replace(/-/g, ' ')}
							</Link>
						}
					</div>
				)
			})}
		</nav>
	)
}
