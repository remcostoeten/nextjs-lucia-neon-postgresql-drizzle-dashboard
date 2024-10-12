'use client'

import { Flex } from '@/components/atoms'
import NumberTicker from '@/components/effects/number-ticker'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@radix-ui/react-tooltip'
import { fetchGitHubStats } from 'actions'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { InfoIcon } from '../../icons'

type GitHubStats = {
	totalCommits: number
	madeBy: string
}

export default function HeroBadge() {
	const [githubStats, setGithubStats] = useState<GitHubStats>({
		totalCommits: 0,
		madeBy: '@remcostoeten'
	})

	useEffect(() => {
		async function loadGitHubStats() {
			try {
				const stats = await fetchGitHubStats()
				console.log('Received GitHub Stats:', stats) // Debug log
				setGithubStats(stats)
			} catch (error) {
				console.error('Failed to fetch GitHub stats:', error)
				setGithubStats({
					totalCommits: 0,
					madeBy: '@remcostoeten'
				})
			}
		}
		loadGitHubStats()
	}, [])

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.55, delay: 0.25 }}
			className="!fade-in w-fit flex items-center gap-0.5 rounded-full border border-white/10 bg-white/4 px-2 py-0.5 text-xs leading-relaxed text-white shadow-[inset_0_-4px_12px_0_rgba(255,255,255,0.1)] backdrop-blur-sm cursor-pointer hover:border-white/16 hover:text-white"
		>
			{' '}
			<Tooltip>
				<TooltipTrigger asChild>
					<Flex align="center">
						<div className="flex flex-none justify-center items-center w-4 h-4">
							<InfoIcon />
						</div>
						<p className="flex items-center gap-1">
							<NumberTicker
								value={parseInt(
									githubStats.totalCommits.toString()
								)}
							/>
							<span>Commits</span>
						</p>
					</Flex>
				</TooltipTrigger>
				<TooltipContent>
					Developed by{' '}
					<Link href={`https://github.com/${githubStats.madeBy}`}>
						{githubStats.madeBy}
					</Link>
				</TooltipContent>
			</Tooltip>
		</motion.div>
	)
}
