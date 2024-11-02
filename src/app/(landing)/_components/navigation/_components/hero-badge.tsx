'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { getCommitCount } from '@/lib/db/queries/github/get-github-stats'
import NumberTicker from '../../effects/number-ticker'

type AnimatedCommitCountProps = {
	onCountLoaded?: (count: number) => void
}

const AnimatedCommitCount = ({ onCountLoaded }: AnimatedCommitCountProps) => {
	const [count, setCount] = useState<number>(0)
	const [isAnimating, setIsAnimating] = useState(true)

	useEffect(() => {
		let startCount = 0
		const interval = setInterval(() => {
			if (startCount < 100) {
				startCount += 1
				setCount(startCount)
			}
		}, 20)

		const loadStats = async () => {
			try {
				const data = await getCommitCount()
				setIsAnimating(false)
				clearInterval(interval)
				setCount(data.totalCommits)
				onCountLoaded?.(data.totalCommits)
			} catch (error) {
				console.error('Failed to load GitHub stats:', error)
				clearInterval(interval)
				setIsAnimating(false)
			}
		}

		loadStats()

		return () => clearInterval(interval)
	}, [onCountLoaded])

	return (
		<NumberTicker
			value={count}
			continuous={true}
			trend="increasing"
			className="font-medium"
			isAnimating={isAnimating}
		/>
	)
}

type HeroBadgeProps = {
	className?: string
}

export default function HeroBadge({ className }: HeroBadgeProps) {
	return (
		<div
			className={`hero-badge flex items-center gap-1 min-w-[200px] justify-center ${className ?? ''}`}
		>
			<div className="flex items-center gap-1">
				<AnimatedCommitCount />
				<span className="gradient-span">
					commits by{' '}
					<Link
						href={siteConfig.links.github}
						target="_blank"
						rel="noopener noreferrer"
					>
						<i>@</i>
						{siteConfig.usernames}
					</Link>
				</span>
			</div>
		</div>
	)
}
