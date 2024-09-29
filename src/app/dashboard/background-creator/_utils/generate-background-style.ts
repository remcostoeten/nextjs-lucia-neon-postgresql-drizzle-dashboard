import { BackgroundConfig } from './types'

export function generateBackgroundStyle(
	config: BackgroundConfig
): React.CSSProperties {
	const style: React.CSSProperties = {
		backgroundColor: config.backgroundColor
	}

	if (config.pattern === 'dot') {
		style.backgroundImage = `radial-gradient(${config.patternColor} ${config.dotSize}px, transparent ${config.dotSize}px)`
		style.backgroundSize = `${config.dotSpacing}px ${config.dotSpacing}px`
	} else {
		style.backgroundImage = `linear-gradient(to right, ${config.patternColor} ${config.lineWidth}px, transparent ${config.lineWidth}px),
      linear-gradient(to bottom, ${config.patternColor} ${config.lineWidth}px, transparent ${config.lineWidth}px)`
		style.backgroundSize = `${config.gridSize}px ${config.gridSize}px`
	}

	if (config.gradientEnabled) {
		const gradientStyle = generateGradientStyle(config)
		style.backgroundImage = `${gradientStyle}, ${style.backgroundImage}`
	}

	if (config.animationEnabled) {
		style.animation = generateAnimationStyle(config)
	}

	return style
}

function generateGradientStyle(config: BackgroundConfig): string {
	const {
		gradientDirection,
		gradientStartColor,
		gradientEndColor,
		gradientExtent
	} = config

	if (gradientDirection === 'radial') {
		return `radial-gradient(circle, ${gradientStartColor} 0%, ${gradientEndColor} ${gradientExtent}%)`
	} else {
		const direction = gradientDirection.replace('-', ' ')
		return `linear-gradient(to ${direction}, ${gradientStartColor} 0%, ${gradientEndColor} ${gradientExtent}%)`
	}
}

function generateAnimationStyle(config: BackgroundConfig): string {
	const { animationType, animationDuration } = config

	if (animationType === 'shift') {
		return `backgroundShift ${animationDuration}s infinite alternate`
	} else {
		return `colorChange ${animationDuration}s infinite alternate`
	}
}
