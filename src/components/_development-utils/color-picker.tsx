'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { PickaxeIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { nearestTailwindColor } from './color-utils'

function rgbToHex(r: number, g: number, b: number) {
	return (
		'#' +
		[r, g, b]
			.map(x => {
				const hex = x.toString(16)
				return hex.length === 1 ? '0' + hex : hex
			})
			.join('')
	)
}

function ColorPickerModal({
	color,
	onClose,
	onPickAgain
}: {
	color: string
	onClose: () => void
	onPickAgain: () => void
}) {
	const [rgbColor, setRgbColor] = useState('')
	const [rgbaColor, setRgbaColor] = useState('')
	const [hexColor, setHexColor] = useState('')
	const [tailwindClass, setTailwindClass] = useState('')

	useEffect(() => {
		const r = parseInt(color.slice(1, 3), 16)
		const g = parseInt(color.slice(3, 5), 16)
		const b = parseInt(color.slice(5, 7), 16)

		setRgbColor(`rgb(${r}, ${g}, ${b})`)
		setRgbaColor(`rgba(${r}, ${g}, ${b}, 1)`)
		setHexColor(color.toUpperCase())

		const nearest = nearestTailwindColor(color)
		setTailwindClass(nearest?.name || '')
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
								<span className="font-medium">HEX:</span>{' '}
								{hexColor}
							</div>
							<div>
								<span className="font-medium">RGB:</span>{' '}
								{rgbColor}
							</div>
							<div>
								<span className="font-medium">RGBA:</span>{' '}
								{rgbaColor}
							</div>
							<div>
								<span className="font-medium">Tailwind:</span>{' '}
								{tailwindClass}
							</div>
						</div>
					</div>
					<Button onClick={onPickAgain}>Pick Another Color</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default function ColorPicker() {
	const [isPickerActive, setIsPickerActive] = useState(false)
	const [selectedColor, setSelectedColor] = useState<string | null>(null)
	const [showModal, setShowModal] = useState(false)

	const activatePicker = useCallback(() => {
		setShowModal(false) // Close the modal before activating the picker
		setIsPickerActive(true)
		setTimeout(() => {
			// Use setTimeout to ensure the modal is closed before opening the eyedropper
			const eyeDropper = new (window as any).EyeDropper()
			eyeDropper
				.open()
				.then((result: { sRGBHex: string }) => {
					setSelectedColor(result.sRGBHex)
					setShowModal(true)
				})
				.catch(() => {})
				.finally(() => {
					setIsPickerActive(false)
				})
		}, 100) // Small delay to ensure modal is closed
	}, [])

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (isPickerActive) return

			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			if (!ctx) return

			canvas.width = 1
			canvas.height = 1

			// Convert the document.body to a canvas image source
			const bodyCanvas = document.createElement('canvas')
			bodyCanvas.width = document.body.offsetWidth
			bodyCanvas.height = document.body.offsetHeight
			const bodyCtx = bodyCanvas.getContext('2d')
			// Convert the document.body to a canvas image source
			const bodyImage = new Image()
			bodyImage.src = document.body.outerHTML
			bodyImage.onload = () => {
				bodyCtx?.drawImage(
					bodyImage,
					0,
					0,
					bodyCanvas.width,
					bodyCanvas.height
				)
				ctx.drawImage(
					bodyCanvas,
					e.clientX,
					e.clientY,
					1,
					1,
					0,
					0,
					1,
					1
				)
				const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
				const hex = rgbToHex(r, g, b)
			}

			const tooltip = document.getElementById('color-tooltip')
			if (tooltip) {
				tooltip.style.backgroundColor = hex
				tooltip.style.left = `${e.clientX + 10}px`
				tooltip.style.top = `${e.clientY + 10}px`
				tooltip.style.display = 'block'
			}
		}

		document.addEventListener('mousemove', handleMouseMove)
		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
		}
	}, [isPickerActive])

	return (
		<>
			<Button
				onClick={activatePicker}
				disabled={isPickerActive}
				className="fixed bottom-4 right-4 z-50"
			>
				<PickaxeIcon className="w-5 h-5 mr-2" />
				Pick Color
			</Button>
			<div
				id="color-tooltip"
				className="fixed w-6 h-6 rounded-full border border-white shadow-md pointer-events-none"
				style={{ display: 'none' }}
			/>
			{showModal && selectedColor && (
				<ColorPickerModal
					color={selectedColor}
					onClose={() => setShowModal(false)}
					onPickAgain={activatePicker}
				/>
			)}
		</>
	)
}
