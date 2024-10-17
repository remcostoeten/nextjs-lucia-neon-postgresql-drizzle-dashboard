'use client'

import useMouseHoverEffect from '@/core/hooks/use-mouse-hover'
import { Check } from 'lucide-react'
import React from 'react'

const CTASection: React.FC = () => {
	return (
		<div className="container-lines-large z-[5] w-full max-w-[1128px] mx-auto my-0 py-[120px] px-12 relative">
			<div className="container-regular w-full max-w-[984px] mx-auto relative">
				<div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
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
			<LinesGroup />
		</div>
	)
}

interface CTAFeatureProps {
	icon: string
	title: string
	description: string
	isFirst?: boolean
	isLast?: boolean
}

const CTAFeature: React.FC<CTAFeatureProps> = ({
	icon,
	title,
	description,
	isFirst,
	isLast
}) => {
	const featureRef = useMouseHoverEffect()
	const featureClass = `cta-feature flex flex-col gap-2 border border-neutral-800 bg-base-background p-4 pb-6 relative
    ${isFirst ? 'rounded-tl-[24px]' : isLast ? 'rounded-tr-[24px]' : 'rounded-[12px]'}
    hover-effect`

	return (
		<div className={featureClass} ref={featureRef}>
			<div className="flex flex-col gap-2 z-10">
				<div className="flex items-center gap-2">
					<img src={icon} alt="" className="w-8 h-8" />
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

const CTABlock: React.FC = () => {
	return (
		<div className="cta-block flex justify-between items-center gap-12 border border-neutral-800 rounded-t-[12px] rounded-b-[24px] bg-base-background bg-gradient-to-b from-white-4 to-transparent mt-4 py-1 px-1.5 pr-1.5">
			<div className="cta-content flex flex-col gap-8 w-full max-w-[550px] py-11 pl-11">
				<h4 className="text-[36px] font-medium leading-[1.25] tracking-[-0.17px] text-base-white">
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
						<div className="text-xs font-medium  text-base-white">
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
		<div className="cta-side rounded-[8px] w-full max-w-[380px] p-11 pl-1 relative overflow-hidden">
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
		<div className="flex flex-col gap-3 mr-[-2px]">
			<CTABadge text="Free 365-day trial" />
			<CTABadge text="No credit card required" />
			<CTABadge text="Cancel anytime" />
		</div>
	)
}

const CTABadge: React.FC<{ text: string }> = ({ text }) => {
	return (
		<div className="flex gap-3">
			<div className="cta-badge flex items-center gap-1.5 border-[0.8px] border-white-6 rounded-[6px] bg-white-2 shadow-inset p-2 pl-2.5 text-xs leading-[1.4] text-base-white">
				<div className="flex justify-center items-center w-4 h-4">
					<Check />
				</div>
				<div>{text}</div>
			</div>
			<div className="cta-badge empty flex-1 mr-[-8px] border-r-0 rounded-r-none"></div>
		</div>
	)
}

const LinesGroup: React.FC = () => {
	return (
		<div className="lines-group absolute inset-0 z-[2] pointer-events-none">
			<div className="line-vertical-left absolute top-[4.5px] bottom-0 left-0 w-px bg-neutral-800 z-[1]"></div>
			<div className="line-vertical-right absolute top-[4.5px] bottom-0 right-0 w-px bg-neutral-800 z-[1]"></div>
			<div className="line-dot bottom-left absolute bottom-[-4.5px] left-[-4.5px] w-2.5 h-2.5 border border-neutral-800 bg-[#0d0d11] rounded-[2px] z-[5]"></div>
			<div className="line-dot bottom-right absolute bottom-[-4.5px] right-[-4.5px] w-2.5 h-2.5 border border-neutral-800 bg-[#0d0d11] rounded-[2px] z-[5]"></div>
		</div>
	)
}

export default CTASection
