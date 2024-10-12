'use client'

import { motion } from 'framer-motion'
import HeroBadge from '../../navigation/_components/hero-badge'
import { Description } from './Description'
import { Header } from './Header'

type ZenWealthProps = {
	title: string
	subtitle: string
	description: string[]
}

export function ZenWealth({ title, subtitle, description }: ZenWealthProps) {
	return (
		<main className="flex flex-col gap-3 max-w-[610px]">
			<HeroBadge />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<Header title={title} subtitle={subtitle} />
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
			>
				<Description text={description} />
			</motion.div>
		</main>
	)
}
