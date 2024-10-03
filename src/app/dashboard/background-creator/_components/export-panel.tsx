'use client'

import { useState } from 'react'
import { Button } from 'ui'
import { generateBackgroundStyle } from '../_utils/generate-background-style'
import { BackgroundConfig } from '../_utils/types'

interface ExportPanelProps {
	config: BackgroundConfig
}

export function ExportPanel({ config }: ExportPanelProps) {
	const [exportFormat, setExportFormat] = useState<'css' | 'image'>('css')

	const generateCSS = () => {
		const styles = config.layers.map(layer =>
			generateBackgroundStyle(layer)
		)
		return styles
			.map(
				(style, index) => `
.background-layer-${index + 1} {
  background-color: ${style.backgroundColor};
  background-image: ${style.backgroundImage};
  background-size: ${style.backgroundSize};
  opacity: ${style.opacity};
  mix-blend-mode: ${style.mixBlendMode};
  ${style.animation ? `animation: ${style.animation};` : ''}
}
`
			)
			.join('\n')
	}

	const generateImage = () => {
		const canvas = document.createElement('canvas')
		canvas.width = 1920
		canvas.height = 1080
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		config.layers.forEach(layer => {
			const style = generateBackgroundStyle(layer)
			ctx.fillStyle = style.backgroundColor as string
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			if (style.backgroundImage) {
				const img = new Image()
				img.onload = () => {
					ctx.globalAlpha = layer.opacity
					ctx.globalCompositeOperation = layer.blendMode
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
				}
				img.src = `data:image/svg+xml,${encodeURIComponent(
					`<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
            <foreignObject width="100%" height="100%">
              <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;${style.backgroundImage}"></div>
            </foreignObject>
          </svg>`
				)}`
			}
		})

		return canvas.toDataURL('image/png')
	}

	const handleExport = () => {
		if (exportFormat === 'css') {
			const css = generateCSS()
			const blob = new Blob([css], { type: 'text/css' })
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'background-styles.css'
			a.click()
			URL.revokeObjectURL(url)
		} else {
			const imageUrl = generateImage()
			const a = document.createElement('a')
			a.href = imageUrl
			a.download = 'background-image.png'
			a.click()
		}
	}

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Export Background</h3>
			<div className="flex items-center space-x-4">
				<select
					value={exportFormat}
					onChange={e =>
						setExportFormat(e.target.value as 'css' | 'image')
					}
					className="bg-gray-700 text-white rounded px-2 py-1"
				>
					<option value="css">CSS</option>
					<option value="image">Image</option>
				</select>
				<Button onClick={handleExport}>Export</Button>
			</div>
		</div>
	)
}
