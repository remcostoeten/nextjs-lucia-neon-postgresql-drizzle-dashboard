'use client'

import { Flex } from '@/components/atoms'
import ModeToggle from '@/components/ui/theme-toggle'
import { useState } from 'react'
import MenuItem from './user-dropdown-menu-item'

type MenuItemType = {
	label: string
	link?: string
	isSignOut?: boolean
}

const MENU_ITEMS: MenuItemType[] = [
	{ label: 'Changelog', link: '/changelog' },
	{ label: 'Homepage', link: '/' },
	{ label: '𝕏', link: '#' }
]

const COLORS = {
	TEXT: 'dark:text-title text-black',
	BACKGROUND: 'dark:bg-body bg-zinc-300',
	BORDER: 'border-outline'
}

type UserDropdownMenuProps = {
	onSignOut: () => Promise<void>
}

export default function UserDropdownMenu({ onSignOut }: UserDropdownMenuProps) {
	const [isSigningOut, setIsSigningOut] = useState(false)

	const handleSignOut = async () => {
		setIsSigningOut(true)
		try {
			await onSignOut()
		} catch (error) {
			console.error('Error signing out:', error)
		} finally {
			setIsSigningOut(false)
		}
	}

	return (
		<nav
			className={`flex overflow-hidden flex-col py-5 w-full rounded-xl border border-solid shadow-xl ${COLORS.BACKGROUND} ${COLORS.BORDER} max-w-[250px] min-w-[250px] z-50 !pb-[12px]`}
		>
			<Flex dir="col" align="start" gap="4" className="ml-2">
				<h2
					className={`self-start ml-4 text-lg leading-5 ${COLORS.TEXT}`}
				>
					Dashboard
				</h2>
				<ModeToggle />
			</Flex>

			<hr className={`flex shrink-0 mt-3.5 h-px ${COLORS.BORDER}`} />
			<ul
				className={`flex flex-col mt-1.5 w-full text-lg leading-5 ${COLORS.TEXT}`}
			>
				{MENU_ITEMS.map((item, index) => (
					<MenuItem key={index} {...item} />
				))}
				<hr />
				<li
					className="flex-1 shrink self-stretch pt-3.5 pr-4 pb-3 pl-4 w-full whitespace-nowrap rounded-lg hover:bg-card transition duration-200 ease-in-out cursor-pointer"
					onClick={handleSignOut}
				>
					<span className="text-error">
						{isSigningOut ? 'Signing out...' : 'Sign out'}
					</span>
				</li>
			</ul>
		</nav>
	)
}
