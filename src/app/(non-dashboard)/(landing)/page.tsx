'use client'

import Notice from '@/components/ui/notice'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Content from './_components/content-gradient/gradient-content'
import CTASection from './_components/cta-section/cta-section'
import FAQSection from './_components/faq/faq'
import Feature from './_components/feature/feature'
import Hero from './_components/hero/hero'
import LogoSection from './_components/logo-section/logo-section'
import PoweredBy from './_components/powered-by/powered-by'
import MarqueeItems from './_components/text-marquee/MarqueeItems'
import Video from './_components/video/Video'

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.3 })

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	)
}

export default function LandingPage() {
	return (
		<>
			<FadeInSection>
				<Hero />
			</FadeInSection>
			<FadeInSection>
				<Video />
			</FadeInSection>
			<FadeInSection>
				<LogoSection />
			</FadeInSection>
			<FadeInSection>
				<Feature />
			</FadeInSection>
			<FadeInSection>
				<MarqueeItems />
			</FadeInSection>
			<FadeInSection>
				<Content />
			</FadeInSection>
			<FadeInSection>
				<PoweredBy />
			</FadeInSection>
			<FadeInSection>
				<CTASection />
			</FadeInSection>
			<FadeInSection>
				<FAQSection />
			</FadeInSection>
		</>
	)
}
