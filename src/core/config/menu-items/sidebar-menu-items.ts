import DashboardSidebar from '@/components/aside/route-specific/dashboard-home-aside'
import NotesSidebar from '@/components/aside/route-specific/notes-aside'
import SettingsSidebar from '@/components/aside/route-specific/settings-aside'
import { Edit, Home, LucideIcon, Mail, Settings2, User } from 'lucide-react'

export type SidebarItem = {
	name: string
	path: string
	icon: LucideIcon
	hasAlert?: boolean
	className?: string
	alertCount?: number
}

export const sidebarItems: SidebarItem[] = [
	{ name: 'Home', path: '/', icon: Home },

	{ name: 'Profile', path: '/dashboard/profile', icon: User },
	{ name: 'Notes', path: '/dashboard/notes', icon: Edit },
	{
		name: 'Inbox',
		path: '/dashboard/inbox',
		icon: Mail,
		hasAlert: true,
		alertCount: 3
	},
	{ name: 'Settings', path: '/dashboard/settings', icon: Settings2 }
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
	'/dashboard/notes': { component: NotesSidebar, allowToggle: false }
}
