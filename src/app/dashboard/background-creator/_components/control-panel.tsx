import { Slider } from 'ui'
import { BackgroundConfig } from '../_utils/types'
import { AnimationControls } from './animation-controls'
import { ColorPicker } from './color-picker'
import { GradientControls } from './gradient-controls'
import { PatternSelector } from './pattern-selector'
import { SavedConfigs } from './saved-configs'

type ControlPanelProps = {
	config: BackgroundConfig
	updateConfig: (updates: Partial<BackgroundConfig>) => void
	savedConfigs: BackgroundConfig[]
	saveConfig: () => void
	loadConfig: (config: BackgroundConfig) => void
}

export function ControlPanel({
	config,
	updateConfig,
	savedConfigs,
	saveConfig,
	loadConfig
}: ControlPanelProps) {
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold mb-4">Background Generator</h2>
			<PatternSelector
				pattern={config.pattern}
				onChange={pattern => updateConfig({ pattern })}
			/>
			<div className="space-y-4">
				{config.pattern === 'dot' && (
					<>
						<Slider
							label="Dot Size"
							value={[config.dotSize]}
							onValueChange={value =>
								updateConfig({ dotSize: value[0] })
							}
							min={1}
							max={20}
						/>
						<Slider
							label="Dot Spacing"
							value={[config.dotSpacing]}
							onValueChange={value =>
								updateConfig({ dotSpacing: value[0] })
							}
							min={10}
							max={100}
						/>
					</>
				)}
				{config.pattern === 'grid' && (
					<>
						<Slider
							label="Grid Size"
							value={[config.gridSize]}
							onValueChange={value =>
								updateConfig({ gridSize: value[0] })
							}
							min={10}
							max={100}
						/>
						<Slider
							label="Line Width"
							value={[config.lineWidth]}
							onValueChange={value =>
								updateConfig({ lineWidth: value[0] })
							}
							min={1}
							max={10}
						/>
					</>
				)}
				<ColorPicker
					label="Pattern Color"
					color={config.patternColor}
					onChange={color => updateConfig({ patternColor: color })}
				/>
				<ColorPicker
					label="Background Color"
					color={config.backgroundColor}
					onChange={color => updateConfig({ backgroundColor: color })}
				/>
			</div>
			<GradientControls config={config} updateConfig={updateConfig} />
			<AnimationControls config={config} updateConfig={updateConfig} />
			<SavedConfigs
				savedConfigs={savedConfigs}
				saveConfig={saveConfig}
				loadConfig={loadConfig}
			/>
		</div>
	)
}
