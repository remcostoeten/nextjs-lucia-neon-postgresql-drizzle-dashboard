'use client'

import { fetchGitHubStats } from '@/core/server/actions'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ChartLine, LockIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SiBuysellads } from 'react-icons/si'
import { ChevronRightIcon, DashLineIcon, InfoIcon, SendIcon } from '../icons'
import RainbowLine from '../rainbow-line'
import styles from './feature.module.scss'

type GitHubStats = {
	totalCommits: number
	madeBy: string
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 1.2,
			staggerChildren: 0.2
		}
	}
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5
		}
	}
}

const iconVariants = {
	hidden: { scale: 0, opacity: 0 },
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 260,
			damping: 20,
			delay: 1.5
		}
	}
}

const lineVariants = {
	hidden: { pathLength: 0, opacity: 0 },
	visible: {
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 1,
			ease: 'easeInOut',
			delay: 1.7
		}
	}
}

export default function Feature() {
	const [githubStats, setGithubStats] = useState<GitHubStats>({
		totalCommits: 0,
		madeBy: '@remcostoeten'
	})

	useEffect(() => {
		async function loadGitHubStats() {
			try {
				const stats = await fetchGitHubStats()
				console.log('Received GitHub Stats:', stats)
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
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className={cn(
				'pt-[55px] pb-[65px]',
				'px-theme z-5 w-full max-w-big-wrapper mx-auto relative'
			)}
		>
			<div className="w-full max-w-wrapper mx-auto relative flex flex-col h-full">
				<motion.div
					variants={itemVariants}
					className={`${styles.titleLarge} ${styles.styleRLdKi}`}
					id="style-rLdKi"
				>
					<h2>
						<span className="gradient-span">
							Utilize various tools to <br />
							enhance your productivity
						</span>
					</h2>
					<div className={styles.maxWidthXSmall}>
						<p className="text-xxs text-subtitle">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Morbi vitae nulla lacinia, vulputate mauris
							eget, accumsan justo.
						</p>
					</div>
				</motion.div>
				<div className="flex flex-col sm:flex-row gap-4 flex-1 h-full">
					<motion.div
						variants={itemVariants}
						className={`${styles.featureCard} ${styles.styleAmqbr} flex-1`}
						id="w-node-_9cae3f6c-7014-a431-41d0-b254058e175f-2f057c92"
					>
						<RainbowLine small />
						<div className={styles.featureHeading}>
							<motion.div
								variants={iconVariants}
								className={styles.iconWrap}
							>
								<Image
									src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65ba147e893caa2c9bff1605_Feature%20Icon%2001.webp"
									width={22}
									height={22}
									alt=""
									className={styles.featureIcon}
								/>
								<Image
									src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65ba147efb6d9006e1aed951_Icon%20Blur.svg"
									width={22}
									height={22}
									alt=""
									className={styles.iconBlur}
								/>
							</motion.div>
							<div className={styles.wrapVXSmall}>
								<div className={styles.h6Heading}>
									Logbook your thoughts
								</div>
								<p className="text-xxs text-subtitle">
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Morbi vitae nulla lacinia,
									vulputate mauris eget.
								</p>
							</div>
						</div>
						<div className={styles.featureInner}>
							<div className={styles.wrapVXSmall}>
								<div
									className={`${styles.paragraphSmall} ${styles.textColorNeutral300}`}
								>
									Formality
								</div>
								<div className="flex gap-2 flex-wrap">
									<motion.div
										variants={itemVariants}
										className={styles.featureBadge}
									>
										<motion.div
											variants={iconVariants}
											className={styles.iconXSmall}
										>
											<SiBuysellads className="greyscale" />
										</motion.div>
										<div>Personal</div>
									</motion.div>
									<motion.div
										variants={itemVariants}
										className={styles.featureBadge}
									>
										<motion.div
											variants={iconVariants}
											className={styles.iconXSmall}
										>
											<LockIcon className="greyscale" />
										</motion.div>
										<div>Secure</div>
									</motion.div>
									<motion.div
										variants={itemVariants}
										className={styles.featureBadge}
									>
										<motion.div
											variants={iconVariants}
											className={styles.iconXSmall}
										>
											<ChartLine className="greyscale" />
										</motion.div>
										<div>Insights</div>
									</motion.div>
								</div>
							</div>
							<motion.div
								variants={lineVariants}
								className={styles.horizontalDividerDash}
							>
								<DashLineIcon />
							</motion.div>
							<div className={styles.featureCardButonWrap}>
								<motion.div
									variants={itemVariants}
									className={styles.featureButtonSmall}
								>
									<div>Ui filling</div>
									<ChevronRightIcon
										className={styles.iconXSmall}
									/>
								</motion.div>
								<motion.div
									variants={itemVariants}
									className={styles.featureButtonSmall}
								>
									<div>Ui filling</div>
									<ChevronRightIcon
										className={styles.iconXSmall}
									/>
								</motion.div>
							</div>
						</div>
					</motion.div>
					<motion.div
						variants={itemVariants}
						className={`${styles.featureCard} ${styles.styleK2nBn} flex-1`}
						id="w-node-c9d3d20d-14d0-482d-e466-4732036d13c2-2f057c92"
					>
						<RainbowLine small />
						<div className={styles.featureHeading}>
							<motion.div
								variants={iconVariants}
								className={styles.iconWrap}
							>
								<Image
									src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65ba147ed99fff370aa907ee_Feature%20Icon%2002.webp"
									width={22}
									height={22}
									alt=""
									className={styles.featureIcon}
								/>
								<Image
									src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65ba147efb6d9006e1aed951_Icon%20Blur.svg"
									width={22}
									height={22}
									alt=""
									className={styles.iconBlur}
								/>
							</motion.div>
							<div className={styles.wrapVXSmall}>
								<div className={styles.h6Heading}>
									Finance insight
								</div>
								<p className="text-[14px] text-subtitle">
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Morbi vitae nulla lacinia,
									vulputate mauris eget.
								</p>
							</div>
						</div>
						<div className={styles.featureInner}>
							<div className={styles.wrapVLarge}>
								<motion.div
									variants={itemVariants}
									className={styles.featureButton}
								>
									<div className="flex items-center gap-2">
										<motion.div variants={iconVariants}>
											<SendIcon
												className={styles.iconSmall}
											/>
										</motion.div>
										<div>Ui filling</div>
									</div>
									<ChevronRightIcon
										className={styles.iconXSmall}
									/>
								</motion.div>
								<div className={styles.logoGroup}>
									{[1, 2, 3, 4, 5, 6, 7].map(num => (
										<motion.div
											key={num}
											variants={iconVariants}
										>
											<Image
												src={`https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb${num}${['604e608e9c9bea553', '5f79476f2d80d5b5', 'fa0980238f56800e', '6c2934f49cce3e541', '478024bd67ee81d9', '74d33600cce11313', '85f1d9774b9242163'][num - 1]}_Logo%20${num < 7 ? '0' : ''}${num}.webp`}
												width={32}
												height={32}
												alt=""
												className={styles.logo}
											/>
										</motion.div>
									))}
								</div>
							</div>
							<motion.div
								variants={lineVariants}
								className={`${styles.horizontalDividerDash} ${styles.feature}`}
							>
								<DashLineIcon />
							</motion.div>
							<div className={styles.featureCaption}>
								<motion.div
									variants={itemVariants}
									className="flex items-center gap-2"
								>
									<motion.div variants={iconVariants}>
										<InfoIcon
											className={styles.iconXSmall}
										/>
									</motion.div>
									<div className={styles.paragraphSmall}>
										Get a grip on your wallet
									</div>
								</motion.div>
								<motion.div variants={itemVariants}>
									<Link
										href="/dashboard"
										className={styles.buttonPrimarySmall}
									>
										Get Started
									</Link>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
			<motion.div variants={itemVariants} className={styles.linesGroup}>
				<motion.div
					variants={lineVariants}
					className={styles.lineVerticalLeft}
				></motion.div>
				<motion.div
					variants={lineVariants}
					className={styles.lineVerticalRight}
				></motion.div>
			</motion.div>
		</motion.div>
	)
}
