'use client'

import { type HTMLAttributes } from 'react'
import NumberFlow from '@number-flow/react'

type NumberTickerProps = {
	value: number
	trend?: boolean | 'increasing' | 'decreasing'
	continuous?: boolean
	className?: string
	isAnimating?: boolean
} & HTMLAttributes<HTMLDivElement>

export default function NumberTicker({
	value,
	trend = 'increasing',
	continuous = true,
	className,
	isAnimating = false,
	...props
}: NumberTickerProps) {
	const maxDigits = 3
	const digitWidth = 10
	const minWidth = maxDigits * digitWidth

	return (
		<div
			className={className}
			style={
				{
					fontVariantNumeric: 'tabular-nums',
					'--number-flow-char-height': '1.2em',
					'--number-flow-mask-height': '0.3em',
					minWidth: `${minWidth}px`,
					display: 'inline-block',
					textAlign: 'right'
				} as React.CSSProperties
			}
			{...props}
		>
			<NumberFlow
				value={value}
				format={{
					notation: 'standard',
					minimumIntegerDigits: maxDigits
				}}
				locales="en-US"
				trend={trend}
				continuous={continuous}
				transformTiming={{
					duration: isAnimating ? 20 : 2000,
					easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
				}}
				spinTiming={{
					duration: isAnimating ? 20 : 2000,
					easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
				}}
				opacityTiming={{
					duration: isAnimating ? 0 : 800,
					easing: 'ease-out'
				}}
				willChange={true}
				isolate={true}
				animated={true}
			/>
		</div>
	)
}
