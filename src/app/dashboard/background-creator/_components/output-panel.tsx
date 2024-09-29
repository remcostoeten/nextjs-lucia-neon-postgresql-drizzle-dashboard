import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from 'ui'
import { generateCSSBackground } from '../_utils/generate-css-background'
import { generateReactComponent } from '../_utils/generate-react-component'
import { BackgroundConfig } from '../_utils/types'
import { generateCSSPseudo } from '../_utils/generate-pss-psuedo'

type OutputFormat = 'react' | 'css-background' | 'css-pseudo'

export function OutputPanel({ config }: { config: BackgroundConfig }) {
	const [outputFormat, setOutputFormat] = useState<OutputFormat>('react')

	const getOutput = () => {
		switch (outputFormat) {
			case 'react':
				return generateReactComponent(config)
			case 'css-background':
				return generateCSSBackground(config)
			case 'css-pseudo':
				return generateCSSPseudo(config)
		}
	}

	return (
		<div className="mt-6">
			<h3 className="text-xl font-bold mb-2">Output</h3>
			<RadioGroup
				value={outputFormat}
				onValueChange={value => setOutputFormat(value as OutputFormat)}
				className="flex space-x-4 mb-4"
			>
				<div className="flex items-center">
					<RadioGroupItem value="react" id="react" />
					<label htmlFor="react" className="ml-2">
						React Component
					</label>
				</div>
				<div className="flex items-center">
					<RadioGroupItem
						value="css-background"
						id="css-background"
					/>
					<label htmlFor="css-background" className="ml-2">
						CSS Background
					</label>
				</div>
				<div className="flex items-center">
					<RadioGroupItem value="css-pseudo" id="css-pseudo" />
					<label htmlFor="css-pseudo" className="ml-2">
						CSS Pseudo
					</label>
				</div>
			</RadioGroup>
			<pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
				<code>{getOutput()}</code>
			</pre>
		</div>
	)
}
