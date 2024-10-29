'use client'
import { cn } from 'cn'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import React from 'react'

interface GradualSpacingProps {
	text: string
	duration?: number
	delayMultiple?: number
	framerProps?: Variants
	className?: string
	textClassName?: string
	visiblity?: boolean
	breakAfter?: string
}

export default function GradualSpacing({
	text,
	textClassName = 'justify-start items-center',
	duration = 0.5,
	delayMultiple = 0.04,
	framerProps = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0 }
	},
	className,
	visiblity,
	breakAfter
}: GradualSpacingProps) {
	const words = text.split(' ')
	return (
		<div className={cn('flex flex-wrap', textClassName)}>
			<AnimatePresence>
				{words.map((word, i) => {
					const shouldBreak =
						breakAfter &&
						words
							.slice(0, i + 1)
							.join(' ')
							.endsWith(breakAfter)
					return (
						<React.Fragment key={i}>
							<motion.h1
								initial="hidden"
								animate={visiblity ? 'visible' : 'hidden'}
								exit="hidden"
								variants={framerProps}
								transition={{
									duration,
									delay: i * delayMultiple
								}}
								className={cn(
									'title drop-shadow-sm',
									className
								)}
							>
								{word}&nbsp;
							</motion.h1>
							{shouldBreak && <br />}
						</React.Fragment>
					)
				})}
			</AnimatePresence>
		</div>
	)
}
