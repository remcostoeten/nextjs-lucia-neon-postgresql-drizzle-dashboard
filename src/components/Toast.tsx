'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, X } from 'lucide-react'
import { toast } from 'toast'

const toastVariants = {
	initial: { opacity: 0, y: 50, scale: 0.3 },
	animate: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
}

type CloseButtonProps = {
	onClick: () => void
}

const CloseButton = ({ onClick }: CloseButtonProps) => (
	<button
		onClick={onClick}
		className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
	>
		<X className="h-4 w-4" />
	</button>
)

export default function Toast(message: string) {
	const { isVisible, hideToast } = toast()

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					key="toast"
					variants={toastVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					className="fixed top-4 right-4  bg-body  text-subtitle border z-50 p-4 rounded-md shadow-lg w-fit"
				>
					<div className="flex items-center gap-3">
						<AlertCircle className="h-5 w-5 text-brand" />
						<div className="flex-grow">
							<p className="text-sm font-semibold">{message}</p>
						</div>
						<CloseButton onClick={hideToast} />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
