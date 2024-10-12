'use client'

import React, { useEffect, useState } from 'react'
import styles from './powered-by.module.scss'

type CarouselItemProps = {
	src: string
	alt: string
	text: string
}

type CarouselProps = {
	items: CarouselItemProps[]
	reverse?: boolean
}

const carouselData: CarouselItemProps[] = [
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd507261f4d64d555c90_Apple%20Icon.webp',
		alt: 'Apple',
		text: 'Apple'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd50800bda510d0058d4_Slack%20Icon.webp',
		alt: 'Slack',
		text: 'Slack'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd5094b722f62744d5f9_Discord%20Icon.webp',
		alt: 'Discord',
		text: 'Discord'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd5089af154f1bcc3356_Klarna%20Icon.webp',
		alt: 'Klarna',
		text: 'Klarna'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd5035c3344bd742b7c2_Amazon%20Icon.webp',
		alt: 'Amazon',
		text: 'Amazon'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd5089af154f1bcc3364_Meta%20Icon.webp',
		alt: 'Meta',
		text: 'Meta'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd5189af154f1bcc3420_Yelp%20Icon.webp',
		alt: 'Yelp',
		text: 'Yelp'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd51800bda510d005915_Xing%20Icon.webp',
		alt: 'Xing',
		text: 'Xing'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd50fca0ab56c8130f39_Twitch%20Icon.webp',
		alt: 'Twitch',
		text: 'Twitch'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd5096bc5b82059cbe01_Android%20Icon.webp',
		alt: 'Android',
		text: 'Android'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd507261f4d64d555c9e_Behance%20Icon.webp',
		alt: 'Behance',
		text: 'Behance'
	},
	{
		src: 'https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8e9cb3c15d9b62f057c9a/65bdfd505f54112ef377e290_Shopify%20Icon.webp',
		alt: 'Shopify',
		text: 'Shopify'
	}
]

const CarouselItem = React.memo<CarouselItemProps>(({ src, alt, text }) => (
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

const Carousel = ({ items, reverse = false }: CarouselProps) => {
	return (
		<div
			className={`${styles['carousel-holder']} ${reverse ? styles.reverse : ''}`}
			data-testid="carousel-holder"
		>
			<div
				className={`${styles.carousel} ${reverse ? styles.reverse : ''}`}
				data-testid="carousel"
			>
				<div
					className={styles['carousel-group']}
					data-testid="carousel-group"
				>
					{items.map((item, index) => (
						<CarouselItem key={index} {...item} />
					))}
				</div>
			</div>
		</div>
	)
}

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
			<div
				className={styles['container-regular']}
				data-testid="container-regular"
			>
				<div
					className={styles['integration-title']}
					data-testid="integration-title"
				>
					<div className={styles.badge} data-testid="badge">
						<div>Application powered by</div>
					</div>
					<h3 data-testid="integration-title-h3">
						<span
							className={styles['gradient-span']}
							data-testid="gradient-span"
						>
							Cutting edge tech
							<br />
							No-nonsense bloat
						</span>
					</h3>
				</div>
				<div
					className={styles['integration-wrapper']}
					data-testid="integration-wrapper"
				>
					<Carousel items={carouselData.slice(0, 6)} />
					<Carousel items={carouselData.slice(6)} reverse={true} />
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
				>
					<p
						className={styles['paragraph-regular']}
						data-testid="paragraph-regular"
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Morbi vitae nulla lacinia, vulputate mauris eget,
						accumsan justo.
					</p>
				</div>
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
		</div>
	)
}
