import LandingEffects from './_components/effects/landing-effects'
// import './styles/landing.scss'
import HomeLights from './_components/effects/home-lights'
import Footer from './_components/footer/footer'
import Navigation from './_components/navigation/navigation'
import './styles/app.scss'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Navigation />
			{children}
			<Footer />
			<HomeLights />
			<LandingEffects effect="noise" />
		</>
	)
}
