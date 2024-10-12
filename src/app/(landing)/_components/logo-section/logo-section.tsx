'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import HorizontalLine from '../horizontal-line'
import styles from './logos.module.scss'

export default function LogoSection() {
	const logos = [
		{
			src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb604e608e9c9bea553_Logo%2004.webp',
			width: 32
		},
		{
			src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb65f79476f2d80d5b5_Logo%2007.webp',
			width: 32
		},
		{
			src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb6fa0980238f56800e_Logo%2002.webp',
			width: 32
		},
		{
			src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb6c2934f49cce3e541_Logo%2005.webp',
			width: 32
		},
		{
			src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb7478024bd67ee81d9_Logo%2001.webp',
			width: 32
		},
		{
			src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb774d33600cce11313_Logo%2006.webp',
			width: 32
		},
		{
			src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb85f1d9774b9242163_Logo%2003.webp',
			width: 32.5
		}
	]

	return (
		<div className="relative">
			<div className={styles.containerLinesRegular}>
				<div className={styles.containerRegular}>
					<motion.div
						className={styles.logoWrapper}
						id="style-HGdCz"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.75, delay: 0.75 }}
					>
						<div
							className={`${styles.paragraphSmall} ${styles.textColorWhite}`}
						>
							Trusted by 10+ companies worldwide
						</div>
						<div className={styles.logoGroup}>
							{logos.map((logo, index) => (
								<Image
									key={index}
									src={logo.src}
									width={logo.width}
									height={32}
									alt=""
									className={styles.logo}
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
