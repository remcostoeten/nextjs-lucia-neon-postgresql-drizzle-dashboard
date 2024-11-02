'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from 'cn'
import {
	AnimatePresence,
	cubicBezier,
	motion,
	useMotionValue,
	useTransform
} from 'framer-motion'

import type { MotionValue } from 'framer-motion'

type ColorVariant = 'default' | 'blue' | 'green' | 'red' | 'purple'

type RainbowLineProps = {
	variant?: ColorVariant
	className?: string
	width?: string | number
	disableAnimation?: boolean
	bottomOffset?: number
	small?: boolean
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
	small = false,
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
			const centerY = small ? rect.top : rect.bottom

			mouseX.set(e.clientX)
			mouseY.set(e.clientY)

			const dx = e.clientX - centerX
			const dy =
				small ? e.clientY - centerY : Math.max(0, e.clientY - centerY)

			const rawDistance = Math.sqrt(dx * dx + dy * dy)
			const easedDistance = smoothStep(0, 150, rawDistance) * 100

			distance.set(easedDistance)
			angle.set(Math.atan2(dy, dx))
		}

		window.addEventListener('mousemove', updateMousePosition)
		setIsVisible(true)
		return () =>
			window.removeEventListener('mousemove', updateMousePosition)
	}, [mouseX, mouseY, distance, angle, disableAnimation, small])

	const glowSize = useTransform(
		distance,
		[0, 100],
		small ? [40, 16] : [80, 33]
	)
	const glowX = useTransform(
		[distance, angle] as [MotionValue<number>, MotionValue<number>],
		([dist, ang]) => Math.cos(ang) * dist * (small ? 0.1 : 0.2)
	)
	const glowY = useTransform(
		[distance, angle] as [MotionValue<number>, MotionValue<number>],
		([dist, ang]) => {
			const rawY = Math.sin(ang) * dist * (small ? 0.1 : 0.2)
			return small ? rawY : Math.max(0, rawY)
		}
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

	const lineHeight = small ? '2px' : '0.125rem'
	const lineWidth = small ? '48px' : width
	const linePosition =
		small ?
			{ top: '1px', left: '40px' }
		:	{ bottom: `-${bottomOffset}px`, left: 0 }

	return (
		<AnimatePresence>
			{(isVisible || disableAnimation) && (
				<Container
					ref={ref}
					className={cn(
						'relative',
						small ? 'h-0' : 'h-0.5',
						className
					)}
					style={{ width: small ? 'auto' : width }}
					initial={
						disableAnimation ? undefined : { opacity: 0, width: 0 }
					}
					animate={
						disableAnimation ? undefined : (
							{ opacity: 1, width: '100%' }
						)
					}
					exit={
						disableAnimation ? undefined : { opacity: 0, width: 0 }
					}
					transition={
						disableAnimation ? undefined : (
							{
								duration: 1.5,
								ease: cubicBezier(0.13, 0.97, 0.54, 0.46)
							}
						)
					}
					{...props}
				>
					<Line
						className={cn('absolute', small ? 'w-12' : 'w-full')}
						style={{
							backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
							boxShadow: disableAnimation ? undefined : boxShadow,
							height: lineHeight,
							...linePosition
						}}
					/>
				</Container>
			)}
		</AnimatePresence>
	)
}
