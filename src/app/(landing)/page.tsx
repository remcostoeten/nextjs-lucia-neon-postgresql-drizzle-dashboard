import Content from './_components/content-gradient/gradient-content'
import Feature from './_components/feature/feature'
import Hero from './_components/hero/hero'
import LogoSection from './_components/logo-section/logo-section'
import PoweredBy from './_components/powered-by/powered-by'
import MarqueeItems from './_components/text-marquee/MarqueeItems'
import Video from './_components/Video/Video'

export default function LandingPage() {
	return (
		<>
			<Hero />
			<Video />
			<LogoSection />
			<Feature />
			<MarqueeItems />
			<Content />
			<PoweredBy />
		</>
	)
}
