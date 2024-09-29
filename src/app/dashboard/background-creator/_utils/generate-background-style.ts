import { Layer } from './types'

export function generateBackgroundStyle(layer: Layer): React.CSSProperties {
	const style: React.CSSProperties = {
		backgroundColor: layer.backgroundColor,
	}

	if (layer.pattern === 'dot') {
		const dotSize = layer.tileSize / 2
		style.backgroundImage = `radial-gradient(${layer.patternColor} ${dotSize}px, transparent ${dotSize}px)`
		style.backgroundSize = `${layer.tileSize}px ${layer.tileSize}px`
		style.backgroundPosition = '0 0, 0 0'
	} else {
		style.backgroundImage = `linear-gradient(to right, ${layer.patternColor} 1px, transparent 1px),
      linear-gradient(to bottom, ${layer.patternColor} 1px, transparent 1px)`
		style.backgroundSize = `${layer.tileSize}px ${layer.tileSize}px`
		style.backgroundPosition = '0 0'
	}

	if (layer.gradientEnabled) {
		const gradientStyle = generateGradientStyle(layer)
		style.backgroundImage = `${gradientStyle}, ${style.backgroundImage}`
	}

	if (layer.animationEnabled) {
		style.animation = generateAnimationStyle(layer)
	}

	return style
}

function generateGradientStyle(layer: Layer): string {
	const { gradientDirection, gradientStartColor, gradientEndColor, gradientExtent } = layer

	if (gradientDirection === 'radial') {
		return `radial-gradient(circle, ${gradientStartColor} 0%, ${gradientEndColor} ${gradientExtent}%)`
	} else {
		const direction = gradientDirection.replace('-', ' ')
		return `linear-gradient(to ${direction}, ${gradientStartColor} 0%, ${gradientEndColor} ${gradientExtent}%)`
	}
}

function generateAnimationStyle(layer: Layer): string {
	const { animationType, animationDuration, animationDirection } = layer

	let keyframes = ''
	switch (animationType) {
		case 'shift':
			keyframes = 'backgroundShift'
			break
		case 'rotate':
			keyframes = 'backgroundRotate'
			break
		case 'scale':
			keyframes = 'backgroundScale'
			break
		case 'color':
			keyframes = 'backgroundColorChange'
			break
		default:
			return ''
	}

	return `${keyframes} ${animationDuration}s ${animationDirection} infinite`
}

// Add these keyframe animations to your global CSS file
/*
@keyframes backgroundShift {
  0% { background-position: 0 0; }
  100% { background-position: 100% 100%; }
}

@keyframes backgroundRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes backgroundScale {
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
}

@keyframes backgroundColorChange {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
*/
