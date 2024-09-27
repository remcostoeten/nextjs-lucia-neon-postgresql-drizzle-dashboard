import { LogIn, LucideIcon, UserCog2Icon, UserPlus } from 'lucide-react'

type AuthLinkProps = {
	href: string
	Icon: LucideIcon
	text: string
}

export const links: AuthLinkProps[] = [
	{ href: '/sign-in', Icon: LogIn, text: 'Login' },
	{ href: '/sign-up', Icon: UserPlus, text: 'Register' },
	{ href: '/dashboard', Icon: UserCog2Icon, text: 'Dashboard' }
]

export const textContent = {
	tabs: {
		products: 'Products',
		pricing: 'Authentication',
		blog: 'Blog'
	},
	products: {
		startup: {
			title: 'Startup',
			items: [
				'Funding',
				'Networking',
				'Mentorship',
				{
					href: '/design-system/color-tool',
					label: 'Color UI picker',
					alias: 'Cfg creator'
				},
				{
					href: '/design-system/card-spotlight',
					label: 'Card spotlight',
					alias: 'Card spotlight'
				}
			]
		},
		scaleup: {
			title: 'Scaleup',
			items: [
				'Growth Strategies',
				'Market Expansion',
				'Team Building',
				{
					href: '/design-system/confetti',
					label: 'Confetti',
					alias: 'Confetti'
				},
				{
					href: '/design-system/ripple',
					label: 'Ripple',
					alias: 'Ripple'
				}
			]
		},
		enterprise: {
			title: 'Enterprise',
			items: [
				'Digital Transformation',
				'Innovation Labs',
				'Corporate Ventures',
				{
					href: '/design-system/tag-input',
					label: 'Tag input showcase',
					alias: 'Tag input'
				},
				{
					href: '/design-system/edit-action',
					label: 'Accessible edit form',
					alias: 'Edit form'
				},
				{
					href: '/design-system/tailwind-colors',
					label: 'Theme tailwind colors',
					alias: 'Config Colors'
				}
			]
		},
		viewMore: 'View more products'
	},
	pricing: {
		home: 'Home',
		analytics: 'Analytics',
		reports: 'Reports'
	}
}
