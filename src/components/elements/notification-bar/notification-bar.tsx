'use client'

import { HorizontalLight } from '@/app/(non-dashboard)/(landing)/_components/effects/landing-effects'
import useMouseHoverEffect from '@/core/hooks/use-mouse-hover'
import { useDismissStore } from 'stores'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const EMOJI_MAP = {
	fire: '🔥',
	star: '⭐',
	rocket: '🚀',
	hundred: '💯',
	checkmark: '✅',
	warning: '⚠️',
	cross: '❌',
	info: 'ℹ️',
	question: '❓',
	exclamation: '❗',
	diamond: '❕',
	circle: '❔',
	smile: '😊',
	sad: '😢',
	heart: '💖',
	kissing: '😘',
	love: '💕',
	angry: '😠',
	laughing: '😂',
	disappointed: '😕',
	thumbsUp: '👍',
	thumbsDown: '👎'
}

type EmojiKey = keyof typeof EMOJI_MAP

type BannerProps = {
	badgeText?: string
	badgeEmoji?: EmojiKey
	message: string
	animated?: boolean
	onClose?: () => void
	showLights?: boolean
	storageKey: string
}

function NotificationBar({
	badgeText = '',
	badgeEmoji = 'fire',
	message,
	animated = false,
	showLights = true
}: BannerProps) {
	const { isDismissed, setIsDismissed } = useDismissStore()
	const [isVisible, setIsVisible] = useState(!isDismissed)
	const mouseHover = useMouseHoverEffect()

	useEffect(() => {
		if (animated && !isDismissed) {
			setIsVisible(false)
			setTimeout(() => setIsVisible(true), 0)
		}
	}, [animated, isDismissed])

	const childVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	}

	const handleDismiss = () => {
		setIsDismissed(true)
	}

	if (isDismissed) {
		return null
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<>
					{showLights && <HorizontalLight />}
					<motion.section
						ref={mouseHover}
						className={`hover-effect z-50 section-banner bg-card flex items-center text-whitepx-[5%]  h-10 overflow-hidden w-screen `}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="z-5 w-full max-w-big-wrapper mx-auto">
							<div className="banner-content-wide flex justify-between items-center gap-3 h-full">
								<motion.div
									className="banner-left flex items-center gap-3 h-full"
									variants={childVariants}
									transition={{ delay: 0.2 }}
								>
									<div className="banner-badge bg-body z-[ border  animate-pulse rounded-lg px-2 py-0.5 text-xs leading-normal">
										<span className="gradient text-xxs">
											{badgeText}{' '}
											{badgeEmoji &&
												EMOJI_MAP[badgeEmoji]}
										</span>
									</div>
									<p className="paragraph-regular text-sm leading-tight m-0">
										{message}
									</p>
								</motion.div>
								<motion.button
									className="banner-close w-6 h-6 flex items-center text-neutral-400 hover:text-secondary-light transition-colors duration-200"
									onClick={handleDismiss}
									variants={childVariants}
									transition={{ delay: 0.3 }}
								>
									<div className="icon-regular w-6 h-6 flex justify-center items-center">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289Z"
												fill="currentColor"
											/>
										</svg>
									</div>
								</motion.button>
							</div>
						</div>
					</motion.section>
				</>
			)}
		</AnimatePresence>
	)
}

export { NotificationBar }
export default NotificationBar
