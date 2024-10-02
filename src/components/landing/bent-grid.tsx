'use client'

import { CalendarIcon, FileTextIcon } from '@radix-ui/react-icons'
import { BellIcon, Share2Icon } from 'lucide-react'

import { cn } from 'cn'
import CalendarHeatmap from '../ui/calendar-heatmap'
import { Rainbow, RainbowDates } from '../ui/cals'
import AnimatedBeamMultipleOutputDemo from './animated-beam-multiple-outputs'
import AnimatedListDemo from './animated-list-demo'
import { BentoCard, BentoGrid } from './bento-grid-parent'
import Marquee from './Hero/Maq'

// Constants for styles
const CARD_STYLES = {
	base: 'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
	border: 'border-gray-950/[.1] dark:border-gray-50/[.1]',
	background:
		'bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
	effect: 'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none',
	boxShadow:
		'shadow-md hover:shadow-lg dark:shadow-red-800/30 dark:hover:shadow-red-800/40' // Updated box shadow
}

const FADE_UP_CLASSNAME =
	'lg:motion-safe:opacity-0 lg:motion-safe:animate-fade-up'

const files = [
	{
		name: 'bitcoin.pdf',
		body: 'Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.'
	},
	{
		name: 'finances.xlsx',
		body: 'A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.'
	},
	{
		name: 'logo.svg',
		body: 'Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.'
	},
	{
		name: 'keys.gpg',
		body: 'GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.'
	},
	{
		name: 'seed.txt',
		body: 'A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.'
	}
]

const features = [
	{
		Icon: FileTextIcon,
		name: 'Manage your notes',
		description: 'Securely manage your thoughts and masterplans.',
		href: '#',
		cta: 'Learn more',
		className: 'col-span-3 lg:col-span-1',
		background: (
			<Marquee
				pauseOnHover
				className="absolute inset-0 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
			>
				{files.map((f, idx) => (
					<figure
						key={idx}
						className={cn(
							CARD_STYLES.base,
							CARD_STYLES.border,
							CARD_STYLES.background,
							CARD_STYLES.effect,
							CARD_STYLES.boxShadow
						)}
					>
						<div className="flex flex-row items-center gap-2">
							<div className="flex flex-col">
								<figcaption className="text-sm font-medium dark:text-white ">
									{f.name}
								</figcaption>
							</div>
						</div>
						<blockquote className="mt-2 text-sm text-subtitle">
							{f.body}
						</blockquote>
					</figure>
				))}
			</Marquee>
		)
	},
	{
		Icon: BellIcon,
		name: 'Messaging',
		description:
			'Send and receive messages and get notified when something happens.',
		href: '#',
		cta: 'Learn more',
		className: 'col-span-3 lg:col-span-2',
		background: (
			<AnimatedListDemo className="absolute inset-0 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
		)
	},
	{
		Icon: Share2Icon,
		name: 'Integrations',
		description: 'This is a work in progress.',
		href: '#',
		cta: 'Learn more',
		className: 'col-span-3 lg:col-span-2',
		background: (
			<AnimatedBeamMultipleOutputDemo className="absolute inset-0 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
		)
	},
	{
		Icon: CalendarIcon,
		name: 'Calendar',
		description: 'No more forgetting your appointments.',
		className: 'col-span-3 lg:col-span-1',
		href: '#',
		cta: 'Learn more',
		background: (
			<CalendarHeatmap
				className={cn(
					FADE_UP_CLASSNAME,
					'lg:motion-safe:[animation-delay:4000ms]'
				)}
				numberOfMonths={2}
				variantClassnames={Rainbow}
				datesPerVariant={RainbowDates}
			/>
		)
	}
]

export default function BentoGridIntro() {
	return (
		<BentoGrid className="my-14">
			{features.map((feature, idx) => (
				<BentoCard key={idx} {...feature} />
			))}
		</BentoGrid>
	)
}
