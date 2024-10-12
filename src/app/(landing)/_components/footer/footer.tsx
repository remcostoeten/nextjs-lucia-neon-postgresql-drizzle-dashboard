'use client'

import { GitHubIcon } from '@/components/base/Icons'
import { siteConfig } from '@/config/site-config'
import React from 'react'
import { toast } from 'sonner'
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
function handleClick(e: React.MouseEvent, isBeta: boolean) {
	if (isBeta) {
		e.preventDefault()
		toast('Sorry, this feature is currently in beta and not yet available.')
	}
}

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

export default function gitFooter() {
	return (
		<footer className={`${styles.section} ${styles['snipcss-mKnwC']}`}>
			<div className={styles['footer-container-lines']}>
				<div className={styles['container-small']}>
					<div className={styles['footer-line']}></div>
					<div
						className={`${styles['w-layout-grid']} ${styles['footer-grid']} px-xl py-large`}
					>
						<div
							id="w-node-_38617db4-e05b-3e02-29bd-bfc4fc1f8d62-fc1f8d5d"
							className={styles['footer-main']}
						>
							<div
								className={`${styles['wrap-v-regular']} ${styles['align-v-l']}`}
							>
								<div
									className={`${styles['label-regular']} ${styles['text-color-neutral-300']}`}
								>
									Notevault
								</div>
								<div
									className={styles['footer-contact-details']}
								>
									<FooterContactLink
										href="https://g.co/kgs/mhi1a1x"
										target="_blank"
										icon={<LocationIcon />}
										text="Frysian, the Netherlands"
									/>
									<FooterContactLink
										href="https://github.com/remcostoeten"
										icon={<GitHubIcon />}
										text="@remcostoeten"
									/>
								</div>
							</div>
							<div className={styles['footer-links']}>
								<FooterColumn
									title="Previous apps"
									links={[
										{
											text: 'Previous landing page',
											href: '/old-landing',
											external: false
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
											href: '#',
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
											isNew: true
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
										<span className="text-red-40 pulse mx-2">
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
		<path
			d="M6.82475 12.7882C7.27663 12.7009 7.57215 12.2638 7.48482 11.8119C7.39749 11.36 6.96038 11.0645 6.5085 11.1518C5.21532 11.4017 4.06827 11.7954 3.22082 12.3163C2.40838 12.8158 1.66663 13.5682 1.66663 14.5835C1.66663 15.2982 2.04236 15.8882 2.52532 16.3322C3.00757 16.7756 3.6594 17.1366 4.39462 17.4226C5.87036 17.9965 7.85243 18.3335 9.99996 18.3335C12.1475 18.3335 14.1296 17.9965 15.6053 17.4226C16.3405 17.1366 16.9923 16.7756 17.4746 16.3322C17.9576 15.8882 18.3333 15.2982 18.3333 14.5835C18.3333 13.5682 17.5915 12.8158 16.7791 12.3163C15.9316 11.7954 14.7846 11.4017 13.4914 11.1518C13.0395 11.0645 12.6024 11.36 12.5151 11.8119C12.4278 12.2638 12.7233 12.7009 13.1752 12.7882C14.3515 13.0155 15.2878 13.356 15.9063 13.7362C16.5598 14.1379 16.6666 14.4536 16.6666 14.5835C16.6666 14.6742 16.6226 14.8515 16.3465 15.1053C16.0698 15.3598 15.6232 15.6273 15.0012 15.8692C13.7625 16.3509 11.9946 16.6668 9.99996 16.6668C8.00536 16.6668 6.23743 16.3509 4.9987 15.8692C4.37668 15.6273 3.93016 15.3598 3.65337 15.1053C3.37729 14.8515 3.33329 14.6742 3.33329 14.5835C3.33329 14.4536 3.4401 14.1379 4.09362 13.7362C4.71212 13.356 5.6484 13.0155 6.82475 12.7882Z"
			fill="currentColor"
		/>
	</svg>
)

const GithubIcon: React.FC = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M8.33333 15.8332H11.6667M7.5 18.3332H12.5C13.8807 18.3332 15 17.2139 15 15.8332V4.1665C15 2.78579 13.8807 1.6665 12.5 1.6665H7.5C6.11929 1.6665 5 2.78579 5 4.1665V15.8332C5 17.2139 6.11929 18.3332 7.5 18.3332Z"
			stroke="currentColor"
			strokeWidth="1.66667"
			strokeLinecap="round"
		/>
	</svg>
)
const EmailIcon: React.FC = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M3.86502 15.5607L4.24335 14.8182L4.24335 14.8182L3.86502 15.5607ZM2.77248 14.4681L2.02998 14.8465L2.02998 14.8465L2.77248 14.4681ZM17.2275 14.4681L17.97 14.8465V14.8465L17.2275 14.4681ZM16.135 15.5607L15.7567 14.8182L15.7566 14.8182L16.135 15.5607ZM17.2275 5.53153L17.97 5.1532V5.1532L17.2275 5.53153ZM16.135 4.43899L15.7566 5.18149L15.7567 5.18149L16.135 4.43899ZM2.77248 5.53153L3.51499 5.90985V5.90985L2.77248 5.53153ZM3.86502 4.43899L4.24335 5.18149H4.24335L3.86502 4.43899ZM11.5617 9.58378L11.0411 8.93306H11.0411L11.5617 9.58378ZM8.43825 9.58378L7.91767 10.2345L7.91767 10.2345L8.43825 9.58378ZM16.6667 8.1665V11.8332H18.3333V8.1665H16.6667ZM13.5 14.9998H6.5V16.6665H13.5V14.9998ZM3.33333 11.8332V8.1665H1.66667V11.8332H3.33333ZM6.5 4.99984H13.5V3.33317H6.5V4.99984ZM6.5 14.9998C5.78618 14.9998 5.30094 14.9992 4.92586 14.9685C4.56052 14.9387 4.37368 14.8846 4.24335 14.8182L3.4867 16.3032C3.89114 16.5093 4.32173 16.5914 4.79014 16.6297C5.24883 16.6671 5.81368 16.6665 6.5 16.66665 6.5 16.6665V14.9998ZM1.66667 11.8332C1.66667 12.5195 1.66602 13.0843 1.70349 13.543C1.74177 14.0114 1.8239 14.442 2.02998 14.8465L3.51499 14.0898C3.44858 13.9595 3.39448 13.7726 3.36463 13.4073C3.33398 13.0322 3.33333 12.547 3.33333 11.8332H1.66667ZM4.24335 14.8182C3.92975 14.6584 3.67478 14.4034 3.51499 14.0898L2.02998 14.8465C2.34956 15.4737 2.85949 15.9836 3.4867 16.3032L4.24335 14.8182ZM16.6667 11.8332C16.6667 12.547 16.666 13.0322 16.6354 13.4073C16.6055 13.7726 16.5514 13.9595 16.485 14.0898L17.97 14.8465C18.1761 14.442 18.2582 14.0114 18.2965 13.543C18.334 13.0843 18.3333 12.5195 18.3333 11.8332H16.6667ZM13.5 16.6665C14.1863 16.6665 14.7512 16.6671 15.2099 16.6297C15.6783 16.5914 16.1089 16.5093 16.5133 16.3032L15.7566 14.8182C15.6263 14.8846 15.4395 14.9387 15.0741 14.9685C14.6991 14.9992 14.2138 14.9998 13.5 14.9998V16.6665ZM16.485 14.0898C16.3252 14.4034 16.0703 14.6584 15.7567 14.8182L16.5133 16.3032C17.1405 15.9836 17.6504 15.4737 17.97 14.8465L16.485 14.0898ZM18.3333 8.1665C18.3333 7.48019 18.334 6.91533 18.2965 6.45665C18.2582 5.98823 18.1761 5.55765 17.97 5.1532L16.485 5.90985C16.5514 6.04019 16.6055 6.22702 16.6354 6.59237C16.666 6.96744 16.6667 7.45269 16.6667 8.1665H18.3333ZM13.5 4.99984C14.2138 4.99984 14.6991 5.00049 15.0741 5.03113C15.4395 5.06098 15.6263 5.11509 15.7566 5.18149L16.5133 3.69648C16.1089 3.49041 15.6783 3.40827 15.2099 3.37C14.7512 3.33252 14.1863 3.33317 13.5 3.33317V4.99984ZM17.97 5.1532C17.6504 4.526 17.1405 4.01606 16.5133 3.69648L15.7567 5.18149C16.0703 5.34128 16.3252 5.59625 16.485 5.90985L17.97 5.1532ZM3.33333 8.1665C3.33333 7.45269 3.33398 6.96744 3.36463 6.59237C3.39448 6.22702 3.44858 6.04019 3.51499 5.90985L2.02998 5.1532C1.8239 5.55765 1.74177 5.98823 1.70349 6.45665C1.66602 6.91533 1.66667 7.48019 1.66667 8.1665H3.33333ZM6.5 3.33317C5.81369 3.33317 5.24883 3.33252 4.79014 3.37C4.32173 3.40827 3.89114 3.49041 3.4867 3.69648L4.24335 5.18149C4.37368 5.11509 4.56052 5.06098 4.92586 5.03113C5.30094 5.00049 5.78618 4.99984 6.5 4.99984V3.33317ZM3.51499 5.90985C3.67478 5.59625 3.92975 5.34128 4.24335 5.18149L3.4867 3.69648C2.85949 4.01606 2.34956 4.526 2.02998 5.1532L3.51499 5.90985ZM16.5627 4.51578L11.0411 8.93306L12.0823 10.2345L17.6039 5.81723L16.5627 4.51578ZM8.95883 8.93306L3.43723 4.51578L2.39607 5.81723L7.91767 10.2345L8.95883 8.93306ZM11.0411 8.93306C10.4324 9.42001 9.56753 9.42001 8.95883 8.93306L7.91767 10.2345C9.13507 11.2084 10.8649 11.2084 12.0823 10.2345L11.0411 8.93306Z"
			fill="currentColor"
		/>
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
