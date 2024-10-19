import HomeLights from './_components/effects/home-lights'
import LandingEffects from './_components/effects/landing-effects'
// import './styles/landing.scss'
import './styles/app.scss'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<LandingEffects effect="noise" />
			{children}
			<HomeLights />
		</>
	)
}
