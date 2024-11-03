'use client'

import { useEffect, useState } from 'react'
import {
	AnimatePresence,
	cubicBezier,
	HTMLMotionProps,
	motion
} from 'framer-motion'

import { cn } from '@/lib/utils'

interface WordRotateProps {
	words: string[]
	duration?: number
	framerProps?: HTMLMotionProps<'h1'>
	className?: string
}

export function WordRotate({
	words,
	duration = 5555,
	framerProps = {
		initial: { opacity: 0, y: -50 },
		animate: { opacity: 1, y: 0, scale: 1 },
		exit: { opacity: 0, y: 50, scale: 0.9 },
		transition: { duration: 0.25, ease: cubicBezier(0.4, 0, 0.2, 1) }
	},
	className
}: WordRotateProps) {
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % words.length)
		}, duration)

		// Clean up interval on unmount
		return () => clearInterval(interval)
	}, [words, duration])

	return (
		<div className="overflow-hidden py-2">
			<AnimatePresence mode="wait">
				<motion.h1
					key={words[index]}
					className={cn(className)}
					{...framerProps}
				>
					{words[index]}
				</motion.h1>
			</AnimatePresence>
		</div>
	)
}
