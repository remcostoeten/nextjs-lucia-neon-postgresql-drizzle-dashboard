import BentoGridIntro from '@/components/_old-landing/bent-grid'
import Hero from '@/components/_old-landing/Hero/Hero'

export default function Home() {
	return (
		<>
			<Hero />
			<Wrapper>
				<BentoGridIntro />
			</Wrapper>
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
