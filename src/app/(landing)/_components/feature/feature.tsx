import React from 'react'
import styles from './FeatureComponent.module.scss'

export default function Feature() {
	return (
		<div
			className={`${styles['feature-container-lines']} ${styles['snipcss0-1-1-2']} ${styles['st-current']} ${styles['snipcss-BJi2E']} ${styles['st-hover']}`}
		>
			<div className={styles['container-regular']}>
				<div
					className={`${styles['title-large']} ${styles['style-rLdKi']}`}
					id="style-rLdKi"
				>
					<h2>
						<span
							className={`${styles['gradient-span']} ${styles['st-current']} ${styles['snipcss-odEcg']} ${styles['st-hover']}`}
						>
							Utilize various tools to enhance your productivity
						</span>
					</h2>
					<div className={styles['max-width-x-small']}>
						<p className={styles['paragraph-regular']}>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Morbi vitae nulla lacinia, vulputate mauris
							eget, accumsan justo.
						</p>
					</div>
				</div>
				<div
					className={`${styles['w-layout-grid']} ${styles['grid-two-column']}`}
				>
					<FeatureCard
						id="w-node-_9cae3f6c-7014-a431-41d0-b254058e175f-2f057c92"
						icon="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65ba147e893caa2c9bff1605_Feature%20Icon%2001.webp"
						title="Integrate API driven AI"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae nulla lacinia, vulputate mauris eget."
						badges={[
							{ icon: '✨', text: 'Personable' },
							{ icon: '🫠', text: 'Empathetic' },
							{ icon: '🎯', text: 'Direct' },
							{ icon: '😇', text: 'Friendly' }
						]}
						buttons={['Ui filling', 'Ui filling']}
					/>
					<FeatureCard
						id="w-node-c9d3d20d-14d0-482d-e466-4732036d13c2-2f057c92"
						icon="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65ba147ed99fff370aa907ee_Feature%20Icon%2002.webp"
						title="Finance insight"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae nulla lacinia, vulputate mauris eget."
						showFinanceInsight={true}
					/>
				</div>
			</div>
			<div className={styles['lines-group']}>
				<div className={styles['line-vertical-left']}></div>
				<div className={styles['line-vertical-right']}></div>
			</div>
		</div>
	)
}

const FeatureCard: React.FC<{
	id: string
	icon: string
	title: string
	description: string
	badges?: { icon: string; text: string }[]
	buttons?: string[]
	showFinanceInsight?: boolean
}> = ({
	id,
	icon,
	title,
	description,
	badges,
	buttons,
	showFinanceInsight
}) => (
	<div
		id={id}
		className={`${styles['feature-card']} ${styles['style-amqbr']}`}
	>
		<div className={styles['feature-line']}></div>
		<div className={styles['feature-heading']}>
			<div className={styles['icon-wrap']}>
				<img
					src={icon}
					loading="lazy"
					width="22"
					alt=""
					className={styles['feature-icon']}
				/>
				<img
					src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65ba147efb6d9006e1aed951_Icon%20Blur.svg"
					loading="lazy"
					alt=""
					className={styles['icon-blur']}
				/>
			</div>
			<div className={styles['wrap-v-x-small']}>
				<div className={styles['h6-heading']}>{title}</div>
				<p className={styles['paragraph-regular']}>{description}</p>
			</div>
		</div>
		<div className={styles['feature-inner']}>
			{badges && (
				<div className={styles['wrap-v-x-small']}>
					<div
						className={`${styles['paragraph-small']} ${styles['text-color-neutral-300']}`}
					>
						Formality
					</div>
					<div
						className={`${styles['wrap-h-xsmall']} ${styles['wrap-child']}`}
					>
						{badges.map((badge, index) => (
							<FeatureBadge
								key={index}
								icon={badge.icon}
								text={badge.text}
							/>
						))}
					</div>
				</div>
			)}
			<HorizontalDivider />
			{buttons && (
				<div className={styles['feature-card-buton-wrap']}>
					{buttons.map((button, index) => (
						<FeatureButton key={index} text={button} />
					))}
				</div>
			)}
			{showFinanceInsight && (
				<>
					<div className={styles['wrap-v-large']}>
						<FinanceInsightButton />
						<LogoGroup />
					</div>
					<HorizontalDivider />
					<div className={styles['feature-caption']}>
						<div
							className={`${styles['wrap-h-xsmall']} ${styles['align-c']}`}
						>
							<div
								className={`${styles['icon-x-small']} ${styles['w-embed']}`}
							>
								<InfoIcon />
							</div>
							<div className={styles['paragraph-small']}>
								Get a grip on your wallet
							</div>
						</div>
						<a
							href="/dashboard"
							className={`${styles['button-primary-small']} ${styles['w-button']}`}
						>
							Get Started
						</a>
					</div>
				</>
			)}
		</div>
	</div>
)

