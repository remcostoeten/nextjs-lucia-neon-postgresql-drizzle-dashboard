import Particles from '@/components/effects/particles'
import Container from '../../(landing)/_components/page-container'

export default function RootLayout({ children }: PageProps) {
	return (
		<>
			<Container>{children}</Container>
			<Particles className="pointer-events-none absolute inset-0 opacity-35" />
		</>
	)
}
