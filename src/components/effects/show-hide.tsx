'use client'

import { Button } from 'ui'
import { useState } from 'react'
import { AnimateHeight } from '../dashboard/features/activity/animate-height'

type ShowHideProps = {
	title: string
	children: React.ReactNode
	width?: string
	className?: string
}

export default function ShowHide({
	title,
	children,
	width = 'w-full',
	className = '',
	...props
}: ShowHideProps) {
	const [isExpanded, setIsExpanded] = useState(true)

	return (
		<div
			className={`${className} mt-6 overflow-hidden rounded-xl border px-4 py-3 ${width}`}
			{...props}
		>
			<div className="flex justify-between">
				<h2 className="text-lg font-semibold pl-2 pt-0.5 text-subtitle text-lg font-semibold">
					{title}
				</h2>
				<Button
					variant="outline"
					size="sm"
					className="text-xs"
					aria-expanded={isExpanded}
					aria-controls="toggle-content"
					onClick={() => setIsExpanded(prev => !prev)}
				>
					{isExpanded ? 'Hide' : 'Show'}
				</Button>
			</div>
			<AnimateHeight height={isExpanded ? 'auto' : 0}>
				<div id="toggle-content" className="mt-4">
					{children}
				</div>
			</AnimateHeight>
		</div>
	)
}
