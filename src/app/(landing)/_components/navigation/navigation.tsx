import HorizontalLine from '../horizontal-line'
import Logo from './_components/logo'
import SecondaryButton from './_components/sign-in-button'

export default function Navigation() {
	return (
		<div className="relative">
			<nav className="flex justify-between items-center w-full max-w-[1128px] mx-auto px-4 py-6 relative">
				<Logo />
				<SecondaryButton href="/dashboard">Dashboard</SecondaryButton>
			</nav>
			<HorizontalLine />
		</div>
	)
}
