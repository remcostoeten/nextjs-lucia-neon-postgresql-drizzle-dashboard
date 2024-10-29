'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Code, Copy, Palette } from 'lucide-react'
import { useState } from 'react'

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
		case 'javascript':
			return <JavascriptIcon />
		case 'typescript':
			return <TypescriptIcon />
		case 'python':
			return <PythonIcon />
		case 'react':
		case 'jsx':
			return <ReactIcon />
		case 'tsx':
			return <TypescriptIcon />
		case 'markdown':
		case 'mdx':
			return <MarkdownIcon />
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

function TypescriptIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			width="32"
			height="32"
		>
			<rect width="32" height="32" fill="#007acc" rx="8" />
			<text
				x="16"
				y="24"
				font-family="Arial, sans-serif"
				font-size="24"
				fill="white"
				text-anchor="middle"
			>
				&lt;/&gt;
			</text>
		</svg>
	)
}

function JavascriptIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
			<rect width="32" height="32" fill="#f7df1e" />
			<path d="m21.2 24.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
		</svg>
	)
}

function PythonIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="122.76"
			height="134.668"
			version="1"
		>
			<defs>
				<linearGradient id="linearGradient2795">
					<stop
						offset="0"
						stopColor="#b8b8b8"
						stopOpacity="0.498"
					></stop>
					<stop offset="1" stopColor="#7f7f7f" stopOpacity="0"></stop>
				</linearGradient>
				<linearGradient>
					<stop
						offset="0"
						stopColor="#7f7f7f"
						stopOpacity="0.5"
					></stop>
					<stop offset="1" stopColor="#7f7f7f" stopOpacity="0"></stop>
				</linearGradient>
				<linearGradient>
					<stop
						offset="0"
						stopColor="#b2b2b2"
						stopOpacity="0.5"
					></stop>
					<stop offset="1" stopColor="#b3b3b3" stopOpacity="0"></stop>
				</linearGradient>
				<linearGradient>
					<stop offset="0" stopColor="#f4f4f4" stopOpacity="1"></stop>
					<stop offset="1" stopColor="#fff" stopOpacity="1"></stop>
				</linearGradient>
				<linearGradient id="linearGradient4671">
					<stop offset="0" stopColor="#ffd43b" stopOpacity="1"></stop>
					<stop offset="1" stopColor="#ffe873" stopOpacity="1"></stop>
				</linearGradient>
				<linearGradient id="linearGradient4689">
					<stop offset="0" stopColor="#5a9fd4" stopOpacity="1"></stop>
					<stop offset="1" stopColor="#306998" stopOpacity="1"></stop>
				</linearGradient>
				<linearGradient
					x1="224.24"
					x2="-65.309"
					y1="144.757"
					y2="144.757"
					gradientTransform="translate(100.27 99.611)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4671"
				></linearGradient>
				<linearGradient
					x1="172.942"
					x2="26.67"
					y1="77.476"
					y2="76.313"
					gradientTransform="translate(100.27 99.611)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4689"
				></linearGradient>
				<linearGradient
					x1="172.942"
					x2="26.67"
					y1="77.476"
					y2="76.313"
					gradientTransform="translate(100.27 99.611)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4689"
				></linearGradient>
				<linearGradient
					x1="224.24"
					x2="-65.309"
					y1="144.757"
					y2="144.757"
					gradientTransform="translate(100.27 99.611)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4671"
				></linearGradient>
				<linearGradient
					x1="172.942"
					x2="26.67"
					y1="77.476"
					y2="76.313"
					gradientTransform="translate(100.27 99.611)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4689"
				></linearGradient>
				<linearGradient
					x1="224.24"
					x2="-65.309"
					y1="144.757"
					y2="144.757"
					gradientTransform="translate(100.27 99.611)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4671"
				></linearGradient>
				<linearGradient
					x1="224.24"
					x2="-65.309"
					y1="144.757"
					y2="144.757"
					gradientTransform="matrix(.56254 0 0 .56797 -11.597 -7.61)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4671"
				></linearGradient>
				<linearGradient
					x1="172.942"
					x2="26.67"
					y1="76.176"
					y2="76.313"
					gradientTransform="matrix(.56254 0 0 .56797 -11.597 -7.61)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4689"
				></linearGradient>
				<radialGradient
					cx="61.519"
					cy="132.286"
					r="29.037"
					fx="61.519"
					fy="132.286"
					gradientTransform="matrix(1 0 0 .17797 0 108.743)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient2795"
				></radialGradient>
				<linearGradient
					id="linearGradient1475"
					x1="150.961"
					x2="112.031"
					y1="192.352"
					y2="137.273"
					gradientTransform="matrix(.56254 0 0 .56797 -14.991 -11.702)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4671"
				></linearGradient>
				<linearGradient
					id="linearGradient1478"
					x1="26.649"
					x2="135.665"
					y1="20.604"
					y2="114.398"
					gradientTransform="matrix(.56254 0 0 .56797 -14.991 -11.702)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4689"
				></linearGradient>
				<radialGradient
					id="radialGradient1480"
					cx="61.519"
					cy="132.286"
					r="29.037"
					fx="61.519"
					fy="132.286"
					gradientTransform="matrix(0 -.23995 1.05467 0 -83.7 142.462)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient2795"
				></radialGradient>
			</defs>
			<path
				fill="url(#linearGradient1478)"
				fillOpacity="1"
				d="M54.919 0c-4.584.022-8.961.413-12.813 1.095C30.76 3.099 28.7 7.295 28.7 15.032v10.219h26.813v3.406H18.638c-7.793 0-14.616 4.684-16.75 13.594-2.462 10.213-2.571 16.586 0 27.25 1.905 7.938 6.457 13.594 14.25 13.594h9.218v-12.25c0-8.85 7.657-16.657 16.75-16.657h26.782c7.454 0 13.406-6.138 13.406-13.625v-25.53c0-7.267-6.13-12.726-13.406-13.938C64.282.328 59.502-.02 54.918 0zm-14.5 8.22c2.77 0 5.031 2.298 5.031 5.125 0 2.816-2.262 5.093-5.031 5.093-2.78 0-5.031-2.277-5.031-5.093 0-2.827 2.251-5.125 5.03-5.125z"
			></path>
			<path
				fill="url(#linearGradient1475)"
				fillOpacity="1"
				d="M85.638 28.657v11.906c0 9.231-7.826 17-16.75 17H42.106c-7.336 0-13.406 6.279-13.406 13.625V96.72c0 7.266 6.319 11.54 13.406 13.625 8.488 2.495 16.627 2.946 26.782 0 6.75-1.955 13.406-5.888 13.406-13.625V86.5H55.513v-3.405H95.7c7.793 0 10.696-5.436 13.406-13.594 2.8-8.399 2.68-16.476 0-27.25-1.925-7.758-5.604-13.594-13.406-13.594zM70.575 93.313c2.78 0 5.031 2.278 5.031 5.094 0 2.827-2.251 5.125-5.031 5.125-2.77 0-5.031-2.298-5.031-5.125 0-2.816 2.261-5.094 5.031-5.094z"
			></path>
			<ellipse
				cx="55.817"
				cy="127.701"
				fill="url(#radialGradient1480)"
				fillOpacity="1"
				fillRule="nonzero"
				stroke="none"
				strokeDasharray="none"
				strokeMiterlimit="4"
				strokeOpacity="1"
				strokeWidth="15.417"
				opacity="0.444"
				rx="35.931"
				ry="6.967"
			></ellipse>
		</svg>
	)
}

function ReactIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
			<title>React Logo</title>
			<circle cx="16" cy="16" r="2.05" fill="#61dafb" />
			<g stroke="#61dafb" stroke-width="1" fill="none">
				<ellipse cx="16" cy="16" rx="11" ry="4.2" />
				<ellipse
					cx="16"
					cy="16"
					rx="11"
					ry="4.2"
					transform="rotate(60 16 16)"
				/>
				<ellipse
					cx="16"
					cy="16"
					rx="11"
					ry="4.2"
					transform="rotate(120 16 16)"
				/>
			</g>
		</svg>
	)
}

function MarkdownIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			preserveAspectRatio="xMidYMid"
			viewBox="0 -150 512 512"
		>
			<path
				fill="#FFF"
				d="M19.478 2.783h473.044c9.22 0 16.695 7.475 16.695 16.695V192c0 9.22-7.475 16.696-16.695 16.696H19.478c-9.22 0-16.695-7.475-16.695-16.696V19.478c0-9.22 7.475-16.695 16.695-16.695z"
			></path>
			<path
				fill="#EAEAEA"
				d="M19.478 0h473.044C503.279 0 512 8.72 512 19.478V192c0 10.758-8.72 19.478-19.478 19.478H19.478C8.721 211.478 0 202.758 0 192V19.478C0 8.721 8.72 0 19.478 0zm0 5.565c-7.684 0-13.913 6.23-13.913 13.913V192c0 7.684 6.23 13.913 13.913 13.913h473.044c7.684 0 13.913-6.229 13.913-13.913V19.478c0-7.684-6.23-13.913-13.913-13.913H19.478z"
			></path>
			<path d="M272.695652 40.2031304L272.694464 125.098667 303.878525 93.920837 319.61875 109.662235 261.97675 167.299939 203.607855 108.931044 219.348667 93.1902318 250.433594 124.275014 250.434783 40.2031304z"></path>
			<path d="M72.1623188 162.979246L72.1623188 97.2318069 112.416825 137.489219 152.976696 96.9322596 152.976696 162.31513 175.237565 162.31513 175.237565 43.192494 112.417958 106.007592 49.9014493 43.4865699 49.9014493 162.979246z"></path>
			<path
				fill="#F9AC00"
				d="M447.84683 36.6511988L463.587373 52.3922795 416.437797 99.5394783 462.136706 145.239721 446.396163 160.980801 400.695652 115.281623 354.995141 160.980801 339.254598 145.239721 384.949797 99.5394783 337.803931 52.3922795 353.544474 36.6511988 400.695652 83.7973333z"
			></path>
		</svg>
	)
}
