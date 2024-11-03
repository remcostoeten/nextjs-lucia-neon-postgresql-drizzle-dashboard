import HomeLights from './_components/effects/home-lights'
import Footer from './_components/footer/footer'
import Header from './_components/navigation/header'

import './styles/app.scss'

export default function LandingLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div>
			<Header />
			{children}
			<Footer />
			<HomeLights />
		</div>
	)
}
