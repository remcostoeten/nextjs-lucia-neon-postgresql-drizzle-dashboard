'use client'

import { DropdownNavigation } from '@/components/elements'
import { AnimatePresence, motion } from 'framer-motion'
import HorizontalLine from '../horizontal-line'
import Logo from './_components/logo'
import SecondaryButton from './_components/sign-in-button'
import { X, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768)
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	const toggleMenu = () => setIsOpen(!isOpen)

	const menuVariants = {
		closed: { x: '100%', opacity: 0 },
		open: { x: 0, opacity: 1 },
	}

	return (
		<div className="relative">
			<motion.nav
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex justify-between items-center w-full max-w-[1128px] mx-auto py-4 px-theme relative z-50"
			>
				<Logo />
				<div className='hidden md:block'>
					<DropdownNavigation topPosition="-1rem" />
				</div>
				{isMobile && (
					<button onClick={toggleMenu} className="md:hidden z-50">
						{isOpen ? <X /> : <Menu />}
					</button>
				)}
				<SecondaryButton href="/dashboard" className="hidden md:block">Dashboard</SecondaryButton>
			</motion.nav>
			<HorizontalLine />

			<AnimatePresence>
				{isOpen && isMobile && (
					<motion.div
						initial="closed"
						animate="open"
						exit="closed"
						variants={menuVariants}
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
						className="fixed top-0 right-0 h-full w-64 bg-background shadow-lg z-40 p-4"
					>
						<div className="flex flex-col space-y-4 mt-16">
							<DropdownNavigation topPosition="0" />
							<SecondaryButton href="/dashboard" className="w-full">Dashboard</SecondaryButton>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{isOpen && isMobile && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 bg-black bg-opacity-50 z-30"
					onClick={toggleMenu}
				/>
			)}
		</div>
	)
}
