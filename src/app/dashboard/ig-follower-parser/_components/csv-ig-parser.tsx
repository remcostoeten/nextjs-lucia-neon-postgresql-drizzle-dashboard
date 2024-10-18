'use client'

import CsvModifier from '@/components/aside/route-specific/ig-parsed-aside'
import {
	fetchProcessedTextById,
	fetchProcessedTexts,
	saveProcessedText
} from '@/core/server/actions/save-parsed-output'
import { useClientAuth } from '@/core/server/auth/client-auth-utils'
import confetti from 'canvas-confetti'
import {
	ChevronDown,
	ChevronUp,
	Clipboard,
	ClipboardCheck,
	Copy,
	FileText,
	Play,
	Save,
	Trash2
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	Card,
	Input,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
	RadioGroup,
	RadioGroupItem,
	ScrollArea,
	Textarea
} from 'ui'

type Statistics = {
	processed: number
	ignored: number
	failed: string[]
}

export default function CsvIgParser() {
	const [input, setInput] = useState('')
	const [output, setOutput] = useState('')
	const [mode, setMode] = useState('both')
	const [isLoading, setIsLoading] = useState(false)
	const [statistics, setStatistics] = useState<Statistics>({
		processed: 0,
		ignored: 0,
		failed: []
	})
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isPasted, setIsPasted] = useState(false)
	const [isCopied, setIsCopied] = useState(false)
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	const [noteTitle, setNoteTitle] = useState('')
	const router = useRouter()
	const { clientCheckAuth, clientSignOut } = useClientAuth()
	const searchParams = useSearchParams()

	useEffect(() => {
		const checkAuthentication = async () => {
			const user = await clientCheckAuth()
			if (!user) {
				toast.error('You must be logged in to use this feature')
				router.push('/login')
			}
		}
		checkAuthentication()
	}, [router, clientCheckAuth])

	useEffect(() => {
		const selectedOutputId = searchParams.get('selectedOutput')
		if (selectedOutputId) {
			fetchSelectedOutput(selectedOutputId)
		}
	}, [searchParams])

	useEffect(() => {
		if (input) {
			processData()
		}
	}, [input])

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value)
		setIsPasted(false)
	}

	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText()
			setInput(text)
			setIsPasted(true)
			toast.success('Content pasted successfully')
		} catch (err) {
			console.error('Failed to read clipboard contents: ', err)
			toast.error('Failed to paste content')
		}
	}

	const handleClear = () => {
		setInput('')
		setOutput('')
		setStatistics({ processed: 0, ignored: 0, failed: [] })
		setIsPasted(false)
		setIsCopied(false)
		toast.info('Input and output cleared')
	}

	const processData = () => {
		setIsLoading(true)
		const lines = input.split('\n')
		let processed = 0
		let ignored = 0
		let failed: string[] = []
		let result: string[] = []

		lines.forEach((line, index) => {
			// Remove surrounding quotes from the entire line
			const trimmedLine = line.trim().replace(/^"|"$/g, '')

			if (trimmedLine) {
				// Use regex to match the pattern "User ID","Username" at the start of the line
				const match = trimmedLine.match(/^"?(\d+)"?,"?([^,"]+)"?/)

				if (match) {
					const [, id, username] = match
					// Validate username (allow letters, numbers, dots, underscores)
					if (/^[a-zA-Z0-9._]+$/.test(username)) {
						if (
							mode === 'both' ||
							(mode === 'id' && id) ||
							(mode === 'username' && username)
						) {
							result.push(`${id},${username}`)
							processed++
						} else {
							ignored++
						}
					} else {
						ignored++
					}
				} else {
					failed.push(`Line ${index + 1}: Invalid format`)
				}
			} else {
				ignored++
			}
		})

		setOutput(result.join('\n'))
		setStatistics({ processed, ignored, failed })
		setIsLoading(false)
		toast.success('Data processed successfully')
		confetti()
	}

	const handleSaveParsedOutput = async () => {
		if (!output) {
			toast.error('No output to save')
			return
		}
		if (!noteTitle) {
			toast.error('Please enter a title for the parsed output')
			return
		}
		const result = await fetchProcessedTexts(output, noteTitle)
		if (result.success) {
			toast.success('Output saved successfully')
			setNoteTitle('')
		} else {
			toast.error(result.error)
		}
	}

	const handleCopyOutput = () => {
		navigator.clipboard.writeText(output)
		setIsCopied(true)
		toast.success('Output copied to clipboard')
		setTimeout(() => setIsCopied(false), 2000)
	}

	const handleSaveList = () => {
		setIsPopoverOpen(true)
	}

	const saveFile = (format: string) => {
		let mimeType = 'text/csv'
		let extension = 'csv'
		let content = output

		if (format === 'json') {
			mimeType = 'application/json'
			extension = 'json'
			content = JSON.stringify(
				output.split('\n').map(line => {
					const [id, username] = line.split(',')
					return { id, username }
				}),
				null,
				2
			)
		} else if (format === 'txt') {
			mimeType = 'text/plain'
			extension = 'txt'
		}

		const blob = new Blob([content], { type: mimeType })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `processed_list.${extension}`
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
		setIsPopoverOpen(false)
		toast.success(`File saved as ${extension.toUpperCase()}`)
	}

	const handleSignOut = async () => {
		await clientSignOut()
		router.push('/login')
	}

	const fetchSelectedOutput = async (outputId: string) => {
		try {
			const result = await fetchProcessedTextById(outputId)
			if (result.success && result.data) {
				setInput(result.data.content)
				setOutput(result.data.content) // Also update the output state
				setNoteTitle(result.data.title)
				toast.success(`Loaded: ${result.data.title}`)
			} else {
				console.error('Failed to load selected output:', result.error)
				toast.error('Failed to load selected output')
			}
		} catch (error) {
			console.error('Error fetching selected output:', error)
			toast.error('Failed to load selected output')
		}
	}

	return (
		<div className="flex h-screen border-t border-r ">
			<CsvModifier />
			<div className="flex-1 p-4 overflow-auto">
				<div className="space-y-4">
					<Card className="p-6 bg-card border-[#3e3e42]">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-bold text-white">
								Input
							</h2>
							<div className="space-x-2">
								<Button
									onClick={handlePaste}
									className="bg-[#3e3e42] text-white"
								>
									{isPasted ? (
										<ClipboardCheck className="w-4 h-4 mr-2" />
									) : (
										<Clipboard className="w-4 h-4 mr-2" />
									)}
									{isPasted ? 'Pasted' : 'Paste'}
								</Button>
								<Button
									onClick={handleClear}
									className="bg-[#3e3e42] text-white"
								>
									<Trash2 className="w-4 h-4 mr-2" />
									Clear
								</Button>
								<Button
									onClick={handleSignOut}
									className="bg-red-600 text-white"
								>
									Sign Out
								</Button>
							</div>
						</div>
						<Textarea
							value={input}
							onChange={handleInputChange}
							placeholder="Paste your CSV data here..."
							className="h-40 mb-4 bg-[#1e1e1e] text-white border-[#3e3e42]"
						/>
						<div className="flex justify-between items-center">
							<RadioGroup
								defaultValue="both"
								className="flex space-x-4"
								onValueChange={setMode}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="both" id="both" />
									<Label
										htmlFor="both"
										className="text-white"
									>
										Both
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="id" id="id" />
									<Label htmlFor="id" className="text-white">
										ID Only
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="username"
										id="username"
									/>
									<Label
										htmlFor="username"
										className="text-white"
									>
										Username Only
									</Label>
								</div>
							</RadioGroup>
							<Button
								onClick={processData}
								className="bg-[#0e639c] text-white"
							>
								{isLoading ? (
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
								) : (
									<>
										<Play className="w-4 h-4 mr-2" />
										Process
									</>
								)}
							</Button>
						</div>
					</Card>

					<Card className="p-6 bg-card border-[#3e3e42]">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-bold text-white">
								Output
							</h2>
							<div className="space-x-2">
								<Button
									onClick={handleCopyOutput}
									className="bg-[#3e3e42] text-white"
								>
									{isCopied ? (
										<ClipboardCheck className="w-4 h-4 mr-2" />
									) : (
										<Copy className="w-4 h-4 mr-2" />
									)}
									{isCopied ? 'Copied!' : 'Copy'}
								</Button>
								<Popover
									open={isPopoverOpen}
									onOpenChange={setIsPopoverOpen}
								>
									<PopoverTrigger asChild>
										<Button
											onClick={handleSaveList}
											className="bg-[#0e639c] text-white"
										>
											<Save className="w-4 h-4 mr-2" />
											Save List
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-48 bg-card border-[#3e3e42]">
										<div className="flex flex-col space-y-2">
											<Button
												onClick={() => saveFile('csv')}
												className="w-full justify-start text-white hover:bg-[#3e3e42]"
											>
												<FileText className="w-4 h-4 mr-2" />
												CSV
											</Button>
											<Button
												onClick={() => saveFile('json')}
												className="w-full justify-start text-white hover:bg-[#3e3e42]"
											>
												<FileText className="w-4 h-4 mr-2" />
												JSON
											</Button>
											<Button
												onClick={() => saveFile('txt')}
												className="w-full justify-start text-white hover:bg-[#3e3e42]"
											>
												<FileText className="w-4 h-4 mr-2" />
												TXT
											</Button>
										</div>
									</PopoverContent>
								</Popover>
								<Input
									value={noteTitle}
									onChange={e => setNoteTitle(e.target.value)}
									placeholder="Parsed Output Title"
									className="w-40 bg-[#1e1e1e] text-white border-[#3e3e42]"
								/>
								<Button
									onClick={handleSaveParsedOutput}
									className="bg-[#0e639c] text-white"
								>
									Save Parsed Output
								</Button>
								<Button
									onClick={() => setIsCollapsed(!isCollapsed)}
									className="bg-[#3e3e42] text-white"
								>
									{isCollapsed ? (
										<ChevronDown className="w-4 h-4 mr-2" />
									) : (
										<ChevronUp className="w-4 h-4 mr-2" />
									)}
									{isCollapsed ? 'Expand' : 'Collapse'}
								</Button>
							</div>
						</div>
						<ScrollArea
							className={`max-h-[50vh] ${isCollapsed ? 'hidden' : ''}`}
						>
							<pre className="text-sm bg-[#1e1e1e] p-4 rounded-md overflow-x-auto">
								<code className="text-white">
									{output ||
										'No output yet. Process some data to see results.'}
								</code>
							</pre>
						</ScrollArea>
						<div className="mt-4 text-white">
							<h3 className="text-lg font-semibold">
								Statistics
							</h3>
							<p>Processed: {statistics.processed}</p>
							<p>Ignored: {statistics.ignored}</p>
							{statistics.failed.length > 0 && (
								<div>
									<p>Failed lines:</p>
									<ul className="list-disc list-inside">
										{statistics.failed.map(
											(failure, index) => (
												<li key={index}>{failure}</li>
											)
										)}
									</ul>
								</div>
							)}
						</div>
					</Card>
				</div>
			</div>
		</div>
	)
}
