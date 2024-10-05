'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const ToastContainer = ({ children }: { children: React.ReactNode }) => (
	<div className="fixed bottom-4 right-4 z-50">{children}</div>
)

const toastVariants = {
	initial: { opacity: 0, y: 50, scale: 0.3 },
	animate: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
}

const AuthErrorToast = ({
	error,
	onClose
}: {
	error: string
	onClose: () => void
}) => {
	const getErrorMessage = (error: string) => {
		switch (error.toLowerCase()) {
			case 'passwords do not match':
				return "Passwords don't match"
			case 'invalid password':
				return 'Invalid password'
			case 'no account found with this email address':
				return "Email doesn't exist"
			case 'incorrect password':
				return 'Incorrect password'
			default:
				return error
		}
	}

	return (
		<motion.div
			variants={toastVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className="bg-[#0a0a0a] text-subtitle border  p-4 rounded-md shadow-lg relative overflow-hidden w-72"
		>
			<div className="flex items-center gap-3">
				<AlertCircle className="h-5 w-5 text-error flex-shrink-0" />
				<div className="flex-grow">
					<p className="text-sm font-semibold">
						{getErrorMessage(error)}
					</p>
				</div>
				<button
					onClick={onClose}
					className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
		</motion.div>
	)
}

export default function AuthFormError({ state }: { state: { error: string } }) {
	const [showError, setShowError] = useState(false)

	useEffect(() => {
		if (state.error) {
			setShowError(true)
			const timer = setTimeout(() => setShowError(false), 5000) // Auto-hide after 5 seconds
			return () => clearTimeout(timer)
		}
	}, [state.error])

	return (
		<ToastContainer>
			<AnimatePresence>
				{showError && state.error && (
					<AuthErrorToast
						error={state.error}
						onClose={() => setShowError(false)}
					/>
				)}
			</AnimatePresence>
		</ToastContainer>
	)
}
