import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from 'cn'
import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
	width?: string | number
	height?: string | number
	className?: string
	fill?: string
	color?: string
}

const CommandIcon: React.FC<IconProps> = ({
	width = '1em',
	height = '1em',
	className = 'svg-icon',
	fill = 'currentColor',
	color,
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		style={{ width, height, verticalAlign: 'middle' }}
		fill={fill}
		color={color}
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M6 2a4 4 0 0 1 4 4v2h4V6a4 4 0 1 1 4 4h-2v4h2a4 4 0 1 1-4 4v-2h-4v2a4 4 0 1 1-4-4h2v-4H6a4 4 0 1 1 0-8zm10 16a2 2 0 1 0 2-2h-2v2zm-2 0v-2h-4v2h4zm-6 0a2 2 0 1 0-2-2v2h2zm0-6V8h4v4h-4zm6-6V4a2 2 0 1 0-2 2h2zm-6 0h2a2 2 0 1 0-2-2v2z" />
	</svg>
)

const CtrlIcon: React.FC<IconProps> = ({
	width = '1em',
	height = '1em',
	className = 'svg-icon',
	fill = 'currentColor',
	color,
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		style={{ width, height, verticalAlign: 'middle' }}
		fill={fill}
		color={color}
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
	</svg>
)

const ShiftIcon: React.FC<IconProps> = ({
	width = '1em',
	height = '1em',
	className = 'svg-icon',
	fill = 'currentColor',
	color,
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		style={{ width, height, verticalAlign: 'middle' }}
		fill={fill}
		color={color}
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M8 6.82v8.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
	</svg>
)

const AltIcon: React.FC<IconProps> = ({
	width = '1em',
	height = '1em',
	className = 'svg-icon',
	fill = 'currentColor',
	color,
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		style={{ width, height, verticalAlign: 'middle' }}
		fill={fill}
		color={color}
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />
	</svg>
)

const OptionIcon: React.FC<IconProps> = ({
	width = '1em',
	height = '1em',
	className = 'svg-icon',
	fill = 'currentColor',
	color,
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		style={{ width, height, verticalAlign: 'middle' }}
		fill={fill}
		color={color}
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM11 7h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm-4-8h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2zM15 7h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
	</svg>
)

const SuperIcon: React.FC<IconProps> = ({
	width = '1em',
	height = '1em',
	className = 'svg-icon',
	fill = 'currentColor',
	color,
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		style={{ width, height, verticalAlign: 'middle' }}
		fill={fill}
		color={color}
		viewBox="0 0 24 24"
		{...props}

	>
		<path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7.5 12.5h3V15H12v-2.5h3V11H12V8.5h-1.5V11h-3v1.5z" />
	</svg>
)

const SlashIcon: React.FC<IconProps> = ({
	width = '1em',
	height = '1em',
	className = 'svg-icon',
	fill = 'currentColor',
	color,
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		style={{ width, height, verticalAlign: 'middle' }}
		fill={fill}
		color={color}
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
	</svg>
)

const EscapeIcon: React.FC<IconProps> = ({
	width = '1em',
	height = '1em',
	className = 'svg-icon',
	fill = 'currentColor',
	color,
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		style={{ width, height, verticalAlign: 'middle' }}
		fill={fill}
		color={color}
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M22,3H2C0.9,3,0,3.9,0,5v14c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V5C24,3.9,23.1,3,22,3z M11,10H9v2H7v-2H5V8h2V6h2v2h2V10z M15,14h-4v-2h4V14z M19,10h-2v2h-2v-2h-2V8h2V6h2v2h2V10z" />
	</svg>
)

type KbdProps = {
	children: React.ReactNode
	variant?:
	| 'default'
	| 'cmd'
	| 'ctrl'
	| 'shift'
	| 'alt'
	| 'option'
	| 'win'
	| 'super'
	| 'esc'
	| 'slash'
	size?: 'sm' | 'md' | 'lg'
	hasTooltip?: boolean
	tooltipContent?: string
}

const iconComponents = {
	cmd: CommandIcon,
	ctrl: CtrlIcon,
	shift: ShiftIcon,
	alt: AltIcon,
	option: OptionIcon,
	win: SuperIcon,
	super: SuperIcon,
	esc: EscapeIcon,
	slash: SlashIcon
}

export function Kbd({
	children,
	variant = 'default',
	size = 'md',
	hasTooltip = false,
	tooltipContent
}: KbdProps) {
	const sizeClasses = {
		sm: 'text-xs px-2 py-1',
		md: 'text-sm px-3 py-1.5',
		lg: 'text-base px-4 py-2'
	}

	const iconSizes = {
		sm: '12px',
		md: '16px',
		lg: '20px'
	}

	const IconComponent = variant !== 'default' ? iconComponents[variant] : null

	const KbdContent = (
		<kbd
			className={cn(
				'inline-flex items-center justify-center gap-1 rounded-md font-sans font-medium tracking-wide transition-all duration-100',
				'bg-gradient-to-b from-neutral-200 to-neutral-200/50 text-neutral-800',
				'dark:from-neutral-950 dark:to-neutral-950/65 dark:text-neutral-300',
				'shadow-[0_1px_1px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.25)]',
				'dark:shadow-[0_1px_1px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]',
				'hover:from-neutral-300 hover:to-neutral-300/50 dark:hover:from-neutral-900 dark:hover:to-neutral-900/65',
				'active:from-neutral-400 active:to-neutral-400/50 dark:active:from-neutral-800 dark:active:to-neutral-800/65',
				sizeClasses[size]
			)}
		>
			{IconComponent && (
				<IconComponent
					width={iconSizes[size]}
					height={iconSizes[size]}
					className="fill-current"
				/>
			)}
			{children}
		</kbd>
	)

	if (hasTooltip) {
		return (
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>{KbdContent}</TooltipTrigger>
				<TooltipContent>
					<p>
						{tooltipContent ||
							`Keyboard shortcut: ${variant} ${children}`}
					</p>
				</TooltipContent>
			</Tooltip>
		)
	}

	return KbdContent
}
