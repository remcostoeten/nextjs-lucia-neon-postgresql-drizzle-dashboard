import { BackgroundConfig } from '../_utils/types'
import { generateBackgroundStyle } from '../_utils/use-background-config'

export function BackgroundPreview({ config }: { config: BackgroundConfig }) {
	const backgroundStyle = generateBackgroundStyle(config)

	return (
		<div
			className="absolute inset-0 transition-all duration-300 ease-in-out"
			style={backgroundStyle}
		/>
	)
}
