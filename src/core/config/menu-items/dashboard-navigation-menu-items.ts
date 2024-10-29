import { siteConfig } from '@/config/site-config'
import { Github, HelpCircle } from 'lucide-react'

export const links = [
	{ href: '/features', label: 'Features' },
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/dashboard/folders', label: 'Folders feature' }
]

export const IconTooltips = [
	{ href: '#', label: 'Help', icon: HelpCircle, isButton: true },
	{
		href: siteConfig.projects.main.url,
		label: 'GitHub',
		icon: Github,
		isButton: true
	}
]
