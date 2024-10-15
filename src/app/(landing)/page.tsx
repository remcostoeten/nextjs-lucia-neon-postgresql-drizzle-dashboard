import Notice from '@/components/ui/notice'
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
			<Notice id={'landing-page-notice'}
			>
				Just redesigned the lading page! 🎨 Content is still WIP
			</Notice>	<Hero />
			<Video />
			<LogoSection />
			<Feature />
			<MarqueeItems />
			<Content />
			<PoweredBy />
		</>
	)
}
