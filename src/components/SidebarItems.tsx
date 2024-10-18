'use client'

import { additionalLinks, defaultLinks } from '@/config/nav'
import { cn } from 'cn'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'

export interface SidebarLink {
	title: string
	href: string
	icon: LucideIcon
	disabled?: boolean
}

const SidebarItems = () => {
	return (
		<>
			<SidebarLinkGroup links={defaultLinks} />
			{additionalLinks.length > 0
				? additionalLinks.map(l => (
					<SidebarLinkGroup
						links={l.links}
						title={l.title}
						border
						key={l.title}
					/>
				))
				: null}
		</>
	)
}

export default SidebarItems

const SidebarLinkGroup = ({
	links,
	title,
	border
}: {
	links: SidebarLink[]
	title?: string
	border?: boolean
}) => {
	const fullPathname = usePathname()
	const pathname = '/' + fullPathname.split('/')[1]

	return (
		<div className={border ? 'border-border border-t my-8 pt-4' : ''}>
			{title ? (
				<h4 className="px-2 mb-2 text-xs uppercase text-muted-foreground tracking-wider">
					{title}
				</h4>
			) : null}
			<ul>
				{links.map(link => (
					<li key={link.title}>
						<SidebarLink
							link={link}
							active={pathname === link.href}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}

const SidebarLink = ({
	link,
	active
}: {
	link: SidebarLink
	active: boolean
}) => {
	const router = useRouter()

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (link.disabled) {
			e.preventDefault()
			toast.error("This page is currently not available.")
		}
	}

	return (
		<Link
			href={link.href}
			onClick={handleClick}
			className={`group transition-colors p-2 inline-block hover:bg-popover hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md w-full
        ${active ? ' text-primary font-semibold' : ''}
        ${link.disabled ? ' opacity-50 cursor-not-allowed' : ''}`}
		>
			<div className="flex items-center">
				<div
					className={cn(
						'opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary',
						active ? 'opacity-100' : ''
					)}
				/>
				<link.icon className="h-3.5 mr-1" />
				<span>{link.title}</span>
			</div>
		</Link>
	)
}
