'use client'

import { useEffect, useRef } from 'react'

export default function useMouseHoverEffect() {
	const elementRef = useRef<HTMLElement | null>(null)

	useEffect(() => {
		const element = elementRef.current
		if (!element) return

		const handleMouseMove = (e: MouseEvent) => {
			const rect = element.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			element.style.setProperty('--mouse-x', `${x}px`)
			element.style.setProperty('--mouse-y', `${y}px`)
		}

		element.addEventListener('mousemove', handleMouseMove)

		return () => {
			element.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	return elementRef
}
