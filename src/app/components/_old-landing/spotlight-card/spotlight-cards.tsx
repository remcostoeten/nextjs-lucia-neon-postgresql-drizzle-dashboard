'use client'

import Ripple from '@/components/effects/ripple'
import { ForwardIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import Card01 from '/public/card-01.png'

export default function HomeSpotlightCard() {
	const [isHovered, setIsHovered] = useState(false)

	const theme = {
		bgMain: 'bg-slate-900',
		bgCard: 'bg-slate-800',
		textPrimary: 'text-slate-200',
		textSecondary: 'text-slate-400',
		buttonBg: 'bg-slate-700',
		buttonText: 'text-slate-200',
		buttonHover: 'hover:bg-slate-600',
		borderColor: 'border-slate-700',
		blurColor: 'bg-slate-700'
	}

	const rippleProps = {
		enabled: true,
		mainCircleSize: 152,
		mainCircleOpacity: 0.24,
		numCircles: 8
	}

	return (
		<div
			className={`relative z-20 h-full overflow-hidden rounded-lg ${theme.bgCard} p-6 pb-8 w-80`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				className="pointer-events-none absolute bottom-0 left-1/2 -z-10 aspect-square w-1/2 -translate-x-1/2 translate-y-1/2"
				aria-hidden="true"
			>
				<div
					className={`translate-z-0 absolute inset-0 rounded-full ${theme.blurColor} blur-[80px]`}
				></div>
			</div>

			{rippleProps.enabled && (
				<Ripple
					mainCircleSize={rippleProps.mainCircleSize}
					mainCircleOpacity={rippleProps.mainCircleOpacity}
					numCircles={rippleProps.numCircles}
					className={`-translate-y-[105px] transition-opacity ease-in-out duration-500 ${
						isHovered ? 'opacity-70' : 'opacity-30'
					} -z-10`}
				/>
			)}

			<div className="flex h-full flex-col items-center text-center">
				<div className="relative inline-flex">
					<Image
						className="inline-flex"
						src={Card01}
						width={200}
						height={200}
						alt="Amazing Integration"
					/>
				</div>
				<div className="mb-5 grow">
					<h2
						className={`mb-1 text-xl font-bold ${theme.textPrimary}`}
					>
						Amazing Integration
					</h2>
					<p className={`text-sm ${theme.textSecondary}`}>
						Quickly apply filters to refine your issues lists and
						create custom views.
					</p>
				</div>
				<a
					className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg border ${theme.borderColor} ${theme.buttonBg} ${theme.buttonText} px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${theme.buttonHover} focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600`}
					href="#0"
				>
					<ForwardIcon />
					<span>Connect</span>
				</a>
			</div>
		</div>
	)
}
