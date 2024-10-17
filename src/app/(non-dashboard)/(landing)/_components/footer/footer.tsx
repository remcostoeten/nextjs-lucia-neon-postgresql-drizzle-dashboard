'use client'

import { siteConfig } from '@/config/site-config'
import React from 'react'
import HorizontalLine from '../horizontal-line'
import RainbowLine from '../rainbow-line'
import styles from './footer.module.scss'

type FooterLink = {
	text: string
	href: string
	isNew?: boolean
	isBeta?: boolean
	external?: boolean
}

type FooterColumnProps = {
	title: string
	links: FooterLink[]
}

type FooterContactLinkProps = {
	href: string
	icon: React.ReactNode
	text: string
	target?: string
	external?: boolean
}
const FooterContactLink: React.FC<FooterContactLinkProps> = React.memo(
	({ href, icon, target, text, external }) => (
		<a
			href={href}
			target={external ? '_blank' : undefined}
			className={`${styles['footer-contact-link']} ${styles['w-inline-block']}`}
		>
			<div className={`${styles['icon-small']} ${styles['w-embed']}`}>
				{icon}
			</div>
			<div className={styles['paragraph-small']}>{text}</div>
		</a>
	)
)

const FooterColumn: React.FC<FooterColumnProps> = React.memo(
	({ title, links }) => (
		<div className={styles['footer-column']}>
			<div
				className={`${styles['label-regular']} ${styles['text-color-white']}`}
			>
				{title}
			</div>
			<div className={styles['wrap-v-regular']}>
				{links.map((link, index) => (
					<a
						onClick={e => handleClick(e, link.isBeta)}
						key={`${link.text}-${index}`}
						href={link.href}
						className={`${styles['footer-link']} ${styles['w-inline-block']}`}
					>
						<div>{link.text}</div>
						{link.isNew && (
							<div
								className={`${styles['wrap-h-xsmall']} ${styles['align-c']}`}
							>
								<div
									className={`${styles['icon-x-small']} ${styles['w-embed']}`}
								>
									<NewIcon />
								</div>
								<div className={styles['text-color-white']}>
									New
								</div>
							</div>
						)}
						{link.isBeta && (
							<div
								className={`${styles['wrap-h-xsmall']} ${styles['align-c']}`}
							>
								<div
									className={`${styles['icon-x-small']} ${styles['w-embed']}`}
								>
									<NewIcon />
								</div>
								<div className={styles['text-color-white']}>
									Beta
								</div>
							</div>
						)}
					</a>
				))}
			</div>
		</div>
	)
)

