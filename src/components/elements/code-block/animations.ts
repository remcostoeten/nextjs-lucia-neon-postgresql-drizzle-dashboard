export const ANIMATION_VARIANTS = {
	collapsed: {
		height: 0,
		opacity: 0,
		transition: {
			height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
			opacity: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
		}
	},
	expanded: {
		height: 'auto',
		opacity: 1,
		transition: {
			height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
			opacity: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
		}
	}
}

export const COPY_VARIANTS = {
	initial: { opacity: 0, scale: 0.96 },
	animate: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
	},
	exit: {
		opacity: 0,
		scale: 0.96,
		transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
	}
}

export const TOAST_VARIANTS = {
	hidden: {
		opacity: 0,
		y: -20,
		scale: 0.95,
		transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
	}
}
