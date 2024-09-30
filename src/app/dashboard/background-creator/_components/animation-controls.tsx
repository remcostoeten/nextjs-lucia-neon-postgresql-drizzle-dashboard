import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch
} from 'ui'
import { AnimationType, Layer } from '../_utils/bg-creator.types'
import LabeledSlider from './labeled-sider'

interface AnimationControlsProps {
	layer: Layer
	updateLayer: (updates: Partial<Layer>) => void
}

export function AnimationControls({
	layer,
	updateLayer
}: AnimationControlsProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<label
					htmlFor="animation-enabled"
					className="text-sm font-medium"
				>
					Enable Animation
				</label>
				<Switch
					id="animation-enabled"
					checked={layer.animationEnabled}
					onCheckedChange={checked =>
						updateLayer({ animationEnabled: checked })
					}
				/>
			</div>
			{layer.animationEnabled && (
				<>
					<Select
						value={layer.animationType}
						onValueChange={value =>
							updateLayer({
								animationType: value as AnimationType
							})
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select animation type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="shift">Shift</SelectItem>
							<SelectItem value="rotate">Rotate</SelectItem>
							<SelectItem value="scale">Scale</SelectItem>
							<SelectItem value="color">Color Change</SelectItem>
						</SelectContent>
					</Select>
					<LabeledSlider
						label="Animation Duration (seconds)"
						value={[layer.animationDuration]}
						onValueChange={value =>
							updateLayer({ animationDuration: value[0] })
						}
						min={0.1}
						max={10}
						step={0.1}
					/>
					<Select
						value={layer.animationDirection}
						onValueChange={value =>
							updateLayer({
								animationDirection: value as
									| 'normal'
									| 'reverse'
									| 'alternate'
									| 'alternate-reverse'
							})
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select animation direction" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="normal">Normal</SelectItem>
							<SelectItem value="reverse">Reverse</SelectItem>
							<SelectItem value="alternate">Alternate</SelectItem>
							<SelectItem value="alternate-reverse">
								Alternate Reverse
							</SelectItem>
						</SelectContent>
					</Select>
				</>
			)}
		</div>
	)
}
