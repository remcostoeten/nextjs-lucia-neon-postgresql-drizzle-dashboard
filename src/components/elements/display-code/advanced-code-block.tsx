'use client'

import { ChevronDown, ChevronUp, Copy } from 'lucide-react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'sonner'
import { Badge, Button } from 'ui'

import {
	DiCss3,
	DiHtml5,
	DiJava,
	DiJavascript1,
	DiPython,
	DiReact
} from 'react-icons/di'
import { SiTypescript } from 'react-icons/si'

type CodeBlockProps = {
	code: string | undefined | any
	fileName: string
	language: string
	badges?: string[]
}

const getLanguageIcon = (language: string) => {
	// ... (keep the existing getLanguageIcon function)
}

export function EnhancedCodeBlock({
	code,
	fileName,
	language,
	badges = []
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

	return (
		<div className="rounded-lg overflow-hidden bg-card border w-full">
			<div className="flex justify-between items-center border px-4 py-2 bg-section-lighter">
				<div className="flex items-center space-x-2">
					{languageIcon && (
						<div className="mr-2 text-subtitle">{languageIcon}</div>
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
						{isCollapsed ? (
							<ChevronDown size={16} />
						) : (
							<ChevronUp size={16} />
						)}
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
			{!isCollapsed && (
				<div className="p-4 max-h-[60vh] overflow-y-auto">
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
				</div>
			)}
		</div>
	)
}
