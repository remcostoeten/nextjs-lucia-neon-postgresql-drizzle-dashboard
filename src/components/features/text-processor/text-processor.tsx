'use client'

import {
	Button,
	Checkbox,
	Input,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
	RadioGroup,
	RadioGroupItem,
	Textarea
} from 'ui'
import EnhancedCodeBlock from '@/components/elements/display-code/code-block'
import { saveProcessedText } from 'actions'
import { Clipboard, Loader2, X } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

type ProcessorOption = {
	id: string
	label: string
}

type ProcessorFunction = (
	input: string,
	options: Record<string, boolean>
) => string

interface TextProcessorProps {
	processorFunction: ProcessorFunction
	processorName: string
	processorType: string
	options: ProcessorOption[]
	optionType: 'checkbox' | 'radio'
}

const TextProcessor: React.FC<TextProcessorProps> = ({
	processorFunction,
	processorName,
	processorType,
	options,
	optionType
}) => {
	const [input, setInput] = useState('')
	const [output, setOutput] = useState('')
	const [isProcessing, setIsProcessing] = useState(false)
	const [saveTitle, setSaveTitle] = useState('')
	const [selectedOptions, setSelectedOptions] = useState<
		Record<string, boolean>
	>(options.reduce((acc, option) => ({ ...acc, [option.id]: false }), {}))
	const [formatOptions, setFormatOptions] = useState({
		removeEmptyLines: false,
		removeDuplicates: false,
		removeLinesWith: '',
		removeEmojis: false
	})

	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText()
			setInput(text)
			toast.success('Text pasted successfully')
		} catch (err) {
			console.error('Failed to read clipboard contents: ', err)
			toast.error('Failed to paste text')
		}
	}

	const handleClear = () => {
		setInput('')
		setOutput('')
		toast.info('Input and output cleared')
	}

	const handleOptionChange = (optionId: string, value: boolean) => {
		if (optionType === 'radio') {
			setSelectedOptions(
				Object.keys(selectedOptions).reduce(
					(acc, key) => ({
						...acc,
						[key]: key === optionId
					}),
					{}
				)
			)
		} else {
			setSelectedOptions((prev) => ({ ...prev, [optionId]: value }))
		}
	}

	const handleFormatOptionChange = (
		optionId: keyof typeof formatOptions,
		value: boolean | string
	) => {
		setFormatOptions((prev) => ({ ...prev, [optionId]: value }))
	}

	const applyFormatOptions = (text: string): string => {
		let lines = text.split('\n')

		if (formatOptions.removeEmptyLines) {
			lines = lines.filter((line) => line.trim() !== '')
		}

		if (formatOptions.removeDuplicates) {
			lines = [...new Set(lines)]
		}

		if (formatOptions.removeLinesWith) {
			lines = lines.filter(
				(line) => !line.includes(formatOptions.removeLinesWith)
			)
		}

		if (formatOptions.removeEmojis) {
			const emojiRegex =
				/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu
			lines = lines.filter((line) => !emojiRegex.test(line))
		}

		return lines.join('\n')
	}

	const handleProcess = () => {
		setIsProcessing(true)
		setTimeout(() => {
			let processed = processorFunction(input, selectedOptions)
			processed = applyFormatOptions(processed)
			setOutput(processed)
			setIsProcessing(false)
			toast.success('Text processed successfully')
		}, 100)
	}

	const handleSave = async () => {
		if (!saveTitle.trim()) {
			toast.error('Please enter a title for the list')
			return
		}

		const result = await saveProcessedText(saveTitle, output, processorType)
		if (result.success) {
			toast.success('Saved to list successfully')
			setSaveTitle('')
		} else {
			toast.error('Failed to save to list')
		}
	}

	return (
		<div className="flex flex-col space-y-4 p-4 bg-gray-900 text-white min-h-screen">
			<h1 className="text-2xl font-bold">
				{processorName} Text Processor
			</h1>
			<div className="relative">
				<div className="absolute top-2 right-2 flex space-x-2">
					<Button
						size="icon"
						variant="ghost"
						onClick={handlePaste}
						disabled={isProcessing}
						title="Paste"
					>
						<Clipboard className="h-4 w-4" />
					</Button>
					<Button
						size="icon"
						variant="ghost"
						onClick={handleClear}
						disabled={!input || isProcessing}
						title="Clear"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
				<Textarea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Paste your text here..."
					className="w-full h-64 bg-gray-800 text-white border-gray-700 pr-20"
				/>
				<span className="absolute bottom-2 right-2 text-sm text-gray-400">
					{input.length} characters | {input.split('\n').length} lines
				</span>
			</div>
			<div className="flex flex-col space-y-2">
				<h2 className="text-lg font-semibold">Processing Options</h2>
				{optionType === 'checkbox' ? (
					options.map((option) => (
						<div
							key={option.id}
							className="flex items-center space-x-2"
						>
							<Checkbox
								id={option.id}
								checked={selectedOptions[option.id]}
								onCheckedChange={(checked) =>
									handleOptionChange(
										option.id,
										checked as boolean
									)
								}
							/>
							<Label htmlFor={option.id}>{option.label}</Label>
						</div>
					))
				) : (
					<RadioGroup
						onValueChange={(value) =>
							handleOptionChange(value, true)
						}
						value={
							Object.keys(selectedOptions).find(
								(key) => selectedOptions[key]
							) || ''
						}
					>
						{options.map((option) => (
							<div
								key={option.id}
								className="flex items-center space-x-2"
							>
								<RadioGroupItem
									value={option.id}
									id={option.id}
								/>
								<Label htmlFor={option.id}>
									{option.label}
								</Label>
							</div>
						))}
					</RadioGroup>
				)}
			</div>
			<div className="flex flex-col space-y-2">
				<h2 className="text-lg font-semibold">
					Output Formatting Options
				</h2>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="removeEmptyLines"
						checked={formatOptions.removeEmptyLines}
						onCheckedChange={(checked) =>
							handleFormatOptionChange(
								'removeEmptyLines',
								checked as boolean
							)
						}
					/>
					<Label htmlFor="removeEmptyLines">Remove Empty Lines</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="removeDuplicates"
						checked={formatOptions.removeDuplicates}
						onCheckedChange={(checked) =>
							handleFormatOptionChange(
								'removeDuplicates',
								checked as boolean
							)
						}
					/>
					<Label htmlFor="removeDuplicates">Remove Duplicates</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="removeEmojis"
						checked={formatOptions.removeEmojis}
						onCheckedChange={(checked) =>
							handleFormatOptionChange(
								'removeEmojis',
								checked as boolean
							)
						}
					/>
					<Label htmlFor="removeEmojis">
						Remove Lines Containing Emojis
					</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Label htmlFor="removeLinesWith">
						Remove Lines Containing:
					</Label>
					<Input
						id="removeLinesWith"
						value={formatOptions.removeLinesWith}
						onChange={(e) =>
							handleFormatOptionChange(
								'removeLinesWith',
								e.target.value
							)
						}
						className="w-40 bg-gray-800 text-white border-gray-700"
					/>
				</div>
			</div>
			<div className="flex justify-end">
				<Button
					onClick={handleProcess}
					disabled={!input || isProcessing}
				>
					{isProcessing ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						'Process'
					)}
				</Button>
			</div>
			{output && (
				<div className="space-y-4">
					<EnhancedCodeBlock
						code={output}
						fileName="processed-output.txt"
						language="plaintext"
						badges={[processorName]}
					/>
					<div className="flex space-x-2">
						<Popover>
							<PopoverTrigger asChild>
								<Button>Save to List</Button>
							</PopoverTrigger>
							<PopoverContent className="w-80">
								<div className="space-y-2">
									<Input
										type="text"
										placeholder="Enter title"
										value={saveTitle}
										onChange={(e) =>
											setSaveTitle(e.target.value)
										}
									/>
									<Button onClick={handleSave}>Save</Button>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			)}
		</div>
	)
}

export default TextProcessor
