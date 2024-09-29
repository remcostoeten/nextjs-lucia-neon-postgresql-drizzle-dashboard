import { useCallback, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BackgroundConfig, DeviceSize, Layer } from './types'

const defaultLayer: Layer = {
	id: uuidv4(),
	pattern: 'dot',
	tileSize: 20,
	patternColor: '#ffffff',
	backgroundColor: '#000000',
	gradientEnabled: false,
	gradientDirection: 'radial',
	gradientStartColor: '#ffffff',
	gradientEndColor: '#000000',
	gradientExtent: 50,
	animationEnabled: false,
	animationType: 'none',
	animationDuration: 5,
	animationDirection: 'normal',
	opacity: 1,
	blendMode: 'normal',
}

const defaultConfig: BackgroundConfig = {
	layers: [defaultLayer],
}

export function useBackgroundConfig() {
	const [config, setConfig] = useState<BackgroundConfig>(defaultConfig)
	const [savedConfigs, setSavedConfigs] = useState<BackgroundConfig[]>([])
	const [deviceSize, setDeviceSize] = useState<DeviceSize>('desktop')

	const historyRef = useRef<BackgroundConfig[]>([defaultConfig])
	const currentIndexRef = useRef(0)

	const updateConfig = useCallback((newConfig: BackgroundConfig) => {
		setConfig(newConfig)
		historyRef.current = historyRef.current.slice(0, currentIndexRef.current + 1)
		historyRef.current.push(newConfig)
		currentIndexRef.current++
	}, [])

	const updateLayer = useCallback((layerId: string, updates: Partial<Layer>) => {
		const newConfig = {
			...config,
			layers: config.layers.map((layer) =>
				layer.id === layerId ? { ...layer, ...updates } : layer
			),
		}
		updateConfig(newConfig)
	}, [config, updateConfig])

	const addLayer = useCallback(() => {
		const newConfig = {
			...config,
			layers: [...config.layers, { ...defaultLayer, id: uuidv4() }],
		}
		updateConfig(newConfig)
	}, [config, updateConfig])

	const removeLayer = useCallback((layerId: string) => {
		const newConfig = {
			...config,
			layers: config.layers.filter((layer) => layer.id !== layerId),
		}
		updateConfig(newConfig)
	}, [config, updateConfig])

	const reorderLayers = useCallback((startIndex: number, endIndex: number) => {
		const newLayers = Array.from(config.layers)
		const [reorderedItem] = newLayers.splice(startIndex, 1)
		newLayers.splice(endIndex, 0, reorderedItem)
		const newConfig = { ...config, layers: newLayers }
		updateConfig(newConfig)
	}, [config, updateConfig])

	const saveConfig = useCallback(() => {
		setSavedConfigs((prevConfigs) => [...prevConfigs, config])
	}, [config])

	const loadConfig = useCallback((loadedConfig: BackgroundConfig) => {
		updateConfig(loadedConfig)
	}, [updateConfig])

	const undo = useCallback(() => {
		if (currentIndexRef.current > 0) {
			currentIndexRef.current--
			setConfig(historyRef.current[currentIndexRef.current])
		}
	}, [])

	const redo = useCallback(() => {
		if (currentIndexRef.current < historyRef.current.length - 1) {
			currentIndexRef.current++
			setConfig(historyRef.current[currentIndexRef.current])
		}
	}, [])

	return {
		config,
		updateLayer,
		addLayer,
		removeLayer,
		reorderLayers,
		savedConfigs,
		saveConfig,
		loadConfig,
		deviceSize,
		setDeviceSize,
		undo,
		redo,
		canUndo: currentIndexRef.current > 0,
		canRedo: currentIndexRef.current < historyRef.current.length - 1,
	}
}
