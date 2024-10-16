'use client'

import EnhancedCodeBlock from '@/components/elements/display-code/code-block'
import { saveProcessedText } from 'actions'
import { ChevronDown, Clipboard, Loader2, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	Checkbox,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Input,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Textarea
} from 'ui'

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

export default function TextProcessor({
	processorFunction,
	processorName,
	processorType,
	options
}: TextProcessorProps) {
	const [input, setInput] = useState('')
	const [output, setOutput] = useState('')
	const [tableData, setTableData] = useState<string[][]>([])
	const [isProcessing, setIsProcessing] = useState(false)
	const [saveTitle, setSaveTitle] = useState('')
	const [selectedOptions, setSelectedOptions] = useState<
		Record<string, boolean>
	>(options.reduce((acc, option) => ({ ...acc, [option.id]: false }), {}))
	const [formatOptions, setFormatOptions] = useState({
		removeEmptyLines: false,
		removeDuplicates: false,
		removeLinesWith: '',
		keepLinesWith: '',
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
		setTableData([])
		toast.info('Input and output cleared')
	}

	const handleOptionChange = (optionId: string, value: boolean) => {
		setSelectedOptions(prev => ({ ...prev, [optionId]: value }))
	}

	const handleFormatOptionChange = (
		optionId: keyof typeof formatOptions,
		value: boolean | string
	) => {
		setFormatOptions(prev => ({ ...prev, [optionId]: value }))
	}

	const applyFormatOptions = (text: string): string => {
		let lines = text.split('\n')

		if (formatOptions.removeEmptyLines) {
			lines = lines.filter(line => line.trim() !== '')
		}

		if (formatOptions.removeDuplicates) {
			lines = [...new Set(lines)]
		}

		if (formatOptions.removeLinesWith) {
			lines = lines.filter(
				line => !line.includes(formatOptions.removeLinesWith)
			)
		}

		if (formatOptions.keepLinesWith) {
			lines = lines.filter(line =>
				line.includes(formatOptions.keepLinesWith)
			)
		}

		if (formatOptions.removeEmojis) {
			const emojiRegex =
				/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu
			lines = lines.filter(line => !emojiRegex.test(line))
		}

		return lines.join('\n')
	}

	const handleProcess = () => {
		setIsProcessing(true)
		setTimeout(() => {
			let processed = processorFunction(input, selectedOptions)
			processed = applyFormatOptions(processed)
			setOutput(processed)

			// Convert processed text to table data
			const lines = processed
				.split('\n')
				.filter(line => line.trim() !== '')
			const newTableData = lines.map(line =>
				line.split(',').map(item => item.trim())
			)
			setTableData(newTableData)

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
			console.error('Save error details:', result.error)
			toast.error(`Failed to save to list: ${result.error}`)
		}
	}

	const isFilled = input.trim() !== '' || output.trim() !== ''

	return (
		<div className="flex flex-col space-y-4 p-4 bg-gray-900 text-white min-h-screen">
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
					onChange={e => setInput(e.target.value)}
					placeholder="Paste your text here..."
					className="w-full h-64 bg-gray-800 text-white border-gray-700 pr-20"
				/>
				<span className="absolute bottom-2 right-2 text-sm text-gray-400">
					{input.length} characters | {input.split('\n').length} lines
				</span>
			</div>

			<div className="flex flex-wrap items-center space-x-4 bg-gray-800 p-4 rounded-lg">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="w-40">
							Processing Options{' '}
							<ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-40">
						{options.map(option => (
							<DropdownMenuItem
								key={option.id}
								className="flex items-center space-x-2"
							>
								<Checkbox
									id={option.id}
									checked={selectedOptions[option.id]}
									onCheckedChange={checked =>
										handleOptionChange(
											option.id,
											checked as boolean
										)
									}
								/>
								<Label htmlFor={option.id}>
									{option.label}
								</Label>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="w-40">
							Format Options{' '}
							<ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuItem className="flex items-center space-x-2">
							<Checkbox
								id="removeEmptyLines"
								checked={formatOptions.removeEmptyLines}
								onCheckedChange={checked =>
									handleFormatOptionChange(
										'removeEmptyLines',
										checked as boolean
									)
								}
							/>
							<Label htmlFor="removeEmptyLines">
								Remove Empty Lines
							</Label>
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center space-x-2">
							<Checkbox
								id="removeDuplicates"
								checked={formatOptions.removeDuplicates}
								onCheckedChange={checked =>
									handleFormatOptionChange(
										'removeDuplicates',
										checked as boolean
									)
								}
							/>
							<Label htmlFor="removeDuplicates">
								Remove Duplicates
							</Label>
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center space-x-2">
							<Checkbox
								id="removeEmojis"
								checked={formatOptions.removeEmojis}
								onCheckedChange={checked =>
									handleFormatOptionChange(
										'removeEmojis',
										checked as boolean
									)
								}
							/>
							<Label htmlFor="removeEmojis">Remove Emojis</Label>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<div className="flex items-center space-x-2">
					<Label htmlFor="removeLinesWith" className="w-40">
						Remove Lines With:
					</Label>
					<Input
						id="removeLinesWith"
						value={formatOptions.removeLinesWith}
						onChange={e =>
							handleFormatOptionChange(
								'removeLinesWith',
								e.target.value
							)
						}
						className="w-40 bg-gray-700 text-white border-gray-600"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<Label htmlFor="keepLinesWith" className="w-40">
						Keep Lines With:
					</Label>
					<Input
						id="keepLinesWith"
						value={formatOptions.keepLinesWith}
						onChange={e =>
							handleFormatOptionChange(
								'keepLinesWith',
								e.target.value
							)
						}
						className="w-40 bg-gray-700 text-white border-gray-600"
					/>
				</div>

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

			{isFilled && (
				<div className="space-y-4">
					<EnhancedCodeBlock
						code={output}
						fileName="processed-output.txt"
						language="plaintext"
						badges={[processorName]}
					/>

					{tableData.length > 0 && (
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										{tableData[0].map((header, index) => (
											<TableHead key={index}>
												{header}
											</TableHead>
										))}
									</TableRow>
								</TableHeader>
								<TableBody>
									{tableData.slice(1).map((row, rowIndex) => (
										<TableRow key={rowIndex}>
											{row.map((cell, cellIndex) => (
												<TableCell key={cellIndex}>
													{cell}
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					)}

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
										onChange={e =>
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
c
