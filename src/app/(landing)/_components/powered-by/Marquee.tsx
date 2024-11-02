import React from 'react'

import Marquee from '@/components/ui/marquee'
import { carouselbrands } from './carousel-brands'

interface CarouselItemProps {
	iconSrc: string
	altText: string
	text: string
}

const CarouselItem: React.FC<CarouselItemProps> = ({
	iconSrc,
	altText,
	text
}) => {
	return (
		<div className="bg-opacity-24 trans flex h-[75px] min-w-[120px] flex-none flex-col items-center justify-center rounded-[12px] border border-neutral-800 bg-[#07070924] bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-transparent p-[12px_16px] text-xs leading-[1.7] text-neutral-300 backdrop-blur-md hover:bg-[#090909] hover:text-white">
			<img
				src={iconSrc}
				loading="lazy"
				alt={altText}
				className="mb-1 size-5"
			/>
			<div className="text-[10px] leading-normal">{text}</div>
		</div>
	)
}

export default function MarqueeDemo({
	reverse = false
}: {
	reverse?: boolean
}) {
	return (
		<div className="relative flex overflow-x-hidden">
			<div className="animate-marquee bg-black/24 whitespace-nowrap">
				<div className="shadow-wrapper w-full overflow-hidden">
					<span className="shadow-left" />
					<span className="shadow-right" />{' '}
					<Marquee
						pauseOnHover
						className="[--duration:40s]"
						reverse={reverse}
					>
						{carouselbrands.map((item, index) => (
							<CarouselItem altText={''} key={index} {...item} />
						))}
					</Marquee>
				</div>
			</div>
		</div>
	)
}
