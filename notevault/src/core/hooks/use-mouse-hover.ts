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

		// Add border class
		element.classList.add('border', 'border-white-012')

		return () => {
			element.removeEventListener('mousemove', handleMouseMove)
			element.classList.remove('border', 'border-white-012')
		}
	}, [])

	return elementRef
}
