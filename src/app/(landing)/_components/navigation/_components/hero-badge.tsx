'use client'

import NumberTicker from '@/components/effects/number-ticker'
import { fetchGitHubStats } from 'actions'
import { motion } from 'framer-motion'
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
			transition={{ duration: 0.5, delay: 0 }}
			className="w-fit flex items-center gap-0.5 rounded-full border border-white/10 bg-white/4 px-2 py-0.5 text-xs leading-relaxed text-white shadow-[inset_0_-4px_12px_0_rgba(255,255,255,0.1)] backdrop-blur-sm cursor-pointer transition-all duration-200 ease-in-out hover:border-white/16 hover:text-white"
		>
			<div className="flex flex-none justify-center items-center w-4 h-4">
				<InfoIcon />
			</div>
			<p className="flex items-center gap-1">
				<NumberTicker
					value={parseInt(githubStats.totalCommits.toString())}
				/>
				<span>Commits</span>
			</p>
		</motion.div>
	)
}
