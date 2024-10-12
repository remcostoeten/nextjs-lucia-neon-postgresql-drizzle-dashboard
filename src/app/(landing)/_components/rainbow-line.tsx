// @ts-nocheck
'use client'

import { cn } from 'cn'
import {
	AnimatePresence,
	cubicBezier,
	motion,
	MotionValue,
	useMotionValue,
	useTransform
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
type ColorVariant = 'default' | 'blue' | 'green' | 'red' | 'purple'

type RainbowLineProps = {
	variant?: ColorVariant
	className?: string
	width?: string | number
	disableAnimation?: boolean
	bottomOffset?: number
} & React.HTMLAttributes<HTMLDivElement>

const colorVariants: Record<ColorVariant, { from: string; to: string }> = {
	default: { from: '#FCE48F', to: '#BB8FFC' },
	blue: { from: '#60A5FA', to: '#3B82F6' },
	green: { from: '#34D399', to: '#10B981' },
	red: { from: '#F87171', to: '#EF4444' },
	purple: { from: '#A78BFA', to: '#8B5CF6' }
}

const smoothStep = (min: number, max: number, value: number) => {
	const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
	return x * x * (3 - 2 * x)
}

export default function RainbowLine({
	variant = 'default',
	className,
	width = '100%',
	disableAnimation = false,
	bottomOffset = 28,
	...props
}: RainbowLineProps) {
	const { from, to } = colorVariants[variant]
	const ref = useRef<HTMLDivElement>(null)
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)

	const distance = useMotionValue(0)
	const angle = useMotionValue(0)

	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		if (disableAnimation) return

		const updateMousePosition = (e: MouseEvent) => {
			if (!ref.current) return
			const rect = ref.current.getBoundingClientRect()
			const centerX = rect.left + rect.width / 2
			const centerY = rect.bottom

			mouseX.set(e.clientX)
			mouseY.set(e.clientY)

			const dx = e.clientX - centerX
			const dy = Math.max(0, e.clientY - centerY) // Ensure dy is never negative

			const rawDistance = Math.sqrt(dx * dx + dy * dy)
			const easedDistance = smoothStep(0, 150, rawDistance) * 100

			distance.set(easedDistance)
			angle.set(Math.atan2(dy, dx))
		}

		window.addEventListener('mousemove', updateMousePosition)
		setIsVisible(true)
		return () =>
			window.removeEventListener('mousemove', updateMousePosition)
	}, [mouseX, mouseY, distance, angle, disableAnimation])

	const glowSize = useTransform(distance, [0, 100], [80, 33])
	const glowX = useTransform(
		[distance, angle] as [MotionValue<number>, MotionValue<number>],
		([dist, ang]) => Math.cos(ang) * dist * 0.2
	)
	const glowY = useTransform(
		[distance, angle] as [MotionValue<number>, MotionValue<number>],
		([dist, ang]) => Math.max(0, Math.sin(ang) * dist * 0.2) // Ensure glowY is never negative
	)

	const boxShadow = useTransform(
		[glowSize, glowX, glowY] as [
			MotionValue<number>,
			MotionValue<number>,
			MotionValue<number>
		],
		([size, x, y]) => `
            ${x}px ${y}px ${size}px ${from}99,
            ${x * 0.6}px ${y * 0.6}px ${size * 0.6}px ${to}a3,
            ${x * 0.4}px ${y * 0.4}px ${size * 0.4}px ${from}7a,
            ${x * 0.3}px ${y * 0.3}px ${size * 0.3}px ${to}8f,
            ${x * 0.2}px ${y * 0.2}px ${size * 0.2}px ${from}4d,
            ${x * 0.1}px ${y * 0.1}px ${size * 0.1}px ${to}40
        `
	)

	const Container = disableAnimation ? 'div' : motion.div
	const Line = disableAnimation ? 'div' : motion.div

	return (
		<AnimatePresence>
			{(isVisible || disableAnimation) && (
				<Container
					ref={ref}
					className={cn('relative h-0.5', className)}
					style={{ width }}
					initial={
						disableAnimation ? undefined : { opacity: 0, width: 0 }
					}
					animate={
						disableAnimation
							? undefined
							: { opacity: 1, width: '100%' }
					}
					exit={
						disableAnimation ? undefined : { opacity: 0, width: 0 }
					}
					transition={
						disableAnimation
							? undefined
							: {
									duration: 1.5,
									ease: cubicBezier(0.13, 0.97, 0.54, 0.46)
								}
					}
					{...props}
				>
					<Line
						className="absolute w-full h-0.5 left-0"
						style={{
							backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
							boxShadow: disableAnimation ? undefined : boxShadow,
							bottom: `-${bottomOffset}px`
						}}
					/>
				</Container>
			)}
		</AnimatePresence>
	)
}
