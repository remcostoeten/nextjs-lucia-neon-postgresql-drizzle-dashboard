'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, X } from 'lucide-react'
import { useToastStore } from 'stores'

const toastVariants = {
	initial: { opacity: 0, y: 50, scale: 0.3 },
	animate: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
}

export const Toast = () => {
	const { message, type, isVisible, hideToast } = useToastStore()

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					key="toast"
					variants={toastVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					className="fixed bottom-4 right-4 z-50 bg-[#1c1c1c] text-gray-200 border border-[#2c2c2c] p-4 rounded-md shadow-lg w-72"
				>
					<div className="flex items-center gap-3">
						<AlertCircle
							className={`h-5 w-5 ${type === 'error' ? 'text-red-500' : 'text-blue-500'}`}
						/>
						<div className="flex-grow">
							<p className="text-sm font-semibold">{message}</p>
						</div>
						<button
							onClick={hideToast}
							className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
						>
							<X className="h-4 w-4" />
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
