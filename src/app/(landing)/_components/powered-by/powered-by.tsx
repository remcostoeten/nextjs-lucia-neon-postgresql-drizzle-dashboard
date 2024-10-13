'use client'

import { useEffect, useState } from 'react'
import IntegrationTitle from './integration-title'
import MarqueeDemo from './Marquee'
import styles from './powered-by.module.scss'
import HorizontalLine from '../horizontal-line'

export default function PoweredBy() {
	const [randomStat, setRandomStat] = useState<number>(3200)

	useEffect(() => {
		const interval = setInterval(() => {
			setRandomStat(prev =>
				Math.max(
					3000,
					Math.min(3500, prev + Math.floor(Math.random() * 21) - 10)
				)
			)
		}, 2000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div
			className={`${styles['container-lines-large']} ${styles.overflow}`}
			data-testid="container-lines-large"
		>
			<IntegrationTitle />
			<div
				className={styles['container-regular']}
				data-testid="container-regular"
			>
				<div
					className={styles['integration-wrapper']}
					data-testid="integration-wrapper"
				>
					<MarqueeDemo />
					<MarqueeDemo reverse={true} />
					<div
						className={styles['integration-circle']}
						data-testid="integration-circle"
					>
						<div
							className={styles['integration-circle-inner']}
							data-testid="integration-circle-inner"
						>
							<div className={styles.block} data-testid="block">
								<div
									className={styles['h3-heading']}
									data-testid="h3-heading"
								>
									<span
										className={styles['gradient-span']}
										data-testid="gradient-span"
									>
										{randomStat.toLocaleString()}+
									</span>
								</div>
								<div
									className={`${styles['headline-small']} ${styles['text-color-neutral-300']}`}
									data-testid="headline-small"
								>
									Random statistic
								</div>
							</div>
							<img
								src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65be03ec94b722f627489a4e_Integration%20Circle.webp"
								loading="lazy"
								alt=""
								className={styles['circle-background']}
								data-testid="circle-background"
							/>
						</div>
						<img
							src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65be04fcd42815524b602891_Dash%20Border.svg"
							loading="lazy"
							alt=""
							className={styles['circle-dash-border']}
							data-testid="circle-dash-border"
						/>
					</div>
				</div>
				<div
					className={`${styles['max-width-x-small']} ${styles['spacing-c']}`}
					data-testid="max-width-x-small"
				></div>
			</div>
			<div className={styles['lines-group']} data-testid="lines-group">
				<div
					className={styles['line-vertical-left']}
					data-testid="line-vertical-left"
				></div>
				<div
					className={styles['line-vertical-right']}
					data-testid="line-vertical-right"
				></div>
			</div>
			<HorizontalLine />
		</div>
	)
}
