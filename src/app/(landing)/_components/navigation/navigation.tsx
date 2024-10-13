'use client'

import { Flex } from '@/components/atoms'
import { DropdownNavigation } from '@/components/elements'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import HorizontalLine from '../horizontal-line'
import Logo from './_components/logo'
import SecondaryButton from './_components/sign-in-button'

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
		open: { x: 0, opacity: 1 }
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
				<div className="hidden md:block">
					<DropdownNavigation topPosition="-1rem" />
				</div>
				<Flex gap='2' align='center'>
					<SecondaryButton href="/dashboard">Dashboard</SecondaryButton>
					{isMobile && (
						<motion.button
							className="flex flex-col justify-center items-center self-stretch p-2 my-auto rounded-xl shadow-sm !m-0 border h-[50px] w-[50px] hover:fill-white transition-all duration-300 hover:text-red-400 hover:bg-card hover:scale-105 focus:scale-105 offcanvas-menu translate-y-1"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							onClick={toggleMenu}
						>
							<div className="flex flex-col w-full">
								<div className="flex items-start w-full">
									<svg
										clip-rule="evenodd"
										fill-rule="evenodd"
										stroke-linejoin="round"
										fill="#a2a3a2"
										stroke-miterlimit="2"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="m21 15.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
											fill-rule="nonzero"
										/>
									</svg>
								</div>
							</div>
						</motion.button>
						// <button onClick={toggleMenu} className="md:hidden z-50">
						// 	{isOpen ? <X /> : <Menu />}
						// </button>
					)}
				</Flex>
			</motion.nav>
			<HorizontalLine />

			<AnimatePresence>
				{isOpen && isMobile && (
					<motion.div
						initial="closed"
						animate="open"
						exit="closed"
						variants={menuVariants}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 30
						}}
						className="fixed top-0 right-0 h-full w-64 bg-background shadow-lg z-40 p-4"
					>
						<div className="flex flex-col space-y-4 mt-16">
							<DropdownNavigation topPosition="0" />
							<SecondaryButton
								href="/dashboard"
								className="w-full"
							>
								Dashboard
							</SecondaryButton>
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
