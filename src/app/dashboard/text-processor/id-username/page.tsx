'use client'

import TextProcessor from '@/components/features/text-processor/text-processor'

const extractIdAndUsername = (
	input: string,
	options: Record<string, boolean>
): string => {
	const lines = input.split('\n')
	return lines
		.map(line => {
			const idMatch = line.match(/id[:=]?\s*"?(\d+)"?/i)
			const usernameMatch = line.match(
				/(?:user|name)[:=]?\s*"?([^"\n]+)"?/i
			)

			let result = ''
			if (options.keepId && idMatch) {
				result += `ID: ${idMatch[1]}`
			}
			if (options.keepUsername && usernameMatch) {
				result += (result ? ', ' : '') + `Username: ${usernameMatch[1]}`
			}
			return result || line
		})
		.filter(line => line.trim() !== '')
		.join('\n')
}

const processorOptions = [
	{ id: 'keepId', label: 'Keep ID' },
	{ id: 'keepUsername', label: 'Keep Username' }
]

export default function IDUsernameProcessorPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">
				ID and Username Extractor
			</h1>
			<TextProcessor
				processorFunction={extractIdAndUsername}
				processorName="ID and Username Extractor"
				processorType="id-username-extractor"
				options={processorOptions}
				optionType="checkbox"
			/>
		</div>
	)
}
