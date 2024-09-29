'use client'

import { useState } from 'react'
import { useBackgroundConfig } from '../_utils/use-background'
import { BackgroundPreview } from './background-preview'
import { ControlPanel } from './control-panel'
import { OutputPanel } from './output-panel'

export function BackgroundGenerator() {
	const [isMinimized, setIsMinimized] = useState(false)
	const { config, updateConfig, savedConfigs, saveConfig, loadConfig } =
		useBackgroundConfig()

	return (
		<div className="relative min-h-screen">
			<BackgroundPreview config={config} />
			<div
				className={`fixed inset-y-0 right-0 w-96 bg-section border p-6 transition-transform duration-300 ease-in-out ${
					isMinimized ? 'translate-x-full' : 'translate-x-0 '
				}`}
			>
				<button
					onClick={() => setIsMinimized(!isMinimized)}
					className="absolute top-4 left-0 transform -translate-x-full bg-section border !border-r-transparent text-subtitle p-2 rounded-l-md"
				>
					{isMinimized ? '<<' : '>>'}
				</button>
				<ControlPanel
					config={config}
					updateConfig={updateConfig}
					savedConfigs={savedConfigs}
					saveConfig={saveConfig}
					loadConfig={loadConfig}
				/>
				<OutputPanel config={config} />
			</div>
		</div>
	)
}
