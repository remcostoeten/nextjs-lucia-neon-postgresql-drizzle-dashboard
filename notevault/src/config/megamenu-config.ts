import { LogIn, User, UserPlus } from 'lucide-react'

export const menuConfig = {
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
		{ href: '/signup', Icon: UserPlus, text: 'Register' },
		{ href: '/dashboard', Icon: User, text: 'Dashboard' }
	]
}
