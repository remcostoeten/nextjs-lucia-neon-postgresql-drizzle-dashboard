'use client'

import React, { useEffect, useState } from 'react'
import styles from './powered-by.module.scss'

const carouselData = [
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd507261f4d64d555c90_Apple%20Icon.webp',
		alt: 'Apple',
		text: 'Apple'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd50800bda510d0058d4_Slack%20Icon.webp',
		alt: 'Slack',
		text: 'Slack'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd5094b722f62744d5f9_Discord%20Icon.webp',
		alt: 'Discord',
		text: 'Discord'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd5089af154f1bcc3356_Klarna%20Icon.webp',
		alt: 'Klarna',
		text: 'Klarna'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd5035c3344bd742b7c2_Amazon%20Icon.webp',
		alt: 'Amazon',
		text: 'Amazon'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd5089af154f1bcc3364_Meta%20Icon.webp',
		alt: 'Meta',
		text: 'Meta'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd5189af154f1bcc3420_Yelp%20Icon.webp',
		alt: 'Yelp',
		text: 'Yelp'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd51800bda510d005915_Xing%20Icon.webp',
		alt: 'Xing',
		text: 'Xing'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd50fca0ab56c8130f39_Twitch%20Icon.webp',
		alt: 'Twitch',
		text: 'Twitch'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd5096bc5b82059cbe01_Android%20Icon.webp',
		alt: 'Android',
		text: 'Android'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd507261f4d64d555c9e_Behance%20Icon.webp',
		alt: 'Behance',
		text: 'Behance'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65bdfd505f54112ef377e290_Shopify%20Icon.webp',
		alt: 'Shopify',
		text: 'Shopify'
	}
]

const CarouselItem = React.memo(({ src, alt, text }) => (
	<div className={styles['carousel-item']}>
		<img
			src={src}
			loading="lazy"
			width="32"
			alt={alt}
			className={styles['icon-large']}
		/>
		<div className={styles['text-block']}>{text}</div>
	</div>
))

const Carousel = ({ items, reverse = false }) => {
	return (
		<div
			className={`${styles['carousel-holder']} ${reverse ? styles.reverse : ''}`}
		>
			<div
				className={`${styles.carousel} ${reverse ? styles.reverse : ''}`}
			>
				<div className={styles['carousel-group']}>
					{items.map((item, index) => (
						<CarouselItem key={index} {...item} />
					))}
				</div>
			</div>
		</div>
	)
}

export default function PoweredBy() {
	const [randomStat, setRandomStat] = useState(3200)

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
		>
			<div className={styles['container-regular']}>
				<div className={styles['integration-title']}>
					<div className={styles.badge}>
						<div>Application powered by</div>
					</div>
					<h3>
						<span className={styles['gradient-span']}>
							Cutting edge tech
							<br />
							No-nonsense bloat
						</span>
					</h3>
				</div>
				<div className={styles['integration-wrapper']}>
					<Carousel items={carouselData.slice(0, 6)} />
					<Carousel items={carouselData.slice(6)} reverse={true} />
					<div className={styles['integration-circle']}>
						<div className={styles['integration-circle-inner']}>
							<div className={styles.block}>
								<div className={styles['h3-heading']}>
									<span className={styles['gradient-span']}>
										{randomStat.toLocaleString()}+
									</span>
								</div>
								<div
									className={`${styles['headline-small']} ${styles['text-color-neutral-300']}`}
								>
									Random statistic
								</div>
							</div>
							<img
								src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65be03ec94b722f627489a4e_Integration%20Circle.webp"
								loading="lazy"
								alt=""
								className={styles['circle-background']}
							/>
						</div>
						<img
							src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65be04fcd42815524b602891_Dash%20Border.svg"
							loading="lazy"
							alt=""
							className={styles['circle-dash-border']}
						/>
					</div>
				</div>
				<div
					className={`${styles['max-width-x-small']} ${styles['spacing-c']}`}
				>
					<p className={styles['paragraph-regular']}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Morbi vitae nulla lacinia, vulputate mauris eget,
						accumsan justo.
					</p>
				</div>
			</div>
			<div className={styles['lines-group']}>
				<div className={styles['line-vertical-left']}></div>
				<div className={styles['line-vertical-right']}></div>
			</div>
		</div>
	)
}
