'use client'

import Link from 'next/link'
import { zinc } from 'tailwindcss/colors'
import { Icon, Skeleton } from 'ui'
import type { Activity } from './activities.d'

type ActivityCardProps = Activity

const colorMap: Record<string, { '500': string; '700': string }> = {
	default: { '500': zinc[500], '700': zinc[700] },
	red: { '500': '#EF4444', '700': '#B91C1C' },
	blue: { '500': '#3B82F6', '700': '#1D4ED8' },
	green: { '500': '#10B981', '700': '#047857' },
	yellow: { '500': '#F59E0B', '700': '#B45309' },
	purple: { '500': '#8B5CF6', '700': '#6D28D9' },
	pink: { '500': '#EC4899', '700': '#BE185D' }
}

export function ActivityCard({
	id,
	color,
	name,
	icon,
	duration
}: ActivityCardProps) {
	const activityColor = colorMap[color] || colorMap.default

	return (
		<li className="shrink-0 basis-full lg:basis-[250px]">
			<Link
				href={`/dashboard/folder/${id}`}
				className="flex flex-col gap-2 rounded-xl p-6 transition-transform hover:scale-105"
				style={{
					background: `linear-gradient(135deg, ${activityColor['500']} 0%, ${activityColor['700']} 100%)`,
					border: `1px solid ${activityColor['500']}`
				}}
			>
				<Icon
					name={icon}
					strokeWidth={2}
					size={20}
					className="text-white"
				/>
				<h3 className="mt-2 text-lg font-medium text-white">{name}</h3>
				<p className="text-xs text-white/80">{duration} minutes</p>
			</Link>
		</li>
	)
}

ActivityCard.Skeleton = function ActivityCardSkeleton({
	animate = true,
	opacity = 100
}: {
	animate?: boolean
	opacity?: number
}) {
	return (
		<li
			className="shrink-0 basis-full lg:basis-[250px]"
			style={{ opacity: `${opacity}%` }}
		>
			<div className="flex flex-col gap-2 rounded-xl border bg-section p-6 dark:bg-gray-800">
				<div
					className={`h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 ${animate ? 'animate-pulse' : ''}`}
				/>
				<div
					className={`mt-2 h-6 w-full rounded bg-gray-200 dark:bg-gray-700 ${animate ? 'animate-pulse' : ''}`}
				/>
				<div
					className={`mt-1 h-4 w-[50px] rounded bg-gray-200 dark:bg-gray-700 ${animate ? 'animate-pulse' : ''}`}
				/>
			</div>
		</li>
	)
}
ActivityCard.Skeleton = function ActivityCardSkeleton({
	animate = true,
	opacity = 100
}: {
	animate?: boolean
	opacity?: number
}) {
	return (
		<li
			className="shrink-0 basis-full lg:basis-[250px]"
			style={{ opacity: `${opacity.toString()}%` }}
		>
			<div className="flex flex-col gap-2 rounded-xl border bg-card p-6">
				<Skeleton noPulse={!animate} className="size-5" />
				<Skeleton noPulse={!animate} className="mt-2 h-6 w-full" />
				<Skeleton noPulse={!animate} className="mt-1 h-4 w-[50px]" />
			</div>
		</li>
	)
}
