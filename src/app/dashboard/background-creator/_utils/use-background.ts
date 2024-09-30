'use client'

import { useCallback, useState } from 'react'
import { BackgroundConfig } from './bg-creator.types'

const defaultConfig: BackgroundConfig = {
	pattern: 'dot',
	dotSize: 5,
	dotSpacing: 20,
	gridSize: 50,
	lineWidth: 1,
	patternColor: '#ffffff',
	backgroundColor: '#000000',
	gradientEnabled: false,
	gradientDirection: 'radial',
	gradientStartColor: '#ffffff',
	gradientEndColor: '#000000',
	gradientExtent: 50,
	animationEnabled: false,
	animationType: 'shift',
	animationDuration: 5
}

export function useBackgroundConfig() {
	const [config, setConfig] = useState<BackgroundConfig>(defaultConfig)
	const [savedConfigs, setSavedConfigs] = useState<BackgroundConfig[]>([])

	const updateConfig = useCallback((updates: Partial<BackgroundConfig>) => {
		setConfig(prevConfig => ({ ...prevConfig, ...updates }))
	}, [])

	const saveConfig = useCallback(() => {
		setSavedConfigs(prevConfigs => [...prevConfigs, config])
	}, [config])

	const loadConfig = useCallback((loadedConfig: BackgroundConfig) => {
		setConfig(loadedConfig)
	}, [])

	return { config, updateConfig, savedConfigs, saveConfig, loadConfig }
}
