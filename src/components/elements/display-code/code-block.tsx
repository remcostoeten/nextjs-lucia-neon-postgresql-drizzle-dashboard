'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Code, Copy, Palette } from 'lucide-react'
import { useState } from 'react'
import {
	SiCss3,
	SiHtml5,
	SiJavascript,
	SiMarkdown,
	SiPython,
	SiReactos,
	SiTypescript
} from 'react-icons/si'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula, nord } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'sonner'
import { Badge, Button } from 'ui'

type CodeBlockProps = {
	code: string | undefined | any
	fileName: string
	language: string
	badges?: string[]
	animationVariant?: 'default' | 'smooth'
}

const getLanguageIcon = (language: string) => {
	switch (language.toLowerCase()) {
		case 'html':
			return <SiHtml5 />
		case 'css':
			return <SiCss3 />
		case 'javascript':
			return <SiJavascript />
		case 'typescript':
			return <SiTypescript />
		case 'python':
			return <SiPython />
		case 'react':
		case 'jsx':
			return <SiReactos />
		case 'tsx':
			return <SiTypescript />
		case 'markdown':
		case 'mdx':
			return <SiMarkdown />
		default:
			return <Code />
	}
}

const animationVariants = {
	default: {
		type: 'spring',
		stiffness: 150,
		damping: 15,
		duration: 0.75
	},
	smooth: {
		type: 'tween',
		ease: 'easeInOut',
		duration: 0.75
	}
}

const EnhancedCodeBlock = ({
	code,
	fileName,
	language,
	badges = [],
	animationVariant = 'default'
}: CodeBlockProps) => {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [currentThemeIndex, setCurrentThemeIndex] = useState(0)

	const copyToClipboard = () => {
		navigator.clipboard.writeText(code)
		toast.success('Code copied to clipboard!')
	}

	const languageIcon = getLanguageIcon(language)

	const cycleTheme = () => {
		setCurrentThemeIndex(prevIndex => (prevIndex + 1) % 2)
		toast.success(`Theme: ${currentThemeIndex === 0 ? 'Dracula' : 'Nord'}`)
	}

	const currentTheme =
		currentThemeIndex === 0
			? dracula
			: {
				...nord,
				'token.comment': '#81A1C1',
				'token.prolog': '#81A1C1',
				'token.doctype': '#81A1C1',
				'token.cdata': '#81A1C1',
				'token.punctuation': '#81A1C1',
				'token.property': '#88C0D0',
				'token.tag': '#8FBCBB',
				'token.boolean': '#B48EAD',
				'token.number': '#B48EAD',
				'token.constant': '#B48EAD',
				'token.symbol': '#B48EAD',
				'token.deleted': '#B48EAD',
				'token.string': '#A3BE8C',
				'token.char': '#A3BE8C',
				'token.attr-value': '#A3BE8C',
				'token.attr-name': '#8FBCBB',
				'token.function': '#88C0D0',
				'token.operator': '#81A1C1',
				'token.entity': '#81A1C1',
				'token.url': '#81A1C1',
				'token.variable': '#81A1C1',
				'token.inserted': '#A3BE8C'
			}

	const openTransition = animationVariants[animationVariant]
	const closeTransition = animationVariants.smooth

	return (
		<div className="rounded-lg overflow-hidden bg-card border w-full">
			<div className="flex justify-between items-center border px-4 py-2 bg-section-lighter">
				<div className="flex items-center space-x-2 lowercase">
					{languageIcon && (
						<span className="mr-2 text-subtitle">
							{languageIcon}
						</span>
					)}
					{badges.map((badge, index) => (
						<Badge
							key={index}
							variant="outline"
							className="shadow-xl font-normal shadow-body/50 bg-[#b98dfc1a] text-subtitletext-xxs border"
						>
							{badge}
						</Badge>
					))}
					<span className="text-sm text-subtitle">{fileName}</span>
				</div>
				<div className="flex space-x-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={cycleTheme}
						className="text-zinc-400 hover:text-zinc-100"
					>
						<Palette size={16} />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsCollapsed(!isCollapsed)}
						className="text-zinc-400 hover:text-zinc-100"
					>
						<motion.div
							animate={{ rotate: isCollapsed ? 0 : 180 }}
							transition={{ duration: 0.75 }}
						>
							<ChevronDown size={16} />
						</motion.div>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={copyToClipboard}
						className="text-zinc-400 hover:text-zinc-100"
					>
						<Copy size={16} />
					</Button>
				</div>
			</div>
			<AnimatePresence initial={false}>
				{!isCollapsed && (
					<motion.div
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 }
						}}
						transition={
							isCollapsed ? closeTransition : openTransition
						}
						className="overflow-hidden"
					>
						<motion.div
							variants={{ collapsed: { y: -10 }, open: { y: 0 } }}
							transition={
								isCollapsed ? closeTransition : openTransition
							}
							className="p-4 max-h-[60vh] overflow-y-auto"
						>
							<SyntaxHighlighter
								language={language}
								style={currentTheme}
								customStyle={{
									margin: 0,
									padding: 0,
									background: 'transparent',
									fontSize: '0.875rem'
								}}
								showLineNumbers={true}
								lineNumberStyle={{
									color: '#6A737D',
									minWidth: '2.5em',
									paddingRight: '1em',
									textAlign: 'right',
									userSelect: 'none'
								}}
								wrapLines={true}
								wrapLongLines={true}
							>
								{code}
							</SyntaxHighlighter>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default EnhancedCodeBlock
