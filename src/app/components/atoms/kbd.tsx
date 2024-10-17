import { cn } from 'cn'
import React from 'react'

type KbdSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type KbdVariant = 'default' | 'frosted' | 'outline' | 'pulse'
type KbdSplit = 'slash' | 'plus'

interface KbdProps {
	k: string | string[]
	size?: KbdSize
	variant?: KbdVariant
	split?: KbdSplit
	className?: string
}

const KbdKeys = {
	Command: '⌘',
	Shift: '⇧',
	Backspace: '⌫',
	Enter: '↵',
	Eject: '⏏',
	Control: 'Ctrl',
	Windows: '⊞',
	Apple: '',
	Option: '⌥',
	Left: '←',
	Up: '↑',
	Right: '→',
	Down: '↓'
}

const sizeClasses: Record<KbdSize, string> = {
	xs: 'text-xs px-1.5 py-0.5',
	sm: 'text-sm px-2 py-1',
	md: 'text-base px-2.5 py-1.5',
	lg: 'text-lg px-3 py-2',
	xl: 'text-xl px-3.5 py-2.5'
}

const variantClasses: Record<KbdVariant, string> = {
	default: 'bg-section-lighter  text-subtitle shadow-lg',
	frosted:
		'bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white border border-white border-opacity-20',
	outline:
		'bg-transparent  text-subtitle border hover:text-title trans-200 hover:bg-card',
	pulse: 'bg-body text-subtitle border-2 border-pulse-green shadow-pulse'
}

const Kbd: React.FC<KbdProps> = ({
	k,
	size = 'md',
	variant = 'default',
	split,
	className
}) => {
	const keys = Array.isArray(k) ? k : [k]
	const fullKeys = keys.map(
		key => KbdKeys[key as keyof typeof KbdKeys] || key
	)

	const renderKey = (key: string, index: number) => (
		<kbd
			key={index}
			className={cn(
				'inline-flex items-center justify-center rounded-md font-sans font-semibold transition-all duration-200',
				sizeClasses[size],
				variantClasses[variant],
				variant === 'pulse' && 'animate-pulse',
				'hover:scale-105',
				className
			)}
			title={key}
		>
			{key}
		</kbd>
	)

	return (
		<span className="inline-flex items-center space-x-1">
			{fullKeys.map((key, index) => (
				<React.Fragment key={index}>
					{index > 0 && split && (
						<span
							className={cn(
								'text-gray-400',
								variant === 'pulse' && 'text-pulse-green'
							)}
						>
							{split === 'slash' ? '/' : '+'}
						</span>
					)}
					{renderKey(key, index)}
				</React.Fragment>
			))}
		</span>
	)
}

export { Kbd, KbdKeys }
