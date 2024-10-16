'use client'

import TextProcessor from '@/components/features/text-processor/text-processor'

const removeNumbers = (input: string): string => {
	return input
		.split('\n')
		.filter(line => !/\d/.test(line))
		.join('\n')
}

export default function IGParserPage() {
	return (
		<TextProcessor
			processorFunction={removeNumbers}
			processorName="Number Remover"
			processorType={''}
			options={[]}
			optionType={'checkbox'}
		/>
	)
}
