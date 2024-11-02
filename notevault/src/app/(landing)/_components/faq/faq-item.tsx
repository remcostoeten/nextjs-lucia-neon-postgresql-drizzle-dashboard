'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import useMouseHoverEffect from '@/core/hooks/use-mouse-hover'

type FAQItemProps = {
	question: string
	answer: string
}

export default function FAQItem({ question, answer }: FAQItemProps) {
	const [isOpen, setIsOpen] = useState(false)
	const mouseRef = useMouseHoverEffect()

	return (
		<div className="faq-dropdown">
			<motion.div
				className="faq-toggle hover-effect"
				onClick={() => setIsOpen(!isOpen)}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				ref={mouseRef}
			>
				<div className="faq-question">
					<div className="label-regular">
						<span className="gradient-span">{question}</span>
					</div>
					<motion.div
						className="faq-icon"
						animate={{ rotate: isOpen ? 180 : 0 }}
						transition={{ duration: 0.3 }}
					>
						{isOpen ?
							<MinusIcon />
						:	<PlusIcon />}
					</motion.div>
				</div>
			</motion.div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="faq-dropdown-list"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="faq-answer">
							<p className="paragraph-small text-subtitle">
								{answer}
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

function PlusIcon() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8 12L16 12"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 8L12 16"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

function MinusIcon() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8 12L16 12"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
