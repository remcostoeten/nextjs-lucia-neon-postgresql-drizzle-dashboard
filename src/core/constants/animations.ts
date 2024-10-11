import { cubicBezier } from 'framer-motion'

export const fadeInUp = (delay: number) => ({
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			delay: delay,
			ease: 'easeOut'
		}
	}
})

export const customEasing = cubicBezier(0.35, 0.9, 0.13, 0.6)
