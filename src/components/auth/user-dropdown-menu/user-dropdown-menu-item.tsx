type MenuItemProps = {
	label: string
	link?: string
	onClick?: () => void
}

function siMenuItem({ label, link, onClick }: MenuItemProps) {
	const baseClasses =
		'flex-1 shrink self-stretch pt-3.5 pr-4 pb-3 pl-4 w-full whitespace-nowrap rounded-lg hover:bg-zinc-900 transition duration-200 ease-in-out'
	const textColor = 'dark:text-title text-black'
	const cursorPointer = link || onClick ? 'cursor-pointer' : ''

	if (link) {
		return (
			<li className={`${baseClasses} ${textColor} ${cursorPointer}`}>
				<a href={link} target="_blank" rel="noopener noreferrer">
					{label}
				</a>
			</li>
		)
	}

	return (
		<li
			className={`${baseClasses} ${textColor} ${cursorPointer}`}
			onClick={onClick}
		>
			{label}
		</li>
	)
}

export default siMenuItem
