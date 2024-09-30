import {
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from 'ui'
import { Layer } from '../_utils/bg-creator.types'
import { AnimationControls } from './animation-controls'
import { ColorPicker } from './color-picker'
import { GradientControls } from './gradient-controls'
import LabeledSlider from './labeled-sider'
import { PatternSelector } from './pattern-selector'

interface LayerPanelProps {
	layer: Layer
	updateLayer: (layerId: string, updates: Partial<Layer>) => void
	removeLayer: (layerId: string) => void
	moveLayer: (direction: 'up' | 'down') => void
	isFirst: boolean
	isLast: boolean
}

export function LayerPanel({
	layer,
	updateLayer,
	removeLayer,
	moveLayer,
	isFirst,
	isLast
}: LayerPanelProps) {
	const handleLayerUpdate = (updates: Partial<Layer>) => {
		updateLayer(layer.id, updates)
	}

	return (
		<div className="border border-gray-700 rounded-lg p-4 space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">
					Layer {layer.id.slice(0, 4)}
				</h3>
				<div className="space-x-2">
					<Button
						size="sm"
						variant="outline"
						onClick={() => moveLayer('up')}
						disabled={isFirst}
					>
						↑
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={() => moveLayer('down')}
						disabled={isLast}
					>
						↓
					</Button>
					<Button
						size="sm"
						variant="destructive"
						onClick={() => removeLayer(layer.id)}
					>
						Remove
					</Button>
				</div>
			</div>
			<PatternSelector
				pattern={layer.pattern}
				onChange={pattern => handleLayerUpdate({ pattern })}
			/>
			<div className="space-y-4">
				<LabeledSlider
					label="Tile Size"
					value={[layer.tileSize]}
					onValueChange={value =>
						handleLayerUpdate({ tileSize: value[0] })
					}
					min={1}
					max={100}
				/>
				<ColorPicker
					label="Pattern Color"
					color={layer.patternColor}
					onChange={color =>
						handleLayerUpdate({ patternColor: color })
					}
				/>
				<ColorPicker
					label="Background Color"
					color={layer.backgroundColor}
					onChange={color =>
						handleLayerUpdate({ backgroundColor: color })
					}
				/>
				<LabeledSlider
					label="Opacity"
					value={[layer.opacity]}
					onValueChange={value =>
						handleLayerUpdate({ opacity: value[0] })
					}
					min={0}
					max={1}
					step={0.01}
				/>
				<Select
					value={layer.blendMode}
					onValueChange={value =>
						handleLayerUpdate({
							blendMode: value as GlobalCompositeOperation
						})
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select blend mode" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="normal">Normal</SelectItem>
						<SelectItem value="multiply">Multiply</SelectItem>
						<SelectItem value="screen">Screen</SelectItem>
						<SelectItem value="overlay">Overlay</SelectItem>
						<SelectItem value="darken">Darken</SelectItem>
						<SelectItem value="lighten">Lighten</SelectItem>
						<SelectItem value="color-dodge">Color Dodge</SelectItem>
						<SelectItem value="color-burn">Color Burn</SelectItem>
						<SelectItem value="hard-light">Hard Light</SelectItem>
						<SelectItem value="soft-light">Soft Light</SelectItem>
						<SelectItem value="difference">Difference</SelectItem>
						<SelectItem value="exclusion">Exclusion</SelectItem>
						<SelectItem value="hue">Hue</SelectItem>
						<SelectItem value="saturation">Saturation</SelectItem>
						<SelectItem value="color">Color</SelectItem>
						<SelectItem value="luminosity">Luminosity</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<GradientControls layer={layer} updateLayer={handleLayerUpdate} />
			<AnimationControls layer={layer} updateLayer={handleLayerUpdate} />
		</div>
	)
}
