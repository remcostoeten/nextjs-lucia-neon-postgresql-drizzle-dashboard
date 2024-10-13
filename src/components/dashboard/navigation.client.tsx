'use client'

import {
	IconTooltips,
	links
} from '@/core/config/menu-items/dashboard-navigation-menu-items'
import { ChevronDown, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
	Avatar,
	AvatarFallback,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from 'ui'
import SignOutBtn from '../auth/sign-out-button'
import LogoIcon from '../base/logo'
import ThemeSwitcherButton from '../elements/dark-light-toggle'

type NavigationProps = {
	userEmail: string
}

export default function Navigation({ userEmail }: NavigationProps) {
	const [theme, setTheme] = useState<'light' | 'dark'>('dark')
	const [isMenuOpen, setMenuOpen] = useState(false)
	const router = useRouter()

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	const handleMenuToggle = () => {
		setMenuOpen(!isMenuOpen)
	}

	return (
		<nav className="text-subtitle fixed top-0 left-0 flex h-[77px] w-full items-center justify-between border-b pr-6F">
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
							className="text-sm text-subtitle hover:text-title trans-all"
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
									<tooltip.icon className="h-5 w-5" />
								</Button>
							) : (
								<Link
									href={tooltip.href}
									className="text-text-muted hover:text-text-button"
								>
									<tooltip.icon className="h-5 w-5" />
								</Link>
							)}
						</TooltipTrigger>
						<TooltipContent>
							<p>{tooltip.label}</p>
						</TooltipContent>
					</Tooltip>
				))}
			</div>

			<DropdownMenu onOpenChange={handleMenuToggle}>
				<DropdownMenuTrigger asChild>
					<button>
						<div className="bg-neutral-900 flex items-center gap-1.5 transition-all duration-150 pl-0.5 pr-2 py-0.5 rounded-full">
							<Avatar className="h-8 w-8 bg-avatar text-title">
								<AvatarFallback>
									{userEmail
										? userEmail.slice(0, 2).toUpperCase()
										: 'U'}
								</AvatarFallback>
							</Avatar>
							<ChevronDown className="h-3 w-3" />
						</div>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" open={isMenuOpen}>
					<DropdownMenuLabel>
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">
								{userEmail}
							</p>
							<p className="text-xs leading-none text-neutral-400">
								User
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Link
							href="/account"
							className="flex w-full items-center"
						>
							<Settings className="mr-2 h-4 w-4" />
							<span>Account Settings</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-between w-full">
							<ThemeSwitcherButton />
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<SignOutBtn />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	)
}
