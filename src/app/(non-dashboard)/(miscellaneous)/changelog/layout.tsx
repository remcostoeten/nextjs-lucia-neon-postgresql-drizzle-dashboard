import Particles from '@/components/effects/particles'

export default function RootLayout({ children }: PageProps) {
	return (
		<>
			{children}
			<Particles className="pointer-events-none absolute inset-0" />
		</>
	)
}
