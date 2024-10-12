'use client'

import { DropdownNavigation } from '@/components/elements'
import { motion } from 'framer-motion'
import HorizontalLine from '../horizontal-line'
import Logo from './_components/logo'
import SecondaryButton from './_components/sign-in-button'

export default function Navigation() {
	return (
		<div className="relative">
			<motion.nav
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex justify-between items-center w-full max-w-[1128px] mx-auto py-4 px-theme relative z-50"
			>
				<Logo />
				<DropdownNavigation topPosition="-1rem" />
				<SecondaryButton href="/dashboard">Dashboard</SecondaryButton>
			</motion.nav>
			<HorizontalLine />
		</div>
	)
}
