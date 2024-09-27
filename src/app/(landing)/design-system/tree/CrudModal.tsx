import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black bg-opacity-50 z-50"
						onClick={onClose}
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 flex items-center justify-center z-50"
					>
						<div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-bold text-gray-100">
									{title}
								</h2>
								<button
									onClick={onClose}
									className="text-gray-400 hover:text-gray-200"
								>
									<X size={24} />
								</button>
							</div>
							{children}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