export default function Footer() {
	return (
		<footer className="relative z-2 pb-px px-[3%]">
			<div className={styles['footer-container-lines']}>
				<HorizontalLine />
				<div className="w-full mx-auto relative">
					<div
						className={`${styles['w-layout-grid']} ${styles['footer-grid']} px-xl py-large`}
					>
						<div className="flex flex-col justify-between w-full max-w-[680px] gap-10 lg:max-w-full">
							<div className="flex flex-col items-start gap-4">
								<RainbowLine small className="footer-rainbow" />

								<div className="mb-0 text-sm font-medium leading-[1.7] text-neutral-300">
									Notevault
								</div>
								<div className="flex flex-wrap items-center gap-14">
									<FooterContactLink
										href="https://g.co/kgs/mhi1a1x"
										target="_blank"
										icon={<LocationIcon />}
										text="Frysian, the Netherlands"
									/>
									<FooterContactLink
										href={`https://github.com/${siteConfig.username}`}
										icon={<GithubIcon />}
										text={`@${siteConfig.username}`}
									/>
								</div>
							</div>
							<div className={styles['footer-links']}>
								<FooterColumn
									title="Previous apps"
									links={[
										{
											text: 'Old landing page',
											href: '/old-landing'
										},
										{
											text: 'All-in-one dashboard',
											href: 'https://productivity.remcostoeten.com',
											external: true
										},
										{
											text: 'Productivity panel ',
											href: 'https://panel.remcostoeten.com',
											external: true
										},
										{
											external: true,
											text: 'Chanelog',
											href: '/changelog',
											isBeta: true
										}
									]}
								/>
								<FooterColumn
									title="Links"
									links={[
										{
											text: 'Dashboard',
											href: '/dashboard',
											isBeta: true
										},
										{
											text: 'Blogs',
											href: '#',
											isBeta: true
										},
										{
											text: 'LinkedIn',
											href: `${siteConfig.links.linkedin}`,
											external: true
										},
										{
											text: 'Github',
											href: 'https://github.com/remcostoeten/nextjs-lucia-neon-postgresql-drizzle-dashboard',
											external: true
										}
									]}
								/>
							</div>
						</div>
						<div
							id="w-node-_38617db4-e05b-3e02-29bd-bfc4fc1f8d9c-fc1f8d5d"
							className={styles['footer-side']}
						>
							<div
								className={`${styles['wrap-v-regular']} ${styles['align-v-l']}`}
							>
								<div className={styles.badge}>
									<div>
										Built with
										<span className="text-red-40 pulse mx-2 hover:text-red-500">
											❤️
										</span>
										by Remco
									</div>
								</div>
								<div className={styles['wrap-v-x-small']}>
									<div className={styles['h4-heading']}>
										<span className="gradient-span">
											Start your 365-day free trial
										</span>
									</div>
									<p className="text-xxs text-subtitle">
										Exactly, no costs. No credit card
										required. Remco seems like a nice dude
									</p>
								</div>
							</div>
							<div className={styles['lines-group']}>
								<div
									className={styles['line-vertical-left']}
								></div>
								<div
									className={styles['line-vertical-right']}
								></div>
								<div
									className={`${styles['line-dot']} ${styles['bottom-left']}`}
								></div>
								<div
									className={`${styles['line-dot']} ${styles['bottom-right']}`}
								></div>
							</div>
						</div>
						<div className={styles['line-horizontal']}></div>
					</div>
				</div>
			</div>
		</footer>
	)
}

// SVG Icons
const LocationIcon: React.FC = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M7.64304 2.64243C8.94461 1.34204 11.0544 1.34025 12.3568 2.64272C13.6586 3.94463 13.659 6.05591 12.3565 7.35724C11.9196 7.79376 11.3914 8.08398 10.8333 8.22762V14.1665C10.8333 14.6267 10.4602 14.9998 9.99996 14.9998C9.53972 14.9998 9.16663 14.6267 9.16663 14.1665V8.22816C8.60816 8.08473 8.07965 7.79432 7.64246 7.35667C6.34235 6.05519 6.34015 3.94414 7.64304 2.64243Z"
			fill="#6A6A6B"
		/>
		<path foo fill="currentColor" />
	</svg>
)

const GithubIcon: React.FC = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		id="github"
		fill="currentColor"
	>
		<path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path>
	</svg>
)

const NewIcon: React.FC = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="8.00004"
			cy="8.00016"
			r="6.66667"
			fill="white"
			fillOpacity="0.12"
		/>
		<circle cx="8" cy="8" r="2" fill="white" />
	</svg>
)

