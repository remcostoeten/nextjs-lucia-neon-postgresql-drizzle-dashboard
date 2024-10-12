'use client'

import { AnimatePresence, easeInOut, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
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
	const [isVideoOpen, setIsVideoOpen] = useState(false)
	const youtubeVideoId = 'dQw4w9WgXcQ'

	const handleVideoOpen = () => {
		setIsVideoOpen(true)
	}

	const handleVideoClose = () => {
		setIsVideoOpen(false)
	}

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
			<AnimatePresence>
				{isVideoOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5, ease: easeInOut }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
						onClick={handleVideoClose}
					>
						<motion.div
							className="relative w-[75vw] h-[75vh]"
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.8 }}
							transition={{ duration: 0.5, ease: easeInOut }}
							onClick={e => e.stopPropagation()}
						>
							<iframe
								width="100%"
								height="100%"
								src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
								title="YouTube Rickroll"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="w-full h-full"
							></iframe>
							<button
								className="absolute top-2 right-2 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-1"
								onClick={handleVideoClose}
							>
								<X size={24} />
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
