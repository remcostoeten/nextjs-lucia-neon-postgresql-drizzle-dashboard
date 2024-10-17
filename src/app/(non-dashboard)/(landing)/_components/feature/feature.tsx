'use client'

import { Flex } from '@/components/atoms'
import { fetchGitHubStats } from '@/core/server/actions'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ChartLine, LockIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { SiBuysellads } from 'react-icons/si'
import { ChevronRightIcon, DashLineIcon } from '../icons'
import RainbowLine from '../rainbow-line'
import FeatureBadges from './_components/emoji-badges'
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
			<div className="w-full max-w-wrapper relative flex flex-col h-full">
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
							I mostly build custom solutions for my own problems
							which are very niche, nonetheless there will be
							plenty of features for you.
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
									src="/landing/feature/feature1.webp"
									width={22}
									height={22}
									alt=""
									className={styles.featureIcon}
								/>
								<Image
									src="/landing/feature/feature2.webp"
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

						<div className="flex flex-col items-stretch gap-6 p-7 border border-neutral-800 rounded-[12px_12px_20px_20px]">
							<Flex dir="col" gap="2">
								<div className="text-xxs leading-[1.7] tracking-[-0.02em] mb-0 text-subtitle">
									Formality
								</div>
								<div className="flex gap-2 flex-wrap">
									<FeatureBadge>
										<motion.div
											variants={iconVariants}
											className="flex-none flex justify-center items-center w-4 h-4"
										>
											<SiBuysellads className="greyscale" />
										</motion.div>
										<div>Personal</div>
									</FeatureBadge>
									<FeatureBadge>
										<motion.div
											variants={iconVariants}
											className="flex-none flex justify-center items-center w-4 h-4"
										>
											<LockIcon className="greyscale" />
										</motion.div>
										<div>Secure</div>
									</FeatureBadge>
									<FeatureBadge>
										<motion.div
											variants={iconVariants}
											className="flex-none flex justify-center items-center w-4 h-4"
										>
											<ChartLine className="greyscale" />
										</motion.div>
										<div>Insights</div>
									</FeatureBadge>
								</div>
							</Flex>
							<motion.div
								variants={lineVariants}
								className="flex items-center w-full h-0.5"
							>
								<DashLineIcon />
							</motion.div>
							<div className={styles.featureCardButonWrap}>
								<motion.div
									variants={itemVariants}
									className="button--small"
								>
									<div>Ui filling</div>
									<ChevronRightIcon
										className={styles.iconXSmall}
									/>
								</motion.div>
								<motion.div
									variants={itemVariants}
									className="button--small"
								>
									<div>Ui filling</div>
									<ChevronRightIcon
										className={styles.iconXSmall}
									/>
								</motion.div>
							</div>
							<FeatureSelect>Some select</FeatureSelect>
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
							<Flex dir="col" gap="2">
								<motion.div
									variants={itemVariants}
									className="flex flex-col h-full"
								>
									<Flex
										dir="col"
										gap="2"
										className="p-4 h-full"
									>
										<Flex dir="col" gap="2">
											<div className="text-xxs leading-[1.7] tracking-[-0.02em] mb-0 text-subtitle">
												Formality
											</div>
											<FeatureBadges />
										</Flex>
									</Flex>
								</motion.div>
								<motion.div
									variants={itemVariants}
								></motion.div>
							</Flex>
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

function FeatureBadge({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			variants={itemVariants}
			className="
    flex items-center gap-[2px] px-2 py-[2px] pl-1.5
    text-[12px] leading-[1.7] 
    border border-[rgba(255,255,255,0.1)] rounded-[40px]
    bg-[rgba(255,255,255,0.04)]
    shadow-[inset_0_-4px_12px_0_rgba(255,255,255,0.1)]
    backdrop-blur-[12px]
    cursor-pointer
    transition-[color,opacity] duration-200 ease-in-out
    hover:border-[rgba(255,255,255,0.16)] hover:text-white
  "
		>
			{children}
		</motion.div>
	)
}

