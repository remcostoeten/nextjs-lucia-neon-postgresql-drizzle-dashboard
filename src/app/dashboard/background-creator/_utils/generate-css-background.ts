import { generateBackgroundStyle } from './generate-background-style'
import { BackgroundConfig } from './types'

export function generateCSSBackground(config: BackgroundConfig): string {
	const backgroundStyle = generateBackgroundStyle(config)
	const cssString = Object.entries(backgroundStyle)
		.map(
			([key, value]) =>
				`${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
		)
		.join('\n  ')

	return `.background {
  ${cssString}
}`
}
