import LandingEffects from './_components/effects/landing-effects'
// import './styles/landing.scss'
import HomeLights from './_components/effects/home-lights'
import './styles/app.scss'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{children}
			<HomeLights />
			<LandingEffects effect="noise" />
		</>
	)
}
