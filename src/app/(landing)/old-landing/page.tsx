import GithubOpenSource from '@/components/effects/gitihu-oss/github-open-source'
import BentoGrid from '@/components/landing/bento-grid/bento-grid'
import { Footer } from '@/components/landing/footer'
import Hero2 from '../_components/hero/hero'

export default function Home() {
	return (
		<>
			{/* <Hero /> */}
			<Hero2 />
			<Wrapper>
				<BentoGrid />
			</Wrapper>
			<GithubOpenSource />
			<Footer />
		</>
	)
}

function Wrapper({ children }: PageProps) {
	return <section className="mx-auto  max-w-[1440px]">{children}</section>
}
