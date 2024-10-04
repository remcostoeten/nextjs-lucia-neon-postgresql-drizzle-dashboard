import BackgroundGeneratorSidebar from '@/components/aside/route-specific/background-creator-aside'
import DashboardSidebar from '@/components/aside/route-specific/dashboard-home-aside'
import NotesSidebar from '@/components/aside/route-specific/notes-aside'
import SettingsSidebar from '@/components/aside/route-specific/settings-aside'
import { DashboardIcon } from '@radix-ui/react-icons'
import { Edit, LucideIcon, Mail, Paintbrush, User } from 'lucide-react'

export type SidebarItem = {
	name: string
	path: string
	icon: LucideIcon
	hasAlert?: boolean
	className?: string
	alertCount?: number
	realName?: string
}

export const sidebarItems: SidebarItem[] = [
	{ name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },

	{ name: 'Profile', path: '/dashboard/profile', icon: User },
	{ name: 'Notes', path: '/dashboard/notes', icon: Edit },
	{
		name: 'Inbox',
		path: '/dashboard/inbox',
		icon: Mail,
		hasAlert: true,
		alertCount: 3
	},
	{
		name: 'Generate background',
		path: '/dashboard/background-creator',
		icon: Paintbrush
	}
]

type SubSidebarConfig = {
	[key: string]: {
		component: React.ComponentType
		allowToggle: boolean
	}
}

export const subSidebarConfig: SubSidebarConfig = {
	'/dashboard': { component: DashboardSidebar, allowToggle: true },
	'/dashboard/settings': { component: SettingsSidebar, allowToggle: true },
	'/dashboard/notes': { component: NotesSidebar, allowToggle: false },
	'/dashboard/background-creator': {
		component: BackgroundGeneratorSidebar,
		allowToggle: false
	}
}
