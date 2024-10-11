import { DropdownNavigation } from '@/components/elements/dropdown-navigation'
import FontShowcase from './_components/__development/font-showcase'
import LandingEffects from './_components/effects/landing-effects'
// import './styles/landing.scss'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<FontShowcase />

			<DropdownNavigation />
			{children}
			<LandingEffects effect="lights" />
			<LandingEffects effect="noise" />
		</>
	)
}
