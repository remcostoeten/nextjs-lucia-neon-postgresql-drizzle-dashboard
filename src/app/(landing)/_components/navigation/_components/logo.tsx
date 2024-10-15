import Link from 'next/link'

import RainbowLine from '../../rainbow-line'
import styles from '../navigation.module.scss'

type LogoProps = {
	className?: string;
	isScrolled: boolean;
}

export default function Logo({ className, isScrolled }: LogoProps) {
	const name = 'remco.'

	return (
		<Link
			href="/"
			className={`${styles['nav-logo']} ${styles['w-nav-brand']} ${styles['w--current']} ${className}`}
		>
			<LogoTitle className={styles['logo-title']}>{name}</LogoTitle>
			<div className={`${isScrolled ? 'transform -translate-y-0.5' : ''} transition-transform duration-300`}>
				<RainbowLine />
			</div>
		</Link>
	)
}

function LogoTitle({ children, className }: { children: React.ReactNode; className?: string }) {
	return <h2 className={`${styles['navigation_top-title__joNCs']} ${className}`}>{children}</h2>
}
