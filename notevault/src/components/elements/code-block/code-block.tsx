'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from 'cn'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ArrowDown,
	ArrowUp,
	Check,
	CheckCircle2,
	ChevronDown,
	Copy,
	Code as DefaultIcon,
	File,
	Search,
	X
} from 'lucide-react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Button } from 'ui'

import { ANIMATION_VARIANTS, COPY_VARIANTS, TOAST_VARIANTS } from './animations'
import { customTheme } from './custom-theme'
import * as Icons from './icons'

function getLanguageIcon(language: string) {
	switch (language.toLowerCase()) {
		case 'typescript':
			return <Icons.TypescriptIcon size={16} />
		case 'python':
			return <Icons.PythonIcon size={16} />
		case 'rust':
			return <Icons.RustIcon size={16} />
		case 'sql':
			return <Icons.SqlLogo size={16} />
		case 'drizzle':
			return <Icons.SqlLogo size={16} />
		default:
			return <DefaultIcon size={16} />
	}
}

function calculateCodeStats(code: string) {
	const lines = code.split('\n').length
	const chars = code.length
	const words = code.trim().split(/\s+/).length
	return { lines, chars, words }
}

type BadgeVariant =
	| 'default'
	| 'primary'
	| 'secondary'
	| 'success'
	| 'warning'
	| 'danger'
	| 'custom'

interface BadgeProps {
	variant?: BadgeVariant
	customColor?: string
}

function getBadgeClasses({
	variant = 'default',
	customColor
}: BadgeProps): string {
	const baseClasses =
		'px-2 py-0.5 text-xs font-medium rounded-full transition-all duration-200'

	if (variant === 'custom' && customColor) {
		return `${baseClasses} border border-${customColor}-500/30 bg-${customColor}-500/10 text-${customColor}-400 hover:border-${customColor}-400 hover:text-${customColor}-300`
	}

	switch (variant) {
		case 'primary':
			return `${baseClasses} border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:border-blue-400 hover:text-blue-300`
		case 'secondary':
			return `${baseClasses} border border-purple-500/30 bg-purple-500/10 text-purple-400 hover:border-purple-400 hover:text-purple-300`
		case 'success':
			return `${baseClasses} border border-green-500/30 bg-green-500/10 text-green-400 hover:border-green-400 hover:text-green-300`
		case 'warning':
			return `${baseClasses} border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:border-yellow-400 hover:text-yellow-300`
		case 'danger':
			return `${baseClasses} border border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-400 hover:text-red-300`
		default:
			return `${baseClasses} border border-[#333333] bg-[#111111] text-zinc-400 hover:border-[#444444] hover:text-zinc-300`
	}
}

type Badge = {
	text: string
	variant: BadgeVariant
}

export type CodeBlockProps = {
	code: string
	language: string
	fileName?: string
	badges?: Badge[]
	showLineNumbers?: boolean
	enableLineHighlight?: boolean
	showMetaInfo?: boolean
	maxHeight?: string
	className?: string
	onCopy?: (code: string) => void
	onLineClick?: (lineNumber: number) => void
	onSearch?: (query: string, results: number[]) => void
	badgeVariant?: BadgeVariant
	badgeColor?: string
	fileNameColor?: string
	initialSearchQuery?: string
	initialSearchResults?: number[]
	initialHighlightedLines?: number[]
}

