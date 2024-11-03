import type { ReactNode } from 'react'

export type HeaderProps = {
	className?: string
	children?: ReactNode
}

export type NavLink = {
	href: string
	name: string
	external?: boolean
}

export type NavCategory = {
	name: string
	links: NavLink[]
}

export type AuthLinkProps = {
	href: string
	Icon: React.ComponentType
	text: string
}

export type BlogPostProps = {
	imageSrc: string
	title: string
	description: string
}
