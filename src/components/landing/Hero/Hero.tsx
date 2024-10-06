'use client'

import FadeIn from '@/components/effects/fade-in'
import NumberTicker from '@/components/effects/number-ticker'
import ShinyButton from '@/components/effects/shiny-button'
import { fetchGitHubStats } from '@/core/server/actions/gh-stats'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import GradualSpacing from './Gradual-spacing'
import { TopLeftShiningLight } from './ShinyLighs'

type GitHubStats = {
	codingStreak: number
	totalCommits: number
	lastCommitDate: string | null
	lastCommitDay: string
	lastCommitHours: string
	lastCommitMinutes: string
	madeBy: string
}

export default function Hero() {
	const [githubStats, setGithubStats] = useState<GitHubStats>({
		codingStreak: 0,
		totalCommits: 0,
		lastCommitDate: null,
		lastCommitDay: 'N/A',
		lastCommitHours: '00',
		lastCommitMinutes: '00',
		madeBy: '@remcostoeten'
	})
	const [titleFadeIn, setTitleFadeIn] = useState(false)
	const [dataFadeIn, setDataFadeIn] = useState(false)

	const ref = useRef(null)
	const isInView = useInView(ref)

	useEffect(() => {
		async function loadGitHubStats() {
			try {
				const stats = await fetchGitHubStats()
				console.log('Received GitHub Stats:', stats) // Debug log
				setGithubStats(stats)
				setTitleFadeIn(true)
				setTimeout(() => setDataFadeIn(true), 500)
			} catch (error) {
				console.error('Failed to fetch GitHub stats:', error)
				setGithubStats({
					codingStreak: 0,
					totalCommits: 0,
					lastCommitDate: null,
					lastCommitDay: 'N/A',
					lastCommitHours: '00',
					lastCommitMinutes: '00',
					madeBy: '@remcostoeten'
				})
			}
		}
		loadGitHubStats()
	}, [])

	const renderLastCommitTimestamp = () => {
		const day = githubStats.lastCommitDay || 'N/A'
		const hours = githubStats.lastCommitHours || '00'
		const minutes = githubStats.lastCommitMinutes || '00'

		return (
			<>
				<span
					className={`transition-opacity duration-500 ${dataFadeIn ? 'opacity-100' : 'opacity-0'}`}
				>
					{day}{' '}
				</span>
				<span
					className={`transition-opacity duration-500 ${dataFadeIn ? 'opacity-100' : 'opacity-0'}`}
				>
					<NumberTicker value={parseInt(hours)} />
				</span>
				:
				<span
					className={`transition-opacity duration-500 ${dataFadeIn ? 'opacity-100' : 'opacity-0'}`}
				>
					<NumberTicker value={parseInt(minutes)} />
				</span>
			</>
		)
	}

	const renderValue = (value: number | string) => {
		if (typeof value === 'number') {
			return (
				<span
					className={`transition-opacity duration-500 ${dataFadeIn ? 'opacity-100' : 'opacity-0'}`}
				>
					<NumberTicker value={value} />
				</span>
			)
		}
		return (
			<span
				className={`transition-opacity duration-500 ${dataFadeIn ? 'opacity-100' : 'opacity-0'}`}
			>
				{value}
			</span>
		)
	}

	return (
		<div
			className="relative transition-opacity duration-500 ease-in-out -z-10"
			style={{ opacity: isInView ? 1 : 0 }}
		>
			<TopLeftShiningLight />
			<div className="absolute -z-1 inset-0 pointer-events-none h-[600px] w-full bg-transparent opacity-5 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
			<div className="justify-between md:flex">
				<Container className="relative mt-36 pb-8 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
					<div ref={ref}>
						<GradualSpacing
							textClassName="justify-start"
							visiblity={isInView}
							className="max-w-2xl text-5xl font-normal tracking-tighter text-title sm:text-6xl font-geist"
							text={'Notevault, a place for everything'}
						/>
						<GradualSpacing
							textClassName="justify-start"
							visiblity={isInView}
							className="max-w-2xl text-5xl font-normal tracking-tighter text-title sm:text-6xl font-geist"
							text={'related to being effective'}
						/>

						<div className="mt-6 space-y-6 tracking-tight text-subtitle sm:text-xl font-geist text-md mb-6">
							<FadeIn delay={0.2}>
								Your dashboard: a central hub for digital life.
								Manage notes, files, and tools in one place.
								Boost productivity with a streamlined interface.
							</FadeIn>
							<FadeIn delay={0.4}>
								Built by a developer, for myself. Without the
								well-known annoyance of having to wait for
								Cloudflare security checks, ads or reCAPTCHAs
							</FadeIn>
						</div>
						<FadeIn delay={0.6}>
							<Link className="mt-10 pt-10" href="/dashboard">
								<ShinyButton>Get started</ShinyButton>
							</Link>
						</FadeIn>
						<dl className="grid grid-cols-2 gap-y-6 gap-x-10 mt-10 sm:gap-y-10 sm:gap-x-16 sm:mt-16 sm:text-center lg:grid-cols-none lg:grid-flow-col lg:auto-cols-auto lg:justify-start lg:text-left">
							{[
								[
									'Last commit',
									renderLastCommitTimestamp(),
									''
								],
								['Total commits', githubStats.totalCommits, ''],
								[
									'Coding streak',
									githubStats.codingStreak,
									'days'
								],
								['Made by', githubStats.madeBy, '']
							].map(([name, value, unit], index) => (
								<FadeIn key={name} delay={0.8 + index * 0.1}>
									<div className="flex flex-col">
										<dt
											className={`font-mono text-sm text-title transition-opacity duration-500 ${titleFadeIn ? 'opacity-100' : 'opacity-0'}`}
										>
											{name}
										</dt>
										<dd className="mt-0.5 text-2xl font-normal  tracking-tight subtitle font-geist">
											{renderValue(value)}
											{unit && (
												<span
													className={`text-sm font-normal transition-opacity text-subtitle subtitle duration-500 ${dataFadeIn ? 'opacity-100' : 'opacity-0'}`}
												>
													{' '}
													{unit}
												</span>
											)}
										</dd>
									</div>
								</FadeIn>
							))}
						</dl>
					</div>
				</Container>
			</div>
		</div>
	)
}

export function Container({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	return <div className={className} {...props} />
}
