import FoldersAside from '@/components/aside/route-specific/folders-aside'
import ParsedOutputsSidebar from '@/components/aside/route-specific/ig-parsed-aside'
import NotesSidebar from '@/components/aside/route-specific/notes-aside'
import SettingsSidebar from '@/components/aside/route-specific/settings-aside'
import { DashboardIcon } from '@radix-ui/react-icons'
import {
	Activity,
	CalendarIcon,
	FileText,
	FolderIcon,
	LucideIcon,
	Mail,
	MessageCircle,
	Mic,
	User
} from 'lucide-react'
import { ReactNode } from 'react'

export type SidebarItem = {
	name: string
	path: string
	icon: LucideIcon | ReactNode | any
	hasAlert?: boolean
	className?: string
	alertCount?: number
	disabled?: boolean
	realName?: string
}

export const sidebarItems: SidebarItem[] = [
	{ name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
	{
		name: 'Folders',
		path: '/dashboard/folders',
		icon: FolderIcon
	},
	{ name: 'Profile', path: '/dashboard/profile', icon: User },
	{ name: 'Posts', path: '/dashboard/activity', icon: Activity },
	{
		name: 'Inbox',
		path: '/dashboard/inbox',
		icon: Mail,
		hasAlert: true,
		alertCount: 3,
		disabled: true
	},
	{
		name: 'IG Follower Parser',
		path: '/dashboard/ig-follower-parser',
		icon: FileText,
		disabled: true
	},
	{
		name: 'Record MP3',
		path: '/dashboard/media-recorder',
		icon: Mic
	},
	{
		name: 'Tasks',
		path: '/dashboard/tasks',
		icon: CalendarIcon
	},
	{
		name: 'Chats',
		path: '/dashboard/chats',
		icon: MessageCircle
	}
]

type SubSidebarConfig = {
	[key: string]: {
		component: React.ComponentType
		allowToggle: boolean
	}
}

export const subSidebarConfig: SubSidebarConfig = {
	'/dashboard/settings': { component: SettingsSidebar, allowToggle: true },
	'/dashboard/ig-follower-parser': {
		component: ParsedOutputsSidebar,
		allowToggle: true
	},
	'/dashboard/notes': { component: NotesSidebar, allowToggle: false },
	'/dashboard/folders': { component: FoldersAside, allowToggle: true }
}