const ErrorIcon: React.FC = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clipPath="url(#clip0_2097_522)">
			<g filter="url(#filter0_bdddii_2097_522)">
				<path
					d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM7.75 4.5C7.89834 4.5 8.04334 4.54399 8.16668 4.6264C8.29002 4.70881 8.38615 4.82594 8.44291 4.96299C8.49968 5.10003 8.51453 5.25083 8.48559 5.39632C8.45665 5.5418 8.38522 5.67544 8.28033 5.78033C8.17544 5.88522 8.04181 5.95665 7.89632 5.98559C7.75084 6.01453 7.60003 5.99968 7.46299 5.94291C7.32595 5.88614 7.20881 5.79001 7.1264 5.66668C7.04399 5.54334 7 5.39834 7 5.25C7 5.05109 7.07902 4.86032 7.21967 4.71967C7.36032 4.57902 7.55109 4.5 7.75 4.5ZM8.5 11.5C8.23479 11.5 7.98043 11.3946 7.7929 11.2071C7.60536 11.0196 7.5 10.7652 7.5 10.5V8C7.36739 8 7.24022 7.94732 7.14645 7.85355C7.05268 7.75979 7 7.63261 7 7.5C7 7.36739 7.05268 7.24021 7.14645 7.14645C7.24022 7.05268 7.36739 7 7.5 7C7.76522 7 8.01957 7.10536 8.20711 7.29289C8.39465 7.48043 8.5 7.73478 8.5 8V10.5C8.63261 10.5 8.75979 10.5527 8.85356 10.6464C8.94732 10.7402 9 10.8674 9 11C9 11.1326 8.94732 11.2598 8.85356 11.3536C8.75979 11.4473 8.63261 11.5 8.5 11.5Z"
					fill="white"
				/>
			</g>
		</g>
		<defs>
			<filter
				id="filter0_bdddii_2097_522"
				x="-2.5"
				y="-2.5"
				width="21"
				height="21"
				filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB"
			>
				<feFlood floodOpacity="0" result="BackgroundImageFix" />
				<feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
				<feComposite
					in2="SourceAlpha"
					operator="in"
					result="effect1_backgroundBlur_2097_522"
				/>
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="4" />
				<feGaussianBlur stdDeviation="2" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
				/>
				<feBlend
					mode="normal"
					in2="effect1_backgroundBlur_2097_522"
					result="effect2_dropShadow_2097_522"
				/>
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="4" />
				<feGaussianBlur stdDeviation="2" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
				/>
				<feBlend
					mode="normal"
					in2="effect2_dropShadow_2097_522"
					result="effect3_dropShadow_2097_522"
				/>
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="4" />
				<feGaussianBlur stdDeviation="2" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
				/>
				<feBlend
					mode="normal"
					in2="effect3_dropShadow_2097_522"
					result="effect4_dropShadow_2097_522"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect4_dropShadow_2097_522"
					result="shape"
				/>
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="4" />
				<feGaussianBlur stdDeviation="2" />
				<feComposite
					in2="hardAlpha"
					operator="arithmetic"
					k2="-1"
					k3="1"
				/>
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
				/>
				<feBlend
					mode="normal"
					in2="shape"
					result="effect5_innerShadow_2097_522"
				/>
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="-4" />
				<feGaussianBlur stdDeviation="2" />
				<feComposite
					in2="hardAlpha"
					operator="arithmetic"
					k2="-1"
					k3="1"
				/>
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
				/>
				<feBlend
					mode="normal"
					in2="effect5_innerShadow_2097_522"
					result="effect6_innerShadow_2097_522"
				/>
			</filter>
			<clipPath id="clip0_2097_522">
				<rect width="16" height="16" fill="white" />
			</clipPath>
		</defs>
	</svg>
)

const CheckIcon: React.FC = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M14.5306 5.03081L6.5306 13.0308C6.46092 13.1007 6.37813 13.1562 6.28696 13.1941C6.1958 13.2319 6.09806 13.2514 5.99935 13.2514C5.90064 13.2514 5.8029 13.2319 5.71173 13.1941C5.62057 13.1562 5.53778 13.1007 5.4681 13.0308L1.9681 9.53081C1.89833 9.46105 1.84299 9.37823 1.80524 9.28707C1.76748 9.19592 1.74805 9.09823 1.74805 8.99956C1.74805 8.9009 1.76748 8.8032 1.80524 8.71205C1.84299 8.6209 1.89833 8.53808 1.9681 8.46831C2.03786 8.39855 2.12069 8.34321 2.21184 8.30545C2.30299 8.26769 2.40069 8.24826 2.49935 8.24826C2.59801 8.24826 2.69571 8.26769 2.78686 8.30545C2.87801 8.34321 2.96083 8.39855 3.0306 8.46831L5.99997 11.4377L13.4693 3.96956C13.6102 3.82867 13.8013 3.74951 14.0006 3.74951C14.1999 3.74951 14.391 3.82867 14.5318 3.96956C14.6727 4.11046 14.7519 4.30156 14.7519 4.50081C14.7519 4.70007 14.6727 4.89117 14.5318 5.03206L14.5306 5.03081Z"
			fill="white"
		/>
	</svg>
)
