import type { ReactNode } from 'react'

type CenterProps = {
	children: ReactNode
	method?: 'grid' | 'absolute' | 'flex'
	direction?: 'vertical' | 'horizontal' | 'both'
	className?: string
}

export default function Center({
	children,
	method = 'flex',
	direction = 'both',
	className = ''
}: CenterProps) {
	let centerStyles = ''

	switch (method) {
		case 'grid':
			centerStyles = 'grid w-screen h-screen  place-items-center'
			break
		case 'absolute':
			centerStyles = 'absolute'
			if (direction === 'vertical' || direction === 'both') {
				centerStyles += ' top-1/2 -translate-y-1/2'
			}
			if (direction === 'horizontal' || direction === 'both') {
				centerStyles += ' left-1/2 -translate-x-1/2'
			}
			break
		case 'flex':
		default:
			centerStyles = 'flex'
			if (direction === 'vertical' || direction === 'both') {
				centerStyles += ' items-center'
			}
			if (direction === 'horizontal' || direction === 'both') {
				centerStyles += ' justify-center'
			}
			break
	}

	return <div className={`${centerStyles} ${className}`}>{children}</div>
}
