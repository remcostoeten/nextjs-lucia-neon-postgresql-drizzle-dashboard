import GithubOpenSource from '@/components/effects/gitihu-oss/github-open-source'
import BentoGrid from '@/components/landing/bent-grid'
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

interface PageProps {
	children: React.ReactNode
}

function Wrapper({ children }: PageProps) {
	return (
		<section className="mx-auto  max-w-[1440px] px-4 sm:px-6 lg:px-8">
			{children}
		</section>
	)
}
