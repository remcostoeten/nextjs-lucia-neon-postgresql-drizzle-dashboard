import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch
} from 'ui'
import { BackgroundConfig, GradientDirection } from '../_utils/types'
import { ColorPicker } from './color-picker'
import LabeledSlider from './labeled-sider'

interface GradientControlsProps {
	layer: Layer
	updateLayer: (updates: Partial<Layer>) => void
}

export function GradientControls({
	config,
	updateConfig
}: GradientControlsProps) {
	const gradientDirections: GradientDirection[] = [
		'radial',
		'top',
		'bottom',
		'left',
		'right',
		'top-left',
		'top-right',
		'bottom-left',
		'bottom-right'
	]

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
					checked={config.gradientEnabled}
					onCheckedChange={checked =>
						updateConfig({ gradientEnabled: checked })
					}
				/>
				<label
					htmlFor="gradient-enabled"
					className="text-sm font-medium"
				>
					Enable Gradient Overlay
				</label>
			</div>
			{layer.gradientEnabled && (
				<>
					<Select
						value={config.gradientDirection}
						onValueChange={value =>
							updateConfig({
								gradientDirection: value as GradientDirection
							})
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select gradient direction" />
						</SelectTrigger>
						<SelectContent>
							{gradientDirections.map(direction => (
								<SelectItem key={direction} value={direction}>
									{direction.charAt(0).toUpperCase() +
										direction.slice(1)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<ColorPicker
						label="Gradient Start Color"
						color={config.gradientStartColor}
						onChange={color =>
							updateConfig({ gradientStartColor: color })
						}
					/>
					<ColorPicker
						label="Gradient End Color"
						color={config.gradientEndColor}
						onChange={color =>
							updateConfig({ gradientEndColor: color })
						}
					/>
					<LabeledSlider
						label="Gradient Extent"
						value={[config.gradientExtent]}
						onValueChange={value =>
							updateConfig({ gradientExtent: value[0] })
						}
						min={0}
						max={100}
					/>
				</>
			)}
		</div>
	)
}
