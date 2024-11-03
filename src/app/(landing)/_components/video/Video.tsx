'use client'

import { useState } from 'react'
import { AnimatePresence, easeInOut, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { toast } from 'sonner'

import HorizontalLine from '../horizontal-line'
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

export default function YouTubeRickroll() {
	const [isVideoOpen, setIsVideoOpen] = useState(false)
	const youtubeVideoId = 'dQw4w9WgXcQ'

	const handleVideoOpen = () => {
		setIsVideoOpen(true)
		toast('Sorry, no promotion video yet so enjoy Rick Astley instead.')
	}

	const handleVideoClose = () => {
		setIsVideoOpen(false)
	}

	return (
		<div className="relative">
			<div className={styles.videoContainerLines}>
				<div className="max-w-wrapper relative mx-auto w-full">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.5,
							delay: 0.4,
							ease: easeInOut
						}}
						className={`${styles.videoLightboxWrapper} ${styles.styleYWvEo}`}
						id="style-YWvEo"
					>
						<motion.a
							href="#"
							className={`${styles.videoLightboxLink} ${styles.wInlineBlock} ${styles.wLightbox}`}
							aria-label="open lightbox"
							aria-haspopup="dialog"
							onClick={handleVideoOpen}
						>
							<img
								src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8f8b4e99c725a3cdc8f4f_Play%20Icon.svg"
								loading="lazy"
								alt=""
								className={styles.iconRegular}
							/>
						</motion.a>
					</motion.div>
					<LinesGroup />
				</div>
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
							className="relative h-[75vh] w-[75vw]"
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.8 }}
							transition={{ duration: 0.5, ease: easeInOut }}
							onClick={(e) => e.stopPropagation()}
						>
							<iframe
								width="100%"
								height="100%"
								src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
								title="YouTube Rickroll"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="size-full"
							></iframe>
							<button
								className="absolute right-2 top-2 rounded-full bg-black bg-opacity-50 p-1 text-white transition-colors hover:text-gray-300"
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
