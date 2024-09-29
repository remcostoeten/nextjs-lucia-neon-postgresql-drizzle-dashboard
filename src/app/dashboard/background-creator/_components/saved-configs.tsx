import { Button } from 'ui'
import { BackgroundConfig } from '../_utils/types'

interface SavedConfigsProps {
	savedConfigs: BackgroundConfig[]
	saveConfig: () => void
	loadConfig: (config: BackgroundConfig) => void
}

export function SavedConfigs({
	savedConfigs,
	saveConfig,
	loadConfig
}: SavedConfigsProps) {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Saved Configurations</h3>
			<Button onClick={saveConfig} className="w-full">
				Save Current Configuration
			</Button>
			<div className="space-y-2">
				{savedConfigs.map((config, index) => (
					<Button
						key={index}
						onClick={() => loadConfig(config)}
						variant="outline"
						className="w-full text-left"
					>
						Configuration {index + 1}
					</Button>
				))}
			</div>
		</div>
	)
}
