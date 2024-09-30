'use client'

import Logo from '@/components/base/logo'
import { createShortcutMap, useKeyboardShortcuts } from '@/core/hooks/use-keyboard-shortcuts'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { Tabs } from './Tabs'

const fadeInVariants = {
	hidden: { opacity: 0, y: -10 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.01 } }
}

export const DropdownNavigation = () => {
	const pathname = usePathname()
	const router = useRouter()

	const shortcuts = createShortcutMap([
		['shift+l', () => router.push('/sign-in')],
		['shift+d', () => router.push('/dashboard')]
	])

	useKeyboardShortcuts(shortcuts)

	if (pathname.includes('/dashboard')) return null

	return (
		<motion.div
			className="flex items-center w-full justify-start md:justify-center z-50"
			initial="hidden"
			animate="visible"
			variants={fadeInVariants}
		>
			<span className="fixed z-50 top-6 flex items-center">
				<Logo isLink={true} />
				<Tabs />
			</span>
		</motion.div>
	)
}
