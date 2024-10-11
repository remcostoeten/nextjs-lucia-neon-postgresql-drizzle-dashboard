import GithubOpenSource from '@/components/effects/gitihu-oss/github-open-source'
import BentoGrid from '@/components/landing/bento-grid/bento-grid'
import { Footer } from '@/components/landing/footer'
import Hero from '@/components/landing/Hero/Hero'

export default function Home() {
	return (
		<>
			<Hero />
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
