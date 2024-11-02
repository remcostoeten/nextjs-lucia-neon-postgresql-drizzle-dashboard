'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import HorizontalLine from '../horizontal-line'
import styles from './logos.module.scss'

export const logos = [
	{
		src: '/landing/icon-logos/logo1.webp',
		width: 32
	},
	{
		src: '/landing/icon-logos/logo2.webp',
		width: 32
	},
	{
		src: '/landing/icon-logos/logo3.webp',
		width: 32
	},
	{
		src: '/landing/icon-logos/logo4.webp',
		width: 32
	},
	{
		src: '/landing/icon-logos/logo5.webp',
		width: 32
	},
	{
		src: '/landing/icon-logos/logo6.webp',
		width: 32
	},
	{
		src: '/landing/icon-logos/logo7.webp',
		width: 32.5
	}
]

export default function LogoSection() {
	return (
		<div className="relative">
			<div className={styles.containerLinesRegular}>
				<div className="containerRegular">
					<motion.div
						className="logoWrapper"
						id="style-HGdCz"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.75, delay: 0.75 }}
					>
						<div className="text-subtitle mb-6 space-x-2 text-center text-xs">
							<span className="span-gradient">
								Used by 1,(one) user worldwide! Me!{' '}
							</span>
							<span className="animate-pulse">✨</span>
						</div>
						<div className="flex flex-wrap justify-between gap-6">
							{logos.map((logo, index) => (
								<Image
									key={index}
									src={logo.src}
									width={logo.width}
									height={32}
									alt=""
									className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110"
								/>
							))}
						</div>
					</motion.div>
				</div>
				<div className={styles.linesGroup}>
					<div className={styles.lineVerticalLeft}></div>
					<div className={styles.lineVerticalRight}></div>
					<div
						className={`${styles.lineDot} ${styles.bottomLeft}`}
					></div>
					<div
						className={`${styles.lineDot} ${styles.bottomRight}`}
					></div>
				</div>
			</div>
			<HorizontalLine />
		</div>
	)
}
