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
			className={`inline-block text-center rounded-full px-[1px] py-[1px] text-sm font-medium leading-[1.7] text-white transition-all duration-500 ease-[cubic-bezier(0.6,0.6,0,1)] bg-[conic-gradient(from_0deg,rgba(255,255,255,0),rgba(255,255,255,0),rgba(255,255,255,0.32))] bg-white/12 hover:bg-white/20 trans-500 ${className}`}
		>
			<div className="z-[2] w-full px-3 py-[6px] leading-[1.7] rounded-full border-4 border-[var(--base--background)] bg-[var(--white--12)] bg-gradient-to-b from-[var(--white--8)] to-[rgba(142,120,176,0.08)] shadow-[inset_0_0.75px_0.75px_0_var(--white--16),inset_0_1px_0_0_var(--white--12)] backdrop-blur-[120px]">
				{children}
			</div>
		</Link>
	)
}

export default SecondaryButton
