import Link from 'next/link'
import RainbowLine from '../../rainbow-line'
import styles from '../navigation.module.scss'

export default function Logo() {
	const name = 'remco.'

	return (
		<Link
			href="/"
			className={`${styles['nav-logo']} ${styles['w-nav-brand']} ${styles['w--current']}`}
		>
			<LogoTitle>{name}</LogoTitle>
			<RainbowLine />
		</Link>
	)
}

function LogoTitle({ children }: { children: React.ReactNode }) {
	return <h2 className="navigation_top-title__joNCs">{children}</h2>
}
