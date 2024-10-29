import { cubicBezier, Variants } from 'framer-motion'

export const fadeInUp = (delay: number = 0): Variants => ({
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3, delay, ease: 'easeOut' }
	}
})

export const customEasing = cubicBezier(0.35, 0.9, 0.13, 0.6)
