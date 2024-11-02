type HeaderProps = {
	title: string
	subtitle: string
}

export function Header({ title, subtitle }: HeaderProps) {
	return (
		<header className="flex flex-col gap-3 self-start font-medium max-md:max-w-full">
			<h1 className="flex flex-col pr-3.5 text-6xl leading-[67.2px] tracking-tight max-md:max-w-full">
				<span className="gradient-span">{title}</span>
			</h1>
			<p className="headline-regular">{subtitle}</p>
		</header>
	)
}
