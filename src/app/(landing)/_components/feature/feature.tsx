import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ChevronRightIcon, DashLineIcon, InfoIcon, SendIcon } from '../icons'
import styles from './feature.module.scss'

const Feature: React.FC = () => {
	return (
		<div className={styles.featureContainerLines}>
			<div className={styles.containerRegular}>
				<div
					className={`${styles.titleLarge} ${styles.styleRLdKi}`}
					id="style-rLdKi"
				>
					<h2>
						<span className={styles.gradientSpan}>
							Utilize various tools to enhance your productivity
						</span>
					</h2>
					<div className={styles.maxWidthXSmall}>
						<p className={styles.paragraphRegular}>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Morbi vitae nulla lacinia, vulputate mauris
							eget, accumsan justo.
						</p>
					</div>
				</div>
				<div className={styles.wLayoutGrid}>
					<div
						className={`${styles.featureCard} ${styles.styleAmqbr}`}
						id="w-node-_9cae3f6c-7014-a431-41d0-b254058e175f-2f057c92"
					>
						<div className={styles.featureLine}></div>
						<div className={styles.featureHeading}>
							<div className={styles.iconWrap}>
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
							</div>
							<div className={styles.wrapVXSmall}>
								<div className={styles.h6Heading}>
									Integrate API driven AI
								</div>
								<p className={styles.paragraphRegular}>
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
									<div className={styles.featureBadge}>
										<div className={styles.iconXSmall}>
											✨
										</div>
										<div>Personable</div>
									</div>
									<div className={styles.featureBadge}>
										<div className={styles.iconXSmall}>
											🫠
										</div>
										<div>Empathetic</div>
									</div>
									<div className={styles.featureBadge}>
										<div className={styles.iconXSmall}>
											🎯
										</div>
										<div>Direct</div>
									</div>
									<div className={styles.featureBadge}>
										<div className={styles.iconXSmall}>
											😇
										</div>
										<div>Friendly</div>
									</div>
								</div>
							</div>
							<div className={styles.horizontalDividerDash}>
								<DashLineIcon />
							</div>
							<div className={styles.featureCardButonWrap}>
								<div className={styles.featureButtonSmall}>
									<div>Ui filling</div>
									<ChevronRightIcon
										className={styles.iconXSmall}
									/>
								</div>
								<div className={styles.featureButtonSmall}>
									<div>Ui filling</div>
									<ChevronRightIcon
										className={styles.iconXSmall}
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						className={`${styles.featureCard} ${styles.styleK2nBn}`}
						id="w-node-c9d3d20d-14d0-482d-e466-4732036d13c2-2f057c92"
					>
						<div className={styles.featureLine}></div>
						<div className={styles.featureHeading}>
							<div className={styles.iconWrap}>
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
							</div>
							<div className={styles.wrapVXSmall}>
								<div className={styles.h6Heading}>
									Finance insight
								</div>
								<p className={styles.paragraphRegular}>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Morbi vitae nulla lacinia,
									vulputate mauris eget.
								</p>
							</div>
						</div>
						<div className={styles.featureInner}>
							<div className={styles.wrapVLarge}>
								<div className={styles.featureButton}>
									<div className="flex items-center gap-2">
										<SendIcon
											className={styles.iconSmall}
										/>
										<div>Ui filling</div>
									</div>
									<ChevronRightIcon
										className={styles.iconXSmall}
									/>
								</div>
								<div className={styles.logoGroup}>
									<Image
										src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb604e608e9c9bea553_Logo%2004.webp"
										width={32}
										height={32}
										alt=""
										className={styles.logo}
									/>
									<Image
										src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb65f79476f2d80d5b5_Logo%2007.webp"
										width={32}
										height={32}
										alt=""
										className={styles.logo}
									/>
									<Image
										src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb6fa0980238f56800e_Logo%2002.webp"
										width={32}
										height={32}
										alt=""
										className={styles.logo}
									/>
									<Image
										src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb6c2934f49cce3e541_Logo%2005.webp"
										width={32}
										height={32}
										alt=""
										className={styles.logo}
									/>
									<Image
										src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb7478024bd67ee81d9_Logo%2001.webp"
										width={32}
										height={32}
										alt=""
										className={styles.logo}
									/>
									<Image
										src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb774d33600cce11313_Logo%2006.webp"
										width={32}
										height={32}
										alt=""
										className={styles.logo}
									/>
									<Image
										src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb85f1d9774b9242163_Logo%2003.webp"
										width={32.5}
										height={32.5}
										alt=""
										className={styles.logo}
									/>
								</div>
							</div>
							<div
								className={`${styles.horizontalDividerDash} ${styles.feature}`}
							>
								<DashLineIcon />
							</div>
							<div className={styles.featureCaption}>
								<div className="flex items-center gap-2">
									<InfoIcon className={styles.iconXSmall} />
									<div className={styles.paragraphSmall}>
										Get a grip on your wallet
									</div>
								</div>
								<Link
									href="/dashboard"
									className={styles.buttonPrimarySmall}
								>
									Get Started
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.linesGroup}>
				<div className={styles.lineVerticalLeft}></div>
				<div className={styles.lineVerticalRight}></div>
			</div>
		</div>
	)
}

export default Feature
