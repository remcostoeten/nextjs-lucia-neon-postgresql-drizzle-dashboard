import { LogIn, User, UserPlus } from 'lucide-react'
import { siteConfig } from './site-config'

export const menuConfig = {
	products: [
		{
			name: 'Elements',
			links: [
				{ name: 'Notice box', href: '/design-system/notice' },
				{
					name: 'Card spotlight',
					href: '/design-system/card-spotlight'
				}
			]
		},
		{
			name: 'Hooks showcase',
			links: [
				{ name: 'Color palette', href: '/hooks-showcase/palette' },
				{
					name: 'use-geolocation',
					href: '/hooks-showcase/geolocation'
				}
			]
		},
		{
			name: 'Previous itterations',
			links: [
				{
					name: 'Productivity panel',
					href: 'http://panel.remcostoeten.com',
					external: true
				},
				{
					name: 'All-in-one dashboard',
					href: 'https://dashboard.remcostoeten.com/login',
					external: true
				},
				{
					name: 'GitHub Repository',
					href: `https://github.com/${siteConfig.username}/${siteConfig.repositoryName}`,
					external: true
				}
			]
		},
		{
			name: 'Docs',
			links: [
				{ name: 'To Do', href: '/docs/todo' },
				{ name: 'P', href: '/docs/p' },
				{ name: 'Kanban Board', href: '/docs/kanban-board' }
			]
		}
	],
	blog: [
		{
			id: '1',
			imageSrc: '/menu/blog1.jpg',
			title: 'Lorem ipsum dolor',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo quidem eos.'
		},
		{
			id: '2',
			imageSrc: '/menu/blog2.jpeg',
			title: 'Lorem ipsum dolor',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo quidem eos.'
		}
	],
	authentication: [
		{ href: '/sign-in', Icon: LogIn, text: 'Log In' },
		{ href: '/sign-up', Icon: UserPlus, text: 'Register' },
		{ href: '/dashboard', Icon: User, text: 'Dashboard' }
	]
}
