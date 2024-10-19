'use client'

import {
	IconTooltips,
	links
} from '@/core/config/menu-items/dashboard-navigation-menu-items'
import Link from 'next/link'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from 'ui'
import UserDropdownButton from '../../../auth/user-dropdown-menu/user-dropdown-button'
import LogoIcon from '../../../base/logo'

export default function Navigation() {
	return (
		<nav className="text-subtitle fixed top-0 left-0 flex h-[77px] w-full items-center justify-between border-b pr-6">
			<div className="flex items-center space-x-4">
				<Link href="/" className="text-title font-semibold">
					<LogoIcon />
				</Link>
			</div>

			<div className="flex-grow flex justify-center">
				<div className="hidden sm:flex items-center space-x-4">
					{links.map(link => (
						<Link
							key={link.href}
							href={link.href}
							className="text-sm text-subtitle hover:tex	t-title trans-all"
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>

			<div className="flex items-center space-x-4 sm:mr-4">
				{IconTooltips.map(tooltip => (
					<Tooltip key={tooltip.label}>
						<TooltipTrigger asChild>
							{tooltip.isButton ? (
								<Button
									variant="ghost"
									size="icon"
									className="text-subtitle hover:text-title trans-all"
								>
									<a
										href={tooltip.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										<tooltip.icon className="h-5 w-5" />
									</a>
								</Button>
							) : (
								<a
									href={tooltip.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-text-muted hover:text-text-button"
								>
									<tooltip.icon className="h-5 w-5" />
								</a>
							)}
						</TooltipTrigger>
						<TooltipContent>
							<p>{tooltip.label}</p>
						</TooltipContent>
					</Tooltip>
				))}
			</div>

			<UserDropdownButton />
		</nav>
	)
}
