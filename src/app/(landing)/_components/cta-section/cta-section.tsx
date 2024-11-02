'use client'

import React from 'react'
import { Check } from 'lucide-react'

import useMouseHoverEffect from '@/core/hooks/use-mouse-hover'
import HorizontalLine from '../horizontal-line'

type CTAFeatureProps = {
	icon: string
	title: string
	description: string
	isFirst?: boolean
	isLast?: boolean
}
function CTASection() {
	return (
		<div className="container-lines-large relative z-[5] mx-auto my-0 w-full max-w-[1128px] px-12 py-[120px]">
			<div className="container-regular relative mx-auto w-full max-w-[984px]">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<CTAFeature
						icon="/landing/usps/1.webp"
						title="Boost Productivity"
						description="Lorem ipsum dolor sit amet elit consectetur adipiscing vestibulum."
						isFirst
					/>
					<CTAFeature
						icon="/landing/usps/2.webp"
						title="Unlock Possibilities"
						description="Lorem ipsum dolor sit amet elit consectetur adipiscing vestibulum."
					/>
					<CTAFeature
						icon="/landing/usps/3.webp"
						title="Craft Smarter Content"
						description="Lorem ipsum dolor sit amet elit consectetur adipiscing vestibulum."
						isLast
					/>
				</div>
				<CTABlock />
			</div>
			<HorizontalLine />
			<LinesGroup />
		</div>
	)
}

function CTAFeature({
	icon,
	title,
	description,
	isFirst,
	isLast
}: CTAFeatureProps) {
	const featureRef = useMouseHoverEffect()
	const featureClass = `cta-feature flex flex-col gap-2 border border-neutral-800 bg-base-background p-4 pb-6 relative
    ${
		isFirst ? 'rounded-tl-[24px]'
		: isLast ? 'rounded-tr-[24px]'
		: 'rounded-[12px]'
	}
    hover-effect`

	return (
		<div className={featureClass} ref={featureRef}>
			<div className="z-10 flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<img src={icon} alt="" className="size-8" />
					<div className="text-base font-medium leading-5">
						<span className="gradient-span">{title}</span>
					</div>
				</div>
				<p className="text-xxs text-subtitle">{description}</p>
			</div>
			<div className="cta-feature-line"></div>
		</div>
	)
}

function CTABlock() {
	const mouseHover = useMouseHoverEffect()
	return (
		<div
			className="cta-block bg-base-background from-white-4 hover-effect mt-4 flex items-center justify-between gap-12 rounded-b-[24px] rounded-t-[12px] border border-neutral-800 bg-gradient-to-b to-transparent px-1.5 py-1"
			ref={mouseHover}
		>
			<div className="cta-content flex w-full max-w-[550px] flex-col gap-8 py-11 pl-11">
				<h4 className="text-base-white text-[36px] font-medium leading-tight tracking-[-0.17px]">
					<span className="gradient-span">
						365-day free trial!
						<br />
						Get ready to kick off your
					</span>
				</h4>
				<div className="flex items-center gap-3">
					<a href="/dashboard" className="button-primary">
						Get Started
					</a>
					<div>
						<div className="text-base-white text-xs  font-medium">
							5/5 <span className="animate-pulse">✨</span>
						</div>
						<span className="gradient-span">
							From a single review!
						</span>{' '}
					</div>
				</div>
			</div>
			<CTASide />
		</div>
	)
}

const CTASide: React.FC = () => {
	return (
		<div className="cta-side relative w-full max-w-[380px] overflow-hidden rounded-[8px] p-11 pl-1">
			<div className="flex flex-col gap-4">
				<div className="text-xs ">Notevault CTA: Collections</div>
				<CTABadgeWrap />
			</div>
			<div className="cta-overlay"></div>
			<div className="linear-border cta-border">
				<div className="linear-code"></div>
			</div>
		</div>
	)
}

const CTABadgeWrap: React.FC = () => {
	return (
		<div className="mr-[-2px] flex flex-col gap-3">
			<CTABadge text="Free 365-day trial" />
			<CTABadge text="No credit card required" />
			<CTABadge text="Cancel anytime" />
		</div>
	)
}

const CTABadge: React.FC<{ text: string }> = ({ text }) => {
	return (
		<div className="flex gap-3">
			<div className="cta-badge border-white-6 bg-white-2 shadow-inset text-base-white flex items-center gap-1.5 rounded-[6px] border-[0.8px] p-2 pl-2.5 text-xs leading-[1.4]">
				<div className="flex size-4 items-center justify-center">
					<Check />
				</div>
				<div>{text}</div>
			</div>
			<div className="cta-badge empty mr-[-8px] flex-1 rounded-r-none border-r-0"></div>
		</div>
	)
}

const LinesGroup: React.FC = () => {
	return (
		<div className="lines-group pointer-events-none absolute inset-0 z-[2]">
			<div className="line-vertical-left absolute bottom-0 left-0 top-[4.5px] z-[1] w-px bg-neutral-800"></div>
			<div className="line-vertical-right absolute bottom-0 right-0 top-[4.5px] z-[1] w-px bg-neutral-800"></div>
			<div className="line-dot bottom-left absolute bottom-[-4.5px] left-[-4.5px] z-[5] size-2.5 rounded-[2px] border border-neutral-800 bg-[#0d0d11]"></div>
			<div className="line-dot bottom-right absolute bottom-[-4.5px] right-[-4.5px] z-[5] size-2.5 rounded-[2px] border border-neutral-800 bg-[#0d0d11]"></div>
		</div>
	)
}

export default CTASection
