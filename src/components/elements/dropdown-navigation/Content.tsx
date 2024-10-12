import { motion } from 'framer-motion'
import React from 'react'
import { Bridge } from './Bridge'
import { Triangle } from './Triangle'
import { TABS } from './constants'

interface ContentProps {
	selected: number | null
	dir: null | 'l' | 'r'
}

export const Content: React.FC<ContentProps> = ({ selected, dir }) => {
	return (
		<motion.div
			id="overlay-content"
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 8 }}
			className="border absolute left-0 z-50 top-[calc(100%_+_24px)] w-96 rounded-lg border-outline bg-gradient-to-b from-base via-base  p-4"
		>
			<Bridge />
			<Triangle selected={selected} />
			{TABS.map(t => (
				<div className="overflow-hidden" key={t.id}>
					{selected === t.id && (
						<motion.div
							initial={{
								opacity: 0,
								x: dir === 'l' ? 100 : dir === 'r' ? -100 : 0
							}}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.25, ease: 'easeInOut' }}
						>
							<t.Component />
						</motion.div>
					)}
				</div>
			))}
		</motion.div>
	)
}
