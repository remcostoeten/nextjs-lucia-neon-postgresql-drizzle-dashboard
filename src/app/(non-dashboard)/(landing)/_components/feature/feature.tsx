import React from 'react'
import { Flex } from '@/components/atoms'
import useMouseHoverEffect from '@/core/hooks/use-mouse-hover'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ChartLine, LockIcon } from 'lucide-react'
import Image from 'next/image'
import { SiBuysellads } from 'react-icons/si'
import { ChevronRightIcon, DashLineIcon } from '../icons'
import { logos } from '../logo-section/logo-section'
import RainbowLine from '../rainbow-line'
import FeatureBadges from './_components/emoji-badges'
import styles from './feature.module.scss'
import { Icons } from '@/components/base/icons'

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
	const useMouseHoverEffectRef1 = useMouseHoverEffect()
	const useMouseHoverEffectRef2 = useMouseHoverEffect()
	const logosToRender = logos.length - 2

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
					{[useMouseHoverEffectRef1, useMouseHoverEffectRef2].map(
						(ref, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								className={`${styles.featureCard} ${styles.styleK2nBn} flex-1 hover-effect`}
								ref={ref}
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
											Lorem ipsum dolor sit amet,
											consectetur adipiscing elit. Morbi
											vitae nulla lacinia, vulputate
											mauris eget.
										</p>
									</div>
								</div>
								<div className={styles.featureInner}>
									<div className={styles.wrapVLarge}>
										<div className="flex flex-wrap justify-between items-center gap-6 w-full px-6">
											{logos
												.slice(0, logosToRender)
												.map((logo, logoIndex) => (
													<motion.div
														key={logoIndex}
														variants={iconVariants}
													>
														<Image
															src={logo.src}
															width={logo.width}
															height={logo.width}
															alt={`Logo ${logoIndex + 1}`}
															className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110"
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
						)
					)}
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
					<Icons.racelap />
				</div>
				<div>{children}</div>
			</div>
			<div className="flex items-center justify-center w-4 h-4">
				<Icons.triangle />
			</div>
		</div>
	)
}
