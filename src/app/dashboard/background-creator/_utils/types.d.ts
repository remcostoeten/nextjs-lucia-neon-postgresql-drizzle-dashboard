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

export interface BackgroundConfig {
	pattern: Pattern
	dotSize: number
	dotSpacing: number
	gridSize: number
	lineWidth: number
	patternColor: string
	backgroundColor: string
	gradientEnabled: boolean
	gradientDirection: GradientDirection
	gradientStartColor: string
	gradientEndColor: string
	gradientExtent: number
	animationEnabled: boolean
	animationType: 'shift' | 'color'
	animationDuration: number
}