export function CodeBlock({
	code,
	language,
	fileName,
	badges = [],
	showLineNumbers = true,
	enableLineHighlight = false,
	showMetaInfo = true,
	maxHeight = '600px',
	onCopy,
	onLineClick,
	onSearch,
	badgeVariant = 'default',
	badgeColor,
	fileNameColor,
	initialSearchQuery = '',
	initialSearchResults = [],
	initialHighlightedLines = []
}: CodeBlockProps) {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isCopied, setIsCopied] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const [isSearching, setIsSearching] = useState(!!initialSearchQuery)
	const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
	const [searchResults, setSearchResults] =
		useState<number[]>(initialSearchResults)
	const [currentResultIndex, setCurrentResultIndex] = useState(
		initialSearchResults.length > 0 ? 0 : -1
	)
	const [highlightedLines, setHighlightedLines] = useState<number[]>(
		initialHighlightedLines
	)
	const [stats] = useState(calculateCodeStats(code))
	const codeRef = useRef<HTMLDivElement>(null)

	const scrollToLine = useCallback((lineNumber: number) => {
		if (!codeRef.current) return

		const lineElement = codeRef.current.querySelector(
			`[data-line-number="${lineNumber}"]`
		)
		if (lineElement) {
			lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}, [])

	const handleSearch = useCallback(
		(query: string) => {
			setSearchQuery(query)
			if (!query) {
				setSearchResults([])
				setCurrentResultIndex(-1)
				setHighlightedLines([])
				onSearch?.('', [])
				return
			}

			const lines = code.split('\n')
			const matches = lines.reduce((acc, line, index) => {
				if (line.toLowerCase().includes(query.toLowerCase())) {
					acc.push(index + 1)
				}
				return acc
			}, [] as number[])

			setSearchResults(matches)
			setCurrentResultIndex(matches.length > 0 ? 0 : -1)
			setHighlightedLines(matches)
			onSearch?.(query, matches)

			if (matches.length > 0) {
				scrollToLine(matches[0])
			}
		},
		[code, onSearch, scrollToLine]
	)

	useEffect(() => {
		handleSearch(searchQuery)
	}, [searchQuery, handleSearch])

	const copyToClipboard = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(code)
			setIsCopied(true)
			onCopy?.(code)
			setTimeout(() => setIsCopied(false), 2000)
		} catch (error) {
			console.error('Failed to copy:', error)
		}
	}, [code, onCopy])

	const goToNextResult = useCallback(() => {
		if (searchResults.length === 0) return
		const nextIndex = (currentResultIndex + 1) % searchResults.length
		setCurrentResultIndex(nextIndex)
		scrollToLine(searchResults[nextIndex])
	}, [searchResults, currentResultIndex, scrollToLine])

	const goToPreviousResult = useCallback(() => {
		if (searchResults.length === 0) return
		const prevIndex =
			currentResultIndex - 1 < 0
				? searchResults.length - 1
				: currentResultIndex - 1
		setCurrentResultIndex(prevIndex)
		scrollToLine(searchResults[prevIndex])
	}, [searchResults, currentResultIndex, scrollToLine])

	useEffect(() => {
		function handleKeyboard(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
				copyToClipboard()
			}

			if ((e.metaKey || e.ctrlKey) && e.key === 'f' && !isCollapsed) {
				e.preventDefault()
				setIsSearching(true)
			}

			if (isSearching && searchResults.length > 0) {
				if (e.key === 'Enter') {
					if (e.shiftKey) {
						goToPreviousResult()
					} else {
						goToNextResult()
					}
				}
			}

			if (e.key === 'Escape') {
				setHighlightedLines([])
				setIsSearching(false)
				setSearchQuery('')
				setSearchResults([])
			}
		}

		window.addEventListener('keydown', handleKeyboard)
		return () => window.removeEventListener('keydown', handleKeyboard)
	}, [
		isCollapsed,
		isSearching,
		searchResults,
		currentResultIndex,
		copyToClipboard,
		goToNextResult,
		goToPreviousResult
	])

	const handleLineClick = useCallback(
		(lineNumber: number) => {
			if (enableLineHighlight) {
				setHighlightedLines((prev) =>
					prev.includes(lineNumber)
						? prev.filter((line) => line !== lineNumber)
						: [...prev, lineNumber]
				)
				onLineClick?.(lineNumber)
			}
		},
		[enableLineHighlight, onLineClick]
	)

	function renderSearchUI() {
		if (!isSearching) return null

		return (
			<div className="flex items-center gap-2 bg-[#111111] rounded-lg border border-[#333333] p-1 h-8">
				<div className="relative">
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search..."
						className="w-40 px-2 py-1 text-sm bg-transparent text-zinc-300 focus:outline-none placeholder:text-zinc-600"
						autoFocus
					/>
					{searchQuery && (
						<div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
							{searchResults.length > 0 ? (
								<span>
									{currentResultIndex + 1}/
									{searchResults.length}
								</span>
							) : (
								<span>No results</span>
							)}
						</div>
					)}
				</div>

				{searchResults.length > 0 && (
					<>
						<div className="h-4 w-[1px] bg-[#333333]" />
						<div className="flex items-center gap-1">
							<Button
								variant="ghost"
								size="icon"
								onClick={goToPreviousResult}
								className="h-6 w-6 text-zinc-500 hover:text-zinc-300"
							>
								<ArrowUp size={14} />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={goToNextResult}
								className="h-6 w-6 text-zinc-500 hover:text-zinc-300"
							>
								<ArrowDown size={14} />
							</Button>
						</div>
					</>
				)}

				<div className="h-4 w-[1px] bg-[#333333]" />
				<Button
					variant="ghost"
					size="icon"
					onClick={() => {
						setIsSearching(false)
						setSearchQuery('')
						setSearchResults([])
						setHighlightedLines([])
					}}
					className="h-6 w-6 text-zinc-500 hover:text-zinc-300"
				>
					<X size={14} />
				</Button>
			</div>
		)
	}

	return (
		<div className="relative">
			<div
				className="group relative rounded-xl overflow-hidden bg-[#0A0A0A] dark:bg-[#0A0A0A] border border-[#333333] dark:border-[#333333] w-full transition-all duration-200"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className="flex justify-between items-center px-4 py-2.5 bg-[#0A0A0A] dark:bg-[#0A0A0A] border-b border-[#333333]">
					<div className="flex items-center gap-3">
						<span className="text-zinc-500 dark:text-zinc-500 transition-colors duration-200 group-hover:text-zinc-400">
							{getLanguageIcon(language)}
						</span>
						{fileName && (
							<div
								className={cn(
									'flex items-center gap-2 rounded-full px-3 py-1 border transition-all duration-200',
									fileNameColor
										? `border-${fileNameColor}-500/30 bg-${fileNameColor}-500/10 text-${fileNameColor}-400 group-hover:border-${fileNameColor}-400 group-hover:text-${fileNameColor}-300`
										: 'bg-[#111111] border-[#333333] group-hover:border-[#444444]'
								)}
							>
								<File
									size={12}
									className={
										fileNameColor
											? `text-${fileNameColor}-400`
											: 'text-zinc-400'
									}
								/>
								<span
									className={cn(
										'text-sm font-medium transition-colors duration-200',
										fileNameColor
											? `text-${fileNameColor}-400 group-hover:text-${fileNameColor}-300`
											: 'text-zinc-400 group-hover:text-zinc-300'
									)}
								>
									{fileName}
								</span>
							</div>
						)}
						<div className="flex items-center gap-2">
							{badges.map((badge, index) => (
								<span
									key={index}
									className={getBadgeClasses({
										variant: badge.variant || badgeVariant,
										customColor: badgeColor
									})}
								>
									{badge.text}
								</span>
							))}
							{showMetaInfo && (
								<span className="px-2 py-0.5 text-xs font-medium text-zinc-500">
									{stats.lines} lines • {stats.words} words
								</span>
							)}
						</div>
					</div>

					<div className="flex items-center space-x-1.5 h-8">
						{renderSearchUI()}

						{!isSearching && (
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setIsSearching(true)}
								className="relative h-8 w-8 text-zinc-500 hover:text-zinc-200 rounded-md transition-all duration-200 hover:bg-white/10"
								title="Search (⌘/Ctrl + F)"
							>
								<Search size={16} />
							</Button>
						)}

						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsCollapsed(!isCollapsed)}
							className="relative h-8 w-8 text-zinc-500 hover:text-zinc-200 rounded-md transition-all duration-200 hover:bg-white/10"
						>
							<motion.div
								initial={false}
								animate={{ rotate: isCollapsed ? 0 : 180 }}
								transition={{
									duration: 0.4,
									ease: [0.16, 1, 0.3, 1]
								}}
							>
								<ChevronDown size={16} />
							</motion.div>
						</Button>

						<Button
							variant="ghost"
							size="icon"
							onClick={copyToClipboard}
							className="relative h-8 w-8 text-zinc-500 hover:text-zinc-200 rounded-md transition-all duration-200 hover:bg-white/10"
							title="Copy code (⌘/Ctrl + C)"
						>
							<AnimatePresence mode="wait">
								{isCopied ? (
									<motion.div
										key="check"
										variants={COPY_VARIANTS}
										initial="initial"
										animate="animate"
										exit="exit"
										className="text-emerald-400"
									>
										<Check size={16} />
									</motion.div>
								) : (
									<Copy size={16} />
								)}
							</AnimatePresence>
						</Button>
					</div>
				</div>

				<AnimatePresence initial={false}>
					{!isCollapsed && (
						<motion.div
							initial="collapsed"
							animate="expanded"
							exit="collapsed"
							variants={ANIMATION_VARIANTS}
							className="overflow-hidden"
						>
							<div className="relative" ref={codeRef}>
								{showLineNumbers && (
									<div className="absolute left-0 top-0 bottom-0 w-[3.5rem] bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent pointer-events-none z-10" />
								)}

								<div
									className="p-4 overflow-y-auto"
									style={{ maxHeight }}
								>
									<SyntaxHighlighter
										language={language.toLowerCase()}
										style={customTheme}
										customStyle={{
											margin: 0,
											padding: 0,
											background: 'transparent',
											fontSize: '0.875rem'
										}}
										showLineNumbers={showLineNumbers}
										lineNumberStyle={{
											color: '#666666',
											minWidth: '2.5em',
											paddingRight: '1em',
											textAlign: 'right',
											userSelect: 'none',
											opacity: isHovered ? 1 : 0.5,
											transition: 'opacity 0.2s ease'
										}}
										wrapLines={true}
										wrapLongLines={true}
										lineProps={(lineNumber) => ({
											style: {
												display: 'block',
												cursor: enableLineHighlight
													? 'pointer'
													: 'default',
												backgroundColor:
													highlightedLines.includes(
														lineNumber
													)
														? 'rgba(255, 255, 255, 0.1)'
														: 'transparent'
											},
											onClick: () =>
												handleLineClick(lineNumber)
										})}
									>
										{code}
									</SyntaxHighlighter>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<AnimatePresence>
				{isCopied && (
					<motion.div
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={TOAST_VARIANTS}
						className="absolute top-3 right-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#333333] shadow-lg"
					>
						<CheckCircle2 className="w-4 h-4 text-emerald-400" />
						<span className="text-sm font-medium text-zinc-200">
							Copied to clipboard
						</span>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
