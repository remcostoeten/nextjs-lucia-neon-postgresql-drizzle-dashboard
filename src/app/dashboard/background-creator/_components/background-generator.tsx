'use client'

import { useState } from 'react'
import { Button } from 'ui'
import { BackgroundConfig } from '../_utils/bg-creator.types'
import { useBackgroundConfig } from '../_utils/use-background-config'
import { BackgroundPreview } from './background-preview'
import { ColorPaletteGenerator } from './color-palette-generator'
import { ExportPanel } from './export-panel'
import { LayerPanel } from './layer-panel'
import { OutputPanel } from './output-panel'
import { PresetTemplates } from './preset-templates'
import { ResponsivePreview } from './responsive-preview'

export function BackgroundGenerator() {
	const {
		config,
		updateLayer,
		addLayer,
		removeLayer,
		reorderLayers,
		savedConfigs,
		saveConfig,
		loadConfig,
		deviceSize,
		setDeviceSize
	} = useBackgroundConfig()

	const [isMinimized, setIsMinimized] = useState(false)

	const loadPreset = (preset: BackgroundConfig) => {
		loadConfig(preset)
	}

	const handleColorSelect = (color: string) => {
		// You can decide how to use the selected color.
		// For example, you could update the color of the active layer:
		if (config.layers.length > 0) {
			updateLayer(config.layers[0].id, { patternColor: color })
		}
	}

	return (
		<div className="relative min-h-screen">
			<BackgroundPreview config={config} deviceSize={deviceSize} />
			<ResponsivePreview
				deviceSize={deviceSize}
				setDeviceSize={setDeviceSize}
			/>
			<div
				className={`fixed inset-y-0 right-0 w-96 bg-gray-900 p-6 transition-transform duration-300 ease-in-out ${
					isMinimized ? 'translate-x-full' : 'translate-x-0'
				}`}
			>
				<button
					onClick={() => setIsMinimized(!isMinimized)}
					className="absolute top-4 left-0 transform -translate-x-full bg-gray-900 text-white p-2 rounded-l-md"
				>
					{isMinimized ? '<<' : '>>'}
				</button>
				<div className="space-y-6 overflow-y-auto h-full">
					<PresetTemplates loadPreset={loadPreset} />
					<ColorPaletteGenerator onSelectColor={handleColorSelect} />
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">Layers</h2>
						{config.layers.map((layer, index) => (
							<LayerPanel
								key={layer.id}
								layer={layer}
								updateLayer={updateLayer}
								removeLayer={removeLayer}
								moveLayer={direction => {
									const newIndex =
										direction === 'up'
											? index - 1
											: index + 1
									reorderLayers(index, newIndex)
								}}
								isFirst={index === 0}
								isLast={index === config.layers.length - 1}
							/>
						))}
						<Button onClick={addLayer} className="w-full">
							Add Layer
						</Button>
					</div>
					<ExportPanel config={config} />
					<OutputPanel config={config} />
				</div>
			</div>
		</div>
	)
}
