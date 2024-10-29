import Link from 'next/link'
import RainbowLine from '../../rainbow-line'
import styles from '../header.module.scss'

type LogoProps = {
	className?: string
	isScrolled: boolean
}

export default function Logo({ className, isScrolled }: LogoProps) {
	const name = 'remco.'

	return (
		<Link
			href="/"
			className={`${styles['nav-logo']} ${styles['w-nav-brand']} ${styles['w--current']} ${className} transition-all duration-300`}
		>
			<LogoTitle
				className={`${styles['logo-title']} ${isScrolled ? 'text-base' : 'text-xl'} text-white transition-all duration-300`}
			>
				{name}
			</LogoTitle>
			<div
				className={`${isScrolled ? 'transform scale-75 -translate-y-0.5 -translate-y-[14px]' : ''} transition-all duration-300`}
			>
				<RainbowLine />
			</div>
		</Link>
	)
}

function LogoTitle({
	children,
	className
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<h2 className={`${styles['navigation_top-title__joNCs']} ${className}`}>
			{children}
		</h2>
	)
}
