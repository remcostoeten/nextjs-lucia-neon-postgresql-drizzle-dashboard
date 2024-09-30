export type Pattern = 'dot' | 'grid'
export type GradientDirection =
	| 'radial'
	| 'top'
	| 'bottom'
	| 'left'
	| 'right'
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right'
export type AnimationType = 'none' | 'shift' | 'rotate' | 'scale' | 'color'
export type DeviceSize = 'mobile' | 'tablet' | 'desktop'

export interface Layer {
	id: string
	pattern: Pattern
	tileSize: number
	patternColor: string
	backgroundColor: string
	gradientEnabled: boolean
	gradientDirection: GradientDirection
	gradientStartColor: string
	gradientEndColor: string
	gradientExtent: number
	animationEnabled: boolean
	animationType: AnimationType
	animationDuration: number
	animationDirection: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
	opacity: number
	blendMode: GlobalCompositeOperation
}

export interface BackgroundConfig {
	layers: Layer[]
}
