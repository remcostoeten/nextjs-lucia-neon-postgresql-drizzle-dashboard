import { links } from '@/core/config/menu-items/dropdown-menu.items'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type AuthLinkProps = {
	href: string
	Icon: LucideIcon
	text: string
}

const AuthLink: React.FC<AuthLinkProps> = ({ href, Icon, text }) => {
	return (
		<Link
			href={href}
			className="flex w-full flex-col items-center justify-center py-2 text-text-regular-nav transition-colors hover:text-neutral-50"
		>
			<Icon className="mb-2 text-xl text-indigo-300" />
			<span className="text-xs">{text}</span>
		</Link>
	)
}

const Authentication: React.FC = () => {
	return (
		<div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700">
			{links.map(link => (
				<AuthLink key={link.href} {...link} />
			))}
		</div>
	)
}

export default Authentication
