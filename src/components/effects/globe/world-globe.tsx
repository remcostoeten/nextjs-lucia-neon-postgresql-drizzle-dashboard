'use client'

import { cn } from '@/lib/utils'
import createGlobe, { COBEOptions } from 'cobe'
import { useCallback, useEffect, useRef, useState } from 'react'

const GLOBE_CONFIG: COBEOptions = {
	width: 1211,
	height: 1211,
	onRender: () => {},
	devicePixelRatio: 2,
	phi: 0,
	theta: 0.3,
	dark: 0.8, // Slightly reduced for lighter contrast
	diffuse: 0.6, // Increased for more definition
	mapSamples: 16000,
	mapBrightness: 2.5, // Increased for better visibility
	baseColor: [0.1, 0.1, 0.1], // Slightly lighter base color
	markerColor: [1, 0.924, 0.1], // --brand: rgb(255, 108, 0)
	glowColor: [0.2, 0.2, 0.2],
	markers: [{ location: [52.8, 5.71], size: 0.1 }]
}

export default function Globe({
	className,
	config = GLOBE_CONFIG
}: {
	className?: string
	config?: COBEOptions
}) {
	let phi = 0
	let width = 0
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const pointerInteracting = useRef(null)
	const pointerInteractionMovement = useRef(0)
	const [r, setR] = useState(0)

	const updatePointerInteraction = (value: any) => {
		pointerInteracting.current = value
		if (canvasRef.current) {
			canvasRef.current.style.cursor = value ? 'grabbing' : 'grab'
		}
	}

	const updateMovement = (clientX: any) => {
		if (pointerInteracting.current !== null) {
			const delta = clientX - pointerInteracting.current
			pointerInteractionMovement.current = delta
			setR(delta / 200)
		}
	}

	const onRender = useCallback(
		(state: Record<string, any>) => {
			if (!pointerInteracting.current) phi += 0.005
			state.phi = phi + r
			state.width = width * 2
			state.height = width * 2
		},
		[r]
	)

	const onResize = () => {
		if (canvasRef.current) {
			width = canvasRef.current.offsetWidth
		}
	}

	useEffect(() => {
		window.addEventListener('resize', onResize)
		onResize()
		const globe = createGlobe(canvasRef.current!, {
			...config,
			width: width * 2,
			height: width * 2,
			onRender
		})
		setTimeout(() => (canvasRef.current!.style.opacity = '1'))
		return () => globe.destroy()
	}, [])

	return (
		<div
			className={cn(
				'absolute inset-0 translate-x-16 translate-y-8 mx-auto aspect-[1/1] w-full max-w-[900px]',
				className
			)}
		>
			<canvas
				className={cn(
					'size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]'
				)}
				ref={canvasRef}
				onPointerDown={e =>
					updatePointerInteraction(
						e.clientX - pointerInteractionMovement.current
					)
				}
				onPointerUp={() => updatePointerInteraction(null)}
				onPointerOut={() => updatePointerInteraction(null)}
				onMouseMove={e => updateMovement(e.clientX)}
				onTouchMove={e =>
					e.touches[0] && updateMovement(e.touches[0].clientX)
				}
			/>
		</div>
	)
}
