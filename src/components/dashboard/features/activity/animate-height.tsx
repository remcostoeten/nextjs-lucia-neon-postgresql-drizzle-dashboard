'use client'

import React, { useEffect, useRef, useState } from 'react'

interface AnimateHeightProps {
	children: React.ReactNode
	height: number | 'auto'
	duration?: number
	easing?: string
	className?: string
}

export const AnimateHeight: React.FC<AnimateHeightProps> = ({
	children,
	height,
	duration = 300,
	easing = 'ease',
	className = ''
}) => {
	const [currentHeight, setCurrentHeight] = useState<number | 'auto'>(height)
	const contentRef = useRef<HTMLDivElement>(null)
	const [isVisible, setIsVisible] = useState(height !== 0)

	useEffect(() => {
		if (height === 'auto') {
			setCurrentHeight(contentRef.current?.scrollHeight || 'auto')
		} else {
			setCurrentHeight(height)
		}

		if (height === 0) {
			const timer = setTimeout(() => setIsVisible(false), duration)
			return () => clearTimeout(timer)
		} else {
			setIsVisible(true)
		}
	}, [height, duration])

	const style: React.CSSProperties = {
		height: currentHeight === 'auto' ? 'auto' : `${currentHeight}px`,
		overflow: 'hidden',
		transition: `height ${duration}ms ${easing}`
	}

	return (
		<div style={style} className={className}>
			<div
				ref={contentRef}
				style={{ display: isVisible ? 'block' : 'none' }}
			>
				{children}
			</div>
		</div>
	)
}
import Link from 'next/link'
import { Icon, Skeleton } from 'ui'
import { ActivityCardProps, ActivityCardSkeletonProps } from './activities.d'

export function ActivityCard({
	id,
	color,
	name,
	icon,
	duration
}: ActivityCardProps) {
	const colorClasses = {
		default:
			'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700',
		red: 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-700',
		blue: 'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
		green: 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-700',
		yellow: 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
		purple: 'bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700',
		pink: 'bg-pink-100 dark:bg-pink-900/20 border-pink-200 dark:border-pink-700',
		indigo: 'bg-indigo-100 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700'
	}

	const cardColorClass =
		colorClasses[color as keyof typeof colorClasses] || colorClasses.default

	return (
		<li className="shrink-0 basis-full lg:basis-[250px]">
			<Link
				href={`/app/activity/${id}`}
				className={`flex flex-col gap-2 rounded-xl p-6 border ${cardColorClass} transition-colors hover:bg-opacity-80`}
			>
				<Icon name={icon} strokeWidth={2} size={20} />
				<h3 className="mt-2 text-lg font-medium">{name}</h3>
				<p className="text-xs text-gray-600 dark:text-gray-400">
					{duration} minutes
				</p>
			</Link>
		</li>
	)
}

ActivityCard.Skeleton = function ActivityCardSkeleton({
	animate = true,
	opacity = 100
}: ActivityCardSkeletonProps) {
	return (
		<li
			className="shrink-0 basis-full lg:basis-[250px]"
			style={{ opacity: `${opacity}%` }}
		>
			<div className="flex flex-col gap-2 rounded-xl border bg-gray-100 dark:bg-gray-800 p-6">
				<Skeleton className="h-5 w-5 bg-gray-200 dark:bg-gray-700" />
				<Skeleton className="mt-2 h-6 w-full bg-gray-200 dark:bg-gray-700" />
				<Skeleton className="mt-1 h-4 w-[50px] bg-gray-200 dark:bg-gray-700" />
			</div>
		</li>
	)
}
