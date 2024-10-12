'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import HorizontalLine from '../horizontal-line'
import styles from './content.module.scss'

type FormData = {
	email: string
}

type FeatureProps = {
	icon: string
	title: string
	description: string
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 1.65,
			staggerChildren: 0.2
		}
	}
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 }
}

function Feature({ icon, title, description }: FeatureProps) {
	return (
		<motion.div className={styles.wrapHRegular} variants={itemVariants}>
			<div className={styles.iconWrap}>
				<Image
					src={icon}
					width={22}
					height={22}
					alt=""
					className={styles.featureIcon}
				/>
				<div className={styles.iconLine}></div>
			</div>
			<div className={styles.block}>
				<div className={styles.labelRegular}>
					<span className="gradient-span">{title}</span>
				</div>
				<p className="text-subtitle text-xxs">{description}</p>
			</div>
		</motion.div>
	)
}

export default function Content() {
	return (
		<div className={styles.contentContainerLines}>
			<motion.div
				className={styles.containerRegular}
				initial="hidden"
				animate="visible"
				variants={containerVariants}
			>
				<div className={styles.gridTwoColumn}>
					<motion.div
						className={styles.wrapVXlarge}
						variants={itemVariants}
					>
						<div className={styles.wrapVLarge}>
							<motion.div
								className={styles.wrapVSmall}
								variants={itemVariants}
							>
								<h3>
									<span className="gradient-span">
										Log anything you wish.{' '}
									</span>
								</h3>
								<p className="text-subtitle text-xxs">
									{' '}
									Any data you want to get a grip on. Files,
									finances, lists, contracts, paperwork,
									text-messages, emails, and more.
								</p>
							</motion.div>
							<Feature
								icon="/landing/gradient-icon.webp"
								title="You, and your brain"
								description="No annoying prompts or bad AI implementations."
							/>
							<Feature
								icon="/landing/gradient-icon2.webp"
								title="Optimizing Data Collection"
								description="Privacy is key. We do our best to keep your data private."
							/>
						</div>
					</motion.div>
					<motion.div
						className={styles.imageWrap}
						variants={itemVariants}
					>
						<Image
							src="/landing/right.png"
							width={384}
							height={384}
							alt=""
						/>
						<div className={styles.imageWrapBorder}>
							<Image
								src="/landing/right-bottom.webp"
								width={376}
								height={376}
								alt=""
							/>
						</div>
					</motion.div>
				</div>
			</motion.div>
			<motion.div className={styles.linesGroup} variants={itemVariants}>
				<div className={styles.lineVerticalLeft}></div>
				<div className={styles.lineVerticalRight}></div>
				<div className={`${styles.lineDot} ${styles.bottomLeft}`}></div>
				<div
					className={`${styles.lineDot} ${styles.bottomRight}`}
				></div>
				<div className={`${styles.lineDot} ${styles.topLeft}`}></div>
				<div className={`${styles.lineDot} ${styles.topRight}`}></div>
			</motion.div>
			<HorizontalLine />
		</div>
	)
}
