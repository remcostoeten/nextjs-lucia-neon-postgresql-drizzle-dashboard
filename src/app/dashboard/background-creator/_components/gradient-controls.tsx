import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch
} from 'ui'
import { GradientDirection, Layer } from '../_utils/bg-creator.types'
import { ColorPicker } from './color-picker'
import LabeledSlider from './labeled-sider'

interface GradientControlsProps {
	layer: Layer
	updateLayer: (updates: Partial<Layer>) => void
}

export function GradientControls({
	layer,
	updateLayer
}: GradientControlsProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<label
					htmlFor="gradient-enabled"
					className="text-sm font-medium"
				>
					Enable Gradient
				</label>
				<Switch
					id="gradient-enabled"
					checked={layer.gradientEnabled}
					onCheckedChange={checked =>
						updateLayer({ gradientEnabled: checked })
					}
				/>
			</div>
			{layer.gradientEnabled && (
				<>
					<Select
						value={layer.gradientDirection}
						onValueChange={value =>
							updateLayer({
								gradientDirection: value as GradientDirection
							})
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select gradient direction" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="radial">Radial</SelectItem>
							<SelectItem value="top">Top</SelectItem>
							<SelectItem value="bottom">Bottom</SelectItem>
							<SelectItem value="left">Left</SelectItem>
							<SelectItem value="right">Right</SelectItem>
							<SelectItem value="top-left">Top Left</SelectItem>
							<SelectItem value="top-right">Top Right</SelectItem>
							<SelectItem value="bottom-left">
								Bottom Left
							</SelectItem>
							<SelectItem value="bottom-right">
								Bottom Right
							</SelectItem>
						</SelectContent>
					</Select>
					<ColorPicker
						label="Start Color"
						color={layer.gradientStartColor}
						onChange={color =>
							updateLayer({ gradientStartColor: color })
						}
					/>
					<ColorPicker
						label="End Color"
						color={layer.gradientEndColor}
						onChange={color =>
							updateLayer({ gradientEndColor: color })
						}
					/>
					<LabeledSlider
						label="Gradient Extent"
						value={[layer.gradientExtent]}
						onValueChange={value =>
							updateLayer({ gradientExtent: value[0] })
						}
						min={0}
						max={100}
					/>
				</>
			)}
		</div>
	)
}
