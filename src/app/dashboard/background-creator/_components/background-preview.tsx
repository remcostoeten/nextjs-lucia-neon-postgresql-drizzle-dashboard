import { useEffect, useRef } from 'react'
import { BackgroundConfig, DeviceSize, Layer } from '../_utils/bg-creator.types'
import { generateBackgroundStyle } from '../_utils/generate-background-style'

interface BackgroundPreviewProps {
	config: BackgroundConfig
	deviceSize: DeviceSize
}

export function BackgroundPreview({
	config,
	deviceSize
}: BackgroundPreviewProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const renderLayer = (layer: Layer) => {
			const layerCanvas = document.createElement('canvas')
			layerCanvas.width = canvas.width
			layerCanvas.height = canvas.height
			const layerCtx = layerCanvas.getContext('2d')
			if (!layerCtx) return

			const style = generateBackgroundStyle(layer)
			layerCtx.fillStyle = style.backgroundColor as string
			layerCtx.fillRect(0, 0, layerCanvas.width, layerCanvas.height)

			if (style.backgroundImage) {
				const img = new Image()
				img.onload = () => {
					layerCtx.globalAlpha = layer.opacity
					layerCtx.globalCompositeOperation = layer.blendMode
					layerCtx.drawImage(
						img,
						0,
						0,
						layerCanvas.width,
						layerCanvas.height
					)
					ctx.drawImage(layerCanvas, 0, 0)
				}
				img.src = `data:image/svg+xml,${encodeURIComponent(
					`<svg xmlns="http://www.w3.org/2000/svg" width="${layerCanvas.width}" height="${layerCanvas.height}">
            <foreignObject width="100%" height="100%">
              <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;${style.backgroundImage}"></div>
            </foreignObject>
          </svg>`
				)}`
			} else {
				ctx.drawImage(layerCanvas, 0, 0)
			}
		}

		const resizeCanvas = () => {
			let width, height
			switch (deviceSize) {
				case 'mobile':
					width = 375
					height = 667
					break
				case 'tablet':
					width = 768
					height = 1024
					break
				case 'desktop':
				default:
					width = window.innerWidth
					height = window.innerHeight
			}

			canvas.width = width
			canvas.height = height
			canvas.style.width = `${width}px`
			canvas.style.height = `${height}px`

			ctx.clearRect(0, 0, canvas.width, canvas.height)
			config.layers.forEach(renderLayer)
		}

		resizeCanvas()
		window.addEventListener('resize', resizeCanvas)

		return () => {
			window.removeEventListener('resize', resizeCanvas)
		}
	}, [config, deviceSize])

	return (
		<div className="absolute inset-0 flex items-center justify-center bg-gray-900">
			<canvas ref={canvasRef} className="max-w-full max-h-full" />
		</div>
	)
}
