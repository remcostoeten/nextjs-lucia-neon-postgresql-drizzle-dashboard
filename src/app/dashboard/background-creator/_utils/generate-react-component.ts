import { BackgroundConfig } from './bg-creator.types'
import { generateBackgroundStyle } from './generate-background-style'

export function generateReactComponent(config: BackgroundConfig): string {
	const backgroundStyle = generateBackgroundStyle(config)
	const styleString = Object.entries(backgroundStyle)
		.map(([key, value]) => `${key}: '${value}'`)
		.join(',\n    ')

	return `import React from 'react'

export function BackgroundComponent() {
  const style = {
    ${styleString}
  }

  return <div style={style} className="absolute inset-0" />
}
`
}
