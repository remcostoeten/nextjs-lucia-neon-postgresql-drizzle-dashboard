import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Slider,
	Switch
} from 'ui'
import { BackgroundConfig } from '../_utils/types'

interface AnimationControlsProps {
	config: BackgroundConfig
	updateConfig: (updates: Partial<BackgroundConfig>) => void
}

export function AnimationControls({
	config,
	updateConfig
}: AnimationControlsProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-2">
				<Switch
					id="animation-enabled"
					checked={config.animationEnabled}
					onCheckedChange={checked =>
						updateConfig({ animationEnabled: checked })
					}
				/>
				<label
					htmlFor="animation-enabled"
					className="text-sm font-medium"
				>
					Enable Animation
				</label>
			</div>
			{config.animationEnabled && (
				<>
					<Select
						value={config.animationType}
						onValueChange={value =>
							updateConfig({
								animationType: value as 'shift' | 'color'
							})
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select animation type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="shift">Shift</SelectItem>
							<SelectItem value="color">Color Change</SelectItem>
						</SelectContent>
					</Select>
					<Slider
						label="Animation Duration (seconds)"
						value={config.animationDuration}
						onChange={value =>
							updateConfig({ animationDuration: value })
						}
						min={1}
						max={10}
						step={0.1}
					/>
				</>
			)}
		</div>
	)
}
