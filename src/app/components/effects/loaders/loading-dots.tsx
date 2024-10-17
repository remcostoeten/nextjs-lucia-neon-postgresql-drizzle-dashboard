import React from 'react'

type LoadingDotsProps = {
	size?: 1 | 2 | 3 | 4 | 5
	color?: string
	opacity?: number
	className?: string
} & React.HTMLAttributes<HTMLDivElement>

export default function LoadingDots({
	size = 4,
	color = 'bg-gray-900',
	opacity = 0.2,
	className = '',
	...props
}: LoadingDotsProps) {
	const dotSize = `${size}px`

	return (
		<div
			className={`flex items-center ${className}`}
			role="status"
			aria-live="polite"
			aria-label="Loading"
			{...props}
		>
			{[0, 1, 2].map(dot => (
				<span
					key={dot}
					className={`inline-block ${color} rounded-full mx-[1px]`}
					style={{
						width: dotSize,
						height: dotSize,
						animation: `blink 1.4s infinite both`,
						animationDelay: `${dot * 0.2}s`,
						opacity: opacity
					}}
				></span>
			))}
			<style jsx>{`
				@keyframes blink {
					0% {
						opacity: ${opacity};
					}
					20% {
						opacity: 1;
					}
					100% {
						opacity: ${opacity};
					}
				}
			`}</style>
		</div>
	)
}