const FeatureBadge: React.FC<{ icon: string; text: string }> = ({
	icon,
	text
}) => (
	<div className={styles['feature-badge']}>
		<div className={styles['icon-x-small']}>{icon}</div>
		<div>{text}</div>
	</div>
)

const FeatureButton: React.FC<{ text: string }> = ({ text }) => (
	<div className={styles['feature-button-small']}>
		<div>{text}</div>
		<div className={`${styles['icon-x-small']} ${styles['w-embed']}`}>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6.76528 3.98472L10.5153 7.73472C10.5501 7.76955 10.5778 7.81091 10.5967 7.85643C10.6155 7.90196 10.6253 7.95075 10.6253 8.00004C10.6253 8.04932 10.6155 8.09811 10.5967 8.14364C10.5778 8.18916 10.5501 8.23052 10.5153 8.26535L6.76528 12.0153C6.69491 12.0857 6.59948 12.1252 6.49996 12.1252C6.40045 12.1252 6.30502 12.0857 6.23465 12.0153C6.16429 11.945 6.12476 11.8495 6.12476 11.75C6.12476 11.6505 6.16429 11.5551 6.23465 11.4847L9.71981 8.00004L6.23465 4.51535C6.19981 4.48051 6.17217 4.43914 6.15332 4.39362C6.13446 4.3481 6.12476 4.29931 6.12476 4.25004C6.12476 4.20076 6.13446 4.15197 6.15332 4.10645C6.17217 4.06093 6.19981 4.01956 6.23465 3.98472C6.26949 3.94988 6.31086 3.92224 6.35638 3.90339C6.4019 3.88453 6.45069 3.87483 6.49996 3.87483C6.54924 3.87483 6.59803 3.88453 6.64355 3.90339C6.68907 3.92224 6.73044 3.94988 6.76528 3.98472Z"
					fill="currentColor"
				/>
			</svg>
		</div>
	</div>
)

const HorizontalDivider: React.FC = () => (
	<div
		className={`${styles['horizontal-divider-dash']} ${styles['feature']} ${styles['w-embed']}`}
	>
		<svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern
					id="dashLine"
					width="345"
					height="2"
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M0 1L344.5 1"
						stroke="#252527"
						strokeOpacity="1"
						strokeWidth="1"
						strokeDasharray="4 4"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#dashLine)" />
		</svg>
	</div>
)

const FinanceInsightButton: React.FC = () => (
	<div className={styles['feature-button']}>
		<div className={`${styles['wrap-h-xsmall']} ${styles['align-c']}`}>
			<div className={`${styles['icon-small']} ${styles['w-embed']}`}>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7.33366 5.47924C7.33367 4.91266 7.54206 4.36356 7.9234 3.92535C8.30474 3.48713 8.83549 3.18685 9.42537 3.07557L14.8888 2.0474C15.2662 1.97646 15.6556 1.98524 16.0289 2.07313C16.4023 2.16101 16.7503 2.3258 17.0479 2.55562C17.3455 2.78544 17.5852 3.07457 17.7499 3.40218C17.9145 3.72978 17.9999 4.0877 18 4.45015V4.47955C17.999 5.04528 17.7901 5.59326 17.4088 6.03041C17.0276 6.46756 16.4974 6.76694 15.9083 6.87771L12.6663 7.48873V9.49731C12.6663 10.0639 12.4579 10.613 12.0766 11.0512C11.6953 11.4894 11.1645 11.7897 10.5746 11.901L4.09171 13.1221C3.50182 13.233 2.971 13.5331 2.58961 13.9712C2.20823 14.4093 1.99986 14.9583 2 15.5249V15.5497C2.00003 15.9122 2.08547 16.2702 2.25017 16.5979C2.41486 16.9256 2.65471 17.2148 2.95241 17.4446C3.25011 17.6745 3.59825 17.8392 3.97173 17.927C4.34521 18.0148 4.73473 18.0235 5.1122 17.9524L5.24098 17.9285C5.83104 17.8174 6.362 17.5172 6.74354 17.079C7.12507 16.6408 7.3336 16.0916 7.33366 15.5249V5.47924Z"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeMiterlimit="10"
					/>
				</svg>
			</div>
			<div>Ui filling</div>
		</div>
		<div className={`${styles['icon-x-small']} ${styles['w-embed']}`}>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14.4999 7.99323C14.5004 8.1714 14.4532 8.34645 14.3633 8.50029C14.2735 8.65412 14.1441 8.78115 13.9887 8.86823L3.49429 14.8689C3.34351 14.9544 3.17325 14.9996 2.99992 15.0001C2.84007 14.9998 2.68263 14.9611 2.5408 14.8874C2.39896 14.8137 2.27687 14.7071 2.18474 14.5764C2.09262 14.4458 2.03315 14.295 2.01132 14.1367C1.98949 13.9783 2.00594 13.817 2.05929 13.6664L3.76867 8.66948C3.78551 8.62004 3.81741 8.57712 3.8599 8.54674C3.90238 8.51637 3.95331 8.50006 4.00554 8.5001H8.49992C8.56846 8.50026 8.6363 8.48631 8.69923 8.45914C8.76216 8.43196 8.81883 8.39214 8.86572 8.34215C8.91261 8.29215 8.94872 8.23305 8.9718 8.16851C8.99489 8.10397 9.00446 8.03537 8.99992 7.96698C8.98858 7.83841 8.92909 7.71886 8.83336 7.63229C8.73763 7.54572 8.61273 7.4985 8.48367 7.5001H4.00992C3.95777 7.5002 3.90689 7.48398 3.86442 7.45372C3.82194 7.42346 3.78999 7.38068 3.77304 7.
33136L2.05804 2.33136C1.99126 2.13976 1.98433 1.93239 2.03819 1.73676C2.09205 1.54114 2.20413 1.36653 2import loading from '@/app/loading';
import path from 'path';
import { title } from 'process';
import { FC } from 'react';
import { text } from 'stream/consumers';
import { width, height, fill, stroke, strokeWidth } from 'tailwindcss/defaultTheme';
import { map } from 'zod';
.35957 1.23612C2.51501 1.1057 2.70644 1.02566 2.90845 1.00661C3.11045 0.987567 3.31347 1.03042 3.49054 1.12948L13.9905 7.1226C14.145 7.20956 14.2735 7.33601 14.363 7.48899C14.4525 7.64197 14.4998 7.81599 14.4999 7.99323Z"
					fill="currentColor"
				/>
			</svg>
		</div>
	</div>
)

