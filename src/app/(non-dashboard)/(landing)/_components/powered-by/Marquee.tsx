import Marquee from '@/components/ui/marquee'
import React from 'react'
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
		<div className="flex flex-col items-center justify-center flex-none min-w-[120px] p-[12px_16px] text-xs leading-[1.7] rounded-[12px] border border-neutral-800 bg-opacity-24 bg-[#07070924] bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-transparent backdrop-blur-[12px] text-neutral-300 h-[75px] hover:bg-[#090909] trans hover:text-white">
			<img
				src={iconSrc}
				loading="lazy"
				alt={altText}
				className="mb-1 w-5 h-5"
			/>
			<div className="text-[10px] leading-[1.5]">{text}</div>
		</div>
	)
}

export default function MarqueeDemo({
	reverse = false
}: {
	reverse?: boolean
}) {
	return (
		<div className="relative w-full py-">
			<div className="w-full overflow-hidden shadow-wrapper">
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
	)
}
