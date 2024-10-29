'use client'

import { useState, useEffect } from 'react'
import { useLocalStorage } from '@/core/hooks/use-local-storage'

type BannerProps = {
	// Add any props you need for the banner
}

export default function Banner({}: BannerProps) {
	const [isVisible, setIsVisible] = useState(false)
	const [, , , setDismissed, isDismissed] = useLocalStorage('banner', false)

	useEffect(() => {
		setIsVisible(!isDismissed())
	}, [isDismissed])

	const handleDismiss = () => {
		setIsVisible(false)
		setDismissed()
	}

	if (!isVisible) return null

	return (
		<div className="bg-blue-500 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<p>Your banner message here</p>
				<button onClick={handleDismiss} className="text-white">
					✕
				</button>
			</div>
		</div>
	)
}
