import tailwindConfig from '@/../tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

const fullConfig = resolveConfig(tailwindConfig)

export const tailwindColors = fullConfig.theme.colors

function hexToRgb(hex: string): [number, number, number] {
	const r = parseInt(hex.slice(1, 3), 16)
	const g = parseInt(hex.slice(3, 5), 16)
	const b = parseInt(hex.slice(5, 7), 16)
	return [r, g, b]
}

function rgbDistance(
	color1: [number, number, number],
	color2: [number, number, number]
): number {
	return Math.sqrt(
		Math.pow(color1[0] - color2[0], 2) +
			Math.pow(color1[1] - color2[1], 2) +
			Math.pow(color1[2] - color2[2], 2)
	)
}
export function rgbToHex(r: number, g: number, b: number): string {
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
export function nearestTailwindColor(
	hexColor: string
): { name: string; value: string } | null {
	const targetRgb = hexToRgb(hexColor)
	let nearestColor: { name: string; value: string } | null = null
	let nearestDistance = Infinity

	Object.entries(tailwindColors).forEach(([name, value]) => {
		if (typeof value === 'string') {
			const currentRgb = hexToRgb(value)
			const distance = rgbDistance(targetRgb, currentRgb)
			if (distance < nearestDistance) {
				nearestDistance = distance
				nearestColor = { name, value }
			}
		} else if (typeof value === 'object') {
			Object.entries(value).forEach(([shade, shadeValue]) => {
				if (typeof shadeValue === 'string') {
					const currentRgb = hexToRgb(shadeValue)
					const distance = rgbDistance(targetRgb, currentRgb)
					if (distance < nearestDistance) {
						nearestDistance = distance
						nearestColor = {
							name: `${name}-${shade}`,
							value: shadeValue
						}
					}
				}
			})
		}
	})

	return nearestColor
}

export function parseColor(color: string) {
	let r,
		g,
		b,
		a = 1

	if (color.startsWith('#')) {
		// HEX color
		r = parseInt(color.slice(1, 3), 16)
		g = parseInt(color.slice(3, 5), 16)
		b = parseInt(color.slice(5, 7), 16)
	} else if (color.startsWith('rgb')) {
		// RGB or RGBA color
		const match = color.match(
			/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
		)
		if (match) {
			r = parseInt(match[1], 10)
			g = parseInt(match[2], 10)
			b = parseInt(match[3], 10)
			a = match[4] ? parseFloat(match[4]) : 1
		}
	}

	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		console.error('Invalid color format:', color)
		return null
	}

	return { r, g, b, a }
}
