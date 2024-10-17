import { cn } from 'cn'
import React from 'react'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	count?: number
	className?: string
	as?: React.ElementType
}

export function Skeleton({ className, ...props }: SkeletonProps) {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-muted', className)}
			{...props}
		/>
	)
}

export default function SkeletonLoader({
	count = 1,
	className,
	as: Component = 'div',
	...props
}: SkeletonProps) {
	return (
		<>
			{Array(count)
				.fill(null)
				.map((_, index) => (
					<Component key={index} {...props}>
						<Skeleton className={className} />
					</Component>
				))}
		</>
	)
}
