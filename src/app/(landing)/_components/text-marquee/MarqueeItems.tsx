'use client'

import { easeInOut, motion } from 'framer-motion'
import HorizontalLine from '../horizontal-line'
import UspMarquee from './usp-marquee'
import styles from './video.module.scss'
type LineDotProps = {
	position: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
}

function LineDot({ position }: LineDotProps) {
	return <div className={`${styles.lineDot} ${styles[position]}`}></div>
}

function LinesGroup() {
	return (
		<div className={styles.linesGroup}>
			<div className={styles.lineVerticalLeft}></div>
			<div className={styles.lineVerticalRight}></div>
			<LineDot position="bottomLeft" />
			<LineDot position="bottomRight" />
			<LineDot position="topLeft" />
			<LineDot position="topRight" />
		</div>
	)
}

export default function MarqueeItems() {
	return (
		<div className="relative">
			<HorizontalLine />
			<div className={styles.videoContainerLines}>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 1.5, ease: easeInOut }}
					className="h-[100px] w-full "
				>
					<UspMarquee />
				</motion.div>
				<div className={styles.linesGroup}>
					<div className={styles.lineVerticalLeft}></div>
					<div className={styles.lineVerticalRight}></div>
					<LineDot position="bottomLeft" />
					<LineDot position="bottomRight" />
				</div>
				<HorizontalLine />
			</div>
		</div>
	)
}
