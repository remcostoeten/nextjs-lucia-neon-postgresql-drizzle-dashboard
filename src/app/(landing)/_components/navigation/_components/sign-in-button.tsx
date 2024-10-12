import Link from 'next/link'

type SecondaryButtonProps = {
	href: string
	children: React.ReactNode
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
	href,
	children
}) => {
	return (
		<Link
			href={href}
			target="_blank"
			className="inline-block text-center rounded-full px-[1px] py-[1px] text-sm font-medium leading-[1.7] text-white transition-all duration-500 ease-[cubic-bezier(0.6,0.6,0,1)] bg-[conic-gradient(from_0deg,rgba(255,255,255,0),rgba(255,255,255,0),rgba(255,255,255,0.32))] bg-white/12 hover:opacity-80"
		>
			<div className="z-[2] w-full px-3 py-[6px] leading-[1.7] rounded-full border-4 border-[var(--base--background)] bg-[var(--white--12)] bg-gradient-to-b from-[var(--white--8)] to-[rgba(142,120,176,0.08)] shadow-[inset_0_0.75px_0.75px_0_var(--white--16),inset_0_1px_0_0_var(--white--12)] backdrop-blur-[120px]">
				{children}
			</div>
			<div className="absolute inset-0 z-0 rounded-full bg-[var(--white--12)] pointer-events-none">
				<div className="hidden"></div>
			</div>
		</Link>
	)
}

export default SecondaryButton
