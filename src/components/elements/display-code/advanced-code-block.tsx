'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Copy } from 'lucide-react'
import { useState } from 'react'
import {
	DiCss3,
	DiHtml5,
	DiJava,
	DiJavascript1,
	DiPython,
	DiReact
} from 'react-icons/di'
import { SiTypescript } from 'react-icons/si'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'sonner'
import { Badge, Button } from 'ui'

type CodeBlockProps = {
	code: string | undefined | any
	fileName: string
	language: string
	badges?: string[]
	animationVariant?: 'default' | 'bouncy' | 'smooth' | 'elastic' | 'snappy'
}

const getLanguageIcon = (language: string) => {
	switch (language.toLowerCase()) {
		case 'html':
			return <DiHtml5 />
		case 'css':
			return <DiCss3 />
		case 'javascript':
			return <DiJavascript1 />
		case 'typescript':
			return <SiTypescript />
		case 'python':
			return <DiPython />
		case 'java':
			return <DiJava />
		case 'react':
		case 'jsx':
		case 'tsx':
			return <DiReact />
		default:
			return null
	}
}

const animationVariants = {
	default: {
		type: 'spring',
		stiffness: 150,
		damping: 15,
		duration: 0.75
	},
	bouncy: {
		type: 'spring',
		stiffness: 180,
		damping: 10,
		duration: 0.75
	},
	smooth: {
		type: 'tween',
		ease: 'easeInOut',
		duration: 0.75
	},
	elastic: {
		type: 'spring',
		stiffness: 200,
		damping: 12,
		duration: 0.75
	},
	snappy: {
		type: 'spring',
		stiffness: 250,
		damping: 20,
		duration: 0.75
	}
}

export function EnhancedCodeBlock({
	code,
	fileName,
	language,
	badges = [],
	animationVariant = 'default'
}: CodeBlockProps) {
	const [isCollapsed, setIsCollapsed] = useState(false)

	const copyToClipboard = () => {
		navigator.clipboard.writeText(code)
		toast.success('Code copied to clipboard!')
	}

	const languageIcon = getLanguageIcon(language)

	const customStyle = {
		...vscDarkPlus,
		'code[class*="language-"]': {
			...vscDarkPlus['code[class*="language-"]'],
			whiteSpace: 'pre-wrap',
			wordBreak: 'break-all'
		}
	}

	const openTransition = animationVariants[animationVariant]
	const closeTransition = animationVariants.smooth

	return (
		<div className="rounded-lg overflow-hidden bg-card border w-full">
			<div className="flex justify-between items-center border px-4 py-2 bg-section-lighter">
				<div className="flex items-center space-x-2">
					{languageIcon && (
						<span className="mr-2 text-subtitle">
							{languageIcon}
						</span>
					)}
					{badges.map((badge, index) => (
						<Badge
							key={index}
							variant="outline"
							className="bg-[#3C3C3C] text-[#D7BA7D] border-[#3C3C3C]"
						>
							{badge}
						</Badge>
					))}
					<span className="text-sm text-zinc-400">{fileName}</span>
				</div>
				<div className="flex space-x-2">
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
								style={customStyle}
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