const LogoGroup: React.FC = () => (
	<div className={styles['logo-group']}>
		<img
			src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb604e608e9c9bea553_Logo%2004.webp"
			loading="lazy"
			width="32"
			alt=""
			className={styles.logo}
		/>
		<img
			src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb65f79476f2d80d5b5_Logo%2007.webp"
			loading="lazy"
			width="32"
			alt=""
			className={styles.logo}
		/>
		<img
			src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb6fa0980238f56800e_Logo%2002.webp"
			loading="lazy"
			width="32"
			alt=""
			className={styles.logo}
		/>
		<img
			src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb6c2934f49cce3e541_Logo%2005.webp"
			loading="lazy"
			width="32"
			alt=""
			className={styles.logo}
		/>
		<img
			src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb7478024bd67ee81d9_Logo%2001.webp"
			loading="lazy"
			width="32"
			alt=""
			className={styles.logo}
		/>
		<img
			src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb774d33600cce11313_Logo%2006.webp"
			loading="lazy"
			width="32"
			alt=""
			className={styles.logo}
		/>
		<img
			src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb85f1d9774b9242163_Logo%2003.webp"
			loading="lazy"
			width="32.5"
			alt=""
			className={styles.logo}
		/>
	</div>
)

const InfoIcon: React.FC = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM7.75 4.5C7.89834 4.5 8.04334 4.54399 8.16668 4.6264C8.29002 4.70881 8.38615 4.82594 8.44291 4.96299C8.49968 5.10003 8.51453 5.25083 8.48559 5.39632C8.45665 5.5418 8.38522 5.67544 8.28033 5.78033C8.17544 5.88522 8.04181 5.95665 7.89632 5.98559C7.75083 6.01453 7.60003 5.99968 7.46299 5.94291C7.32595 5.88614 7.20881 5.79001 7.1264 5.66668C7.04399 5.54334 7 5.39834 7 5.25C7 5.05109 7.07902 4.86032 7.21967 4.71967C7.36032 4.57902 7.55109 4.5 7.75 4.5ZM8.5 11.5C8.23479 11.5 7.98043 11.3946 7.7929 11.2071C7.60536 11.0196 7.5 10.7652 7.5 10.5V8C7.36739 8 7.24022 7.94732 7.14645 7.85355C7.05268 7.75979 7 7.63261 7 7.5C7 7.36739 7.05268 7.24021 7.14645 7.14645C7.24022 7.05268 7.36739 7 7.5 7C7.76522 7 8.01957 7.10536 8.20711 7.29289C8.39465 7.48043 8.5 7.73478 8.5 8V10.5C8.63261 10.5 8.75979 10.5527 8.85356 10.6464C8.94732 10.7402 9 10.8674 9 11C9 11.1326 8.94732 11.2598 8.85356 11.3536C8.75979 11.4473 8.63261 11.5 8.5 11.5Z"
			fill="currentColor"
		/>
	</svg>
)
