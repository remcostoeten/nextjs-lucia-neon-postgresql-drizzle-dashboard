'use client'

import {
	ClientAuthSession,
	useClientAuth
} from '@/core/server/auth/client-auth-utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import UserDropdownMenu from './user-dropdown-menu'

const COLORS = {
	TEXT: 'text-neutral-500',
	TEXT_DARK: 'dark:text-neutral-400',
	TEXT_OPEN: 'text-neutral-950',
	TEXT_OPEN_DARK: 'dark:text-white',
	BG: 'bg-neutral-200/75',
	BG_DARK: 'dark:bg-[#262626]',
	BG_HOVER: 'hover:bg-neutral-200',
	BG_HOVER_DARK: 'hover:dark:bg-[#333333]',
	AVATAR_BG: 'bg-[#404040]',
	AVATAR_BG_DARK: 'dark:bg-neutral-700',
	AVATAR_TEXT: 'text-[#a3a3a3]'
}

type UserDropdownButtonProps = {
	className?: string
}

export default function UserDropdownButton({
	className = ''
}: UserDropdownButtonProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [session, setSession] = useState<ClientAuthSession | null>(null)
	const { getClientSession, clientSignOut } = useClientAuth()

	useEffect(() => {
		async function fetchSession() {
			const clientSession = await getClientSession()
			setSession(clientSession)
		}
		fetchSession()
	}, [])

	function toggleDropdown() {
		setIsOpen(!isOpen)
	}

	async function handleSignOut() {
		await clientSignOut()
		setSession({ user: null })
		setIsOpen(false)
	}

	if (session === null) {
		return (
			<div className="flex items-center justify-center">
				<Loader2 className="h-5 w-5 animate-spin text-neutral-500" />
			</div>
		)
	}

	if (!session.user) return null

	const displayName = session.user.name || session.user.email || 'Guest'
	const initials = displayName.slice(0, 2).toUpperCase()

	return (
		<div className={`relative ${className}`}>
			<button
				type="button"
				id="accountDropdown"
				aria-haspopup="menu"
				aria-expanded={isOpen}
				data-state={isOpen ? 'open' : 'closed'}
				className={`${COLORS.TEXT} ${COLORS.TEXT_DARK} focus-visible:opacity-100 data-[state=open]:!${COLORS.TEXT_OPEN} data-[state=open]:!${COLORS.TEXT_OPEN_DARK} ml-3`}
				onClick={toggleDropdown}
			>
				<div
					className={`flex items-center gap-1.5 rounded-full ${COLORS.BG} ${COLORS.BG_DARK} ${COLORS.BG_HOVER} ${COLORS.BG_HOVER_DARK} p-0.5 pr-2 transition-colors duration-200`}
				>
					<div
						className={`relative flex items-center justify-center overflow-hidden rounded-full ${COLORS.AVATAR_BG} ${COLORS.AVATAR_BG_DARK} text-sm font-semibold ${COLORS.AVATAR_TEXT} fade box-content size-7 animate-fade`}
					>
						{initials}
					</div>
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						fill="#a3a3a3"
						viewBox="0 0 256 256"
						animate={{ rotate: isOpen ? 180 : 0 }}
						transition={{ duration: 0.2 }}
					>
						<path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"></path>
					</motion.svg>
				</div>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 mt-2 origin-top-right"
					>
						<UserDropdownMenu />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
