'use client'

import {
	nearestTailwindColor,
	parseColor,
	rgbToHex
} from '@/components/_development-utils/color-utils'
import { Button } from '@/components/ui/button'
import { PointerIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui'
function ColorPickerModal({
	color,
	onClose
}: {
	color: string
	onClose: () => void
}) {
	const [rgbaColor, setRgbaColor] = useState('')
	const [hexColor, setHexColor] = useState('')
	const [tailwindColor, setTailwindColor] = useState('')

	useEffect(() => {
		const parsedColor = parseColor(color)
		if (parsedColor) {
			const { r, g, b, a } = parsedColor
			setRgbaColor(`rgba(${r}, ${g}, ${b}, ${a})`)
			const hex = rgbToHex(r, g, b)
			setHexColor(hex.toUpperCase())

			const nearest = nearestTailwindColor(hex)
			setTailwindColor(
				nearest ? nearest.name : 'No matching Tailwind color'
			)
		} else {
			setRgbaColor('Invalid color')
			setHexColor('Invalid color')
			setTailwindColor('Invalid color')
		}
	}, [color])

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Selected Color</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4">
					<div className="flex items-center gap-2">
						<div
							className="w-10 h-10 rounded border"
							style={{ backgroundColor: color }}
						/>
						<div className="grid gap-1">
							<div>
								<span className="font-medium">RGBA:</span>{' '}
								{rgbaColor}
							</div>
							<div>
								<span className="font-medium">HEX:</span>{' '}
								{hexColor}
							</div>
							<div>
								<span className="font-medium">Tailwind:</span>{' '}
								{tailwindColor}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default function ColorPicker({
	onActivate,
	onDeactivate,
	isActive,
	selectedColor
}: {
	onActivate: () => void
	onDeactivate: (color: string | null) => void
	isActive: boolean
	selectedColor: string | null
}) {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [previewColor, setPreviewColor] = useState<string | null>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	const activatePicker = useCallback(() => {
		onActivate()
		if ('EyeDropper' in window) {
			const eyeDropper = new (window as any).EyeDropper()
			eyeDropper
				.open()
				.then((result: { sRGBHex: string }) => {
					const parsedColor = parseColor(result.sRGBHex)
					if (parsedColor) {
						const { r, g, b } = parsedColor
						const rgba = `rgba(${r}, ${g}, ${b}, 1)`
						setPreviewColor(rgba)
						onDeactivate(rgba)
						setShowModal(true)
					} else {
						console.error('Invalid color returned by EyeDropper')
						onDeactivate(null)
					}
				})
				.catch((error: any) => {
					console.error('EyeDropper error:', error)
					onDeactivate(null)
				})
		} else {
			console.error('EyeDropper API not supported')
			onDeactivate(null)
		}
	}, [onActivate, onDeactivate])

	useEffect(() => {
		if (!isActive) return

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
			const x = e.clientX
			const y = e.clientY
			const element = document.elementFromPoint(x, y)
			if (element) {
				const color = window.getComputedStyle(element).backgroundColor
				setPreviewColor(color)
			}
		}

		document.addEventListener('mousemove', handleMouseMove)
		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
		}
	}, [isActive])

	return (
		<>
			<Button
				onClick={activatePicker}
				disabled={isActive}
				className="flex items-center space-x-2"
			>
				<PointerIcon className="w-5 h-5" />
				<span>
					{isActive ? 'Picking...' : 'Pick a color from the page'}
				</span>
			</Button>
			{isActive && previewColor && (
				<div
					className="fixed w-6 h-6 rounded-full border border-white shadow-md pointer-events-none"
					style={{
						backgroundColor: previewColor,
						left: `${mousePosition.x + 20}px`,
						top: `${mousePosition.y - 20}px`
					}}
				/>
			)}
			{showModal && selectedColor && (
				<ColorPickerModal
					color={selectedColor}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	)
}
