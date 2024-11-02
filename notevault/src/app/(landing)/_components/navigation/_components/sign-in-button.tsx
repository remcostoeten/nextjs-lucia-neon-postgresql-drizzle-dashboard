import Link from 'next/link'

type SecondaryButtonProps = {
	href: string
	children: React.ReactNode
	className?: string
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
	href,
	children,
	className
}) => {
	return (
		<Link
			href={href}
			className={`ease-[cubic-bezier(0.6,0.6,0,1)] bg-white/12 trans-500 inline-block rounded-full bg-[conic-gradient(from_0deg,rgba(255,255,255,0),rgba(255,255,255,0),rgba(255,255,255,0.32))] p-px text-center text-sm font-medium leading-[1.7] text-white transition-all duration-500 hover:bg-white/20 ${className}`}
		>
			<div className="z-[2] w-full rounded-full border-4 border-[var(--base--background)] bg-[var(--white--12)] bg-gradient-to-b from-[var(--white--8)] to-[rgba(142,120,176,0.08)] px-3 py-[6px] leading-[1.7] shadow-[inset_0_0.75px_0.75px_0_var(--white--16),inset_0_1px_0_0_var(--white--12)] backdrop-blur-[120px]">
				{children}
			</div>
		</Link>
	)
}

export default SecondaryButton
