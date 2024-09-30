import { BackgroundConfig } from './bg-creator.types'
import { generateBackgroundStyle } from './generate-background-style'

export function generateCSSPseudo(config: BackgroundConfig): string {
	const backgroundStyle = generateBackgroundStyle(config)
	const cssString = Object.entries(backgroundStyle)
		.map(
			([key, value]) =>
				`${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
		)
		.join('\n    ')

	return `.element::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  ${cssString}
}`
}
