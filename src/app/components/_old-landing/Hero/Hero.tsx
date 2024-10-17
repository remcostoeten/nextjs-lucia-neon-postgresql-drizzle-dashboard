'use client'

import FadeIn from '@/components/effects/fade-in'
import NumberTicker from '@/components/effects/number-ticker'
import ShinyButton from '@/components/effects/shiny-button'
import { fetchGitHubStats } from 'actions'
import { useInView } from 'framer-motion'
import { en } from 'locales'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import GradualSpacing from './Gradual-spacing'
import { TopLeftShiningLight } from './ShinyLighs'
import Notice from '@/components/ui/notice'
import { Footer } from '../footer'

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
		<>
			<Notice id={'old-landing-page-notice'}>
				The landing page I was previously working on
			</Notice>
			<section className="-z-10">
				<TopLeftShiningLight />
				<div className="absolute -z-1- inset-0 pointer-events-none h-[600px] w-full bg-transparent opacity-5 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
				<div className="justify-between md:flex">
					<Container className="relative mt-36 pb-8 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
						<div ref={ref}>
							<GradualSpacing
								textClassName="justify-start"
								visiblity={isInView}
								className="max-w-4xl text-4xl font-normal tracking-tighter text-title sm:text-5xl lg:text-5xl font-geist"
								text={en.default.hero.title}
								breakAfter="everything"
							/>

							<div className="mt-6 text-subtitle  space-y-6 tracking-tight text-subtitle text-sm sm:text-base lg:text-lg font-geist mb-6 max-w-3xl">
								<FadeIn delay={0.2}>
									<p className="text-subtitle">
										{en.default.hero.subtitle}
									</p>
								</FadeIn>
								<FadeIn delay={0.4}>
									<p className="text-subtitle">
										{en.default.hero.subtitle2}
									</p>
								</FadeIn>
							</div>
							<FadeIn delay={0.6}>
								<Link className="mt-10 pt-10" href="/dashboard">
									<ShinyButton>
										{en.default.hero.button}
									</ShinyButton>
								</Link>
							</FadeIn>
							<dl className="grid grid-cols-2 gap-y-6 gap-x-6 mt-10 sm:gap-y-8 sm:gap-x-10 sm:mt-16 lg:grid-cols-4 lg:gap-x-12 text-left">
								{[
									[
										en.default.hero.stats.lastCommit,
										renderLastCommitTimestamp(),
										''
									],
									[
										en.default.hero.stats.totalCommits,
										githubStats.totalCommits,
										''
									],
									[
										en.default.hero.stats.codingStreak,
										githubStats.codingStreak,
										en.default.hero.stats.daysUnit
									],
									[
										en.default.githubStats.madeBy,
										githubStats.madeBy,
										''
									]
								].map(([name, value, unit], index) => (
									<FadeIn
										key={name}
										delay={0.8 + index * 0.1}
									>
										<div className="flex flex-col">
											<dt
												className={`font-mono text-sm text-title transition-opacity duration-500 ${titleFadeIn ? 'opacity-100' : 'opacity-0'}`}
											>
												{name}
											</dt>
											<dd className="mt-0.5 text-2xl font-normal tracking-tight subtitle font-geist">
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
			</section>

			<Footer />
		</>
	)
}

export function Container({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	return <div className={className} {...props} />
}