function FeatureSelect({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="
    flex items-center gap-[2px] px-2 py-[2px] pl-1.5
    text-[12px] leading-[1.7] 
    border border-[rgba(255,255,255,0.1)] rounded-[10px]
    bg-[rgba(255,255,255,0.04)] justify-between
    shadow-[inset_0_-4px_12px_0_rgba(255,255,255,0.1)]
    backdrop-blur-[12px]
    cursor-pointer
    transition-[color,opacity] duration-200 ease-in-out
    hover:border-[rgba(255,255,255,0.16)] hover:text-white
  "
		>
			<div className="flex items-center gap-2">
				<div className="flex items-center justify-center w-5 h-5">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7.33366 5.47924C7.33367 4.91266 7.54206 4.36356 7.9234 3.92535C8.30474 3.48713 8.83549 3.18685 9.42537 3.07557L14.8888 2.0474C15.2662 1.97646 15.6556 1.98524 16.0289 2.07313C16.4023 2.16101 16.7503 2.3258 17.0479 2.55562C17.3455 2.78544 17.5852 3.07457 17.7499 3.40218C17.9145 3.72978 17.9999 4.0877 18 4.45015V4.47955C17.999 5.04528 17.7901 5.59326 17.4088 6.03041C17.0276 6.46756 16.4974 6.76694 15.9083 6.87771L12.6663 7.48873V9.49731C12.6663 10.0639 12.4579 10.613 12.0766 11.0512C11.6953 11.4894 11.1645 11.7897 10.5746 11.901L4.09171 13.1221C3.50182 13.233 2.971 13.5331 2.58961 13.9712C2.20823 14.4093 1.99986 14.9583 2 15.5249V15.5497C2.00003 15.9122 2.08547 16.2702 2.25017 16.5979C2.41486 16.9256 2.65471 17.2148 2.95241 17.4446C3.25011 17.6745 3.59825 17.8392 3.97173 17.927C4.34521 18.0148 4.73473 18.0235 5.1122 17.9524L5.24098 17.9285C5.83104 17.8174 6.362 17.5172 6.74354 17.079C7.12507 16.6408 7.3336 16.0916 7.33366 15.5249V5.47924Z"
							stroke="currentColor"
							strokeWidth="1.6"
							strokeMiterlimit="10"
						/>
					</svg>
				</div>
				<div>{children}</div>
			</div>
			<div className="flex items-center justify-center w-4 h-4">
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M14.4999 7.99323C14.5004 8.1714 14.4532 8.34645 14.3633 8.50029C14.2735 8.65412 14.1441 8.78115 13.9887 8.86823L3.49429 14.8689C3.34351 14.9544 3.17325 14.9996 2.99992 15.0001C2.84007 14.9998 2.68263 14.9611 2.5408 14.8874C2.39896 14.8137 2.27687 14.7071 2.18474 14.5764C2.09262 14.4458 2.03315 14.295 2.01132 14.1367C1.98949 13.9783 2.00594 13.817 2.05929 13.6664L3.76867 8.66948C3.78551 8.62004 3.81741 8.57712 3.8599 8.54674C3.90238 8.51637 3.95331 8.50006 4.00554 8.5001H8.49992C8.56846 8.50026 8.6363 8.48631 8.69923 8.45914C8.76216 8.43196 8.81883 8.39214 8.86572 8.34215C8.91261 8.29215 8.94872 8.23305 8.9718 8.16851C8.99489 8.10397 9.00446 8.03537 8.99992 7.96698C8.98858 7.83841 8.92909 7.71886 8.83336 7.63229C8.73763 7.54572 8.61273 7.4985 8.48367 7.5001H4.00992C3.95777 7.5002 3.90689 7.48398 3.86442 7.45372C3.82194 7.42346 3.78999 7.38068 3.77304 7.33136L2.05804 2.33136C1.99126 2.13976 1.98433 1.93239 2.03819 1.73676C2.09205 1.54114 2.20413 1.36653 2.35957 1.23612C2.51501 1.1057 2.70644 1.02566 2.90845 1.00661C3.11045 0.987567 3.31347 1.03042 3.49054 1.12948L13.9905 7.1226C14.145 7.20956 14.2735 7.33601 14.363 7.48899C14.4525 7.64197 14.4998 7.81599 14.4999 7.99323Z"
						fill="currentColor"
					/>
				</svg>
			</div>
		</div>
	)
}
