type HeaderProps = {
	title: string
	subtitle: string
}

export function Header({ title, subtitle }: HeaderProps) {
	return (
		<header className="flex flex-col self-start font-medium max-md:max-w-full gap-3">
			<h1 className="flex flex-col pr-3.5 text-6xl tracking-tight leading-[67.2px] max-md:max-w-full">
				<span className="gradient-span">{title}</span>
			</h1>
			<p className="headline-regular">{subtitle}</p>
		</header>
	)
}
