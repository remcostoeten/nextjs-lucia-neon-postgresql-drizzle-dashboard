import { SettingsIcon, Trash2, User2 } from 'lucide-react'
import React from 'react'

import type { LucideIcon } from 'lucide-react'

import WorkspaceSwitcher from '@/app/dashboard/(workspaces)/components/workspace-switcher'
import { siteConfig } from '@/config/site'
import { useAppState } from '@/core/hooks/use-app-state'
import { cn } from '@/lib/utils'
import { SignOut } from '../auth/sign-out'
import Logo from '../base/logo'
import { Settings } from '../settings'
import { ThemeSwitcher } from '../theme-switcher'
import { Trash } from '../trash'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Folders } from './folders'
import { FoldersCollapsed } from './folders-collapsed'
import { NavDialog } from './nav-dialog'

type SidebarProps = React.ComponentProps<'aside'> & {
	isCollapsed: boolean
}

type NavItem = {
	title: string
	description: string
	icon: LucideIcon
	content: React.FC
}

const navItems: NavItem[] = [
	{
		title: 'Settings',
		description: 'Manage your settings',
		icon: SettingsIcon,
		content: Settings
	},
	{
		title: 'Trash',
		description: 'Manage your trash',
		icon: Trash2,
		content: Trash
	}
]

export function Sidebar({ isCollapsed, className, ...props }: SidebarProps) {
	const { user, workspaces } = useAppState()

	return (
		<aside
			className={cn('relative z-40 hidden lg:block', className)}
			{...props}
		>
			<div
				className={cn(
					'sticky inset-y-0 flex h-screen flex-col gap-2',
					!isCollapsed && 'overflow-hidden'
				)}
			>
				<div
					className={cn(
						'flex mx-auto border-b pb-0',
						isCollapsed
							? 'my-px h-14 border-b'
							: 'my-1 ml-4 mr-2 items-center gap-2'
					)}
				>
					<Logo
						hasLink
						className={cn('shrink-0', isCollapsed && 'm-auto')}
					/>
					{!isCollapsed && (
						<span className="font-handwriting text-2xl font-medium lowercase">
							{siteConfig.name}
						</span>
					)}
				</div>

				{!isCollapsed && (
					<div className="px-2">
						<WorkspaceSwitcher workspaces={workspaces} />
					</div>
				)}

				<nav className="flex flex-col items-center justify-center gap-1 px-4">
					{navItems.map(
						({ title, description, icon, content: Content }) =>
							isCollapsed ? (
								<Tooltip key={title} delayDuration={0}>
									<TooltipTrigger asChild>
										<NavDialog
											title={title}
											icon={icon}
											description={description}
											isCollapsed
										>
											<Content />
										</NavDialog>
									</TooltipTrigger>
									<TooltipContent side="right">
										{title}
									</TooltipContent>
								</Tooltip>
							) : (
								<NavDialog
									key={title}
									title={title}
									icon={icon}
									description={description}
								>
									<Content />
								</NavDialog>
							)
					)}
				</nav>

				<Separator className={isCollapsed ? 'block' : 'hidden'} />

				{isCollapsed ? <FoldersCollapsed /> : <Folders />}

				<div
					className={cn(
						'absolute z-10 transition-all animate-in fade-in-0 zoom-in-0 slide-in-from-bottom-full [animation-duration:500ms]',
						isCollapsed
							? 'inset-x-0 bottom-14'
							: 'inset-x-2 bottom-14 flex items-center gap-2 rounded-full border bg-background/10 p-2 shadow backdrop-blur-md hover:shadow-xl'
					)}
				>
					{isCollapsed ? (
						<Popover>
							<PopoverTrigger className="mx-auto flex rounded-full border p-0.5 shadow hover:shadow-xl">
								<Avatar>
									<AvatarImage
										src={user?.image ?? undefined}
										className="rounded-full"
									/>

									<AvatarFallback className="cursor-pointer bg-background hover:bg-muted">
										<User2 className="size-5" />
									</AvatarFallback>
								</Avatar>
							</PopoverTrigger>

							<PopoverContent
								side="right"
								className="flex justify-between"
							>
								<div className="w-full font-medium">
									<p className="line-clamp-1 text-sm">
										{user?.name ?? 'Update your profile'}
									</p>
									<p className="line-clamp-1 text-xs text-muted-foreground">
										Free plan
									</p>
								</div>

								<SignOut
									size="icon"
									variant="ghost"
									className="ml-auto shrink-0 rounded-full text-muted-foreground"
								/>
							</PopoverContent>
						</Popover>
					) : (
						<>
							<Avatar className="m-auto">
								<AvatarImage src={user?.image ?? undefined} />
								<AvatarFallback>
									<User2 className="size-6 text-muted-foreground" />
								</AvatarFallback>
							</Avatar>

							<div className="w-full font-medium">
								<p className="line-clamp-1 text-sm">
									{user?.name ?? 'Update your profile'}
								</p>
								<p className="line-clamp-1 text-xs text-muted-foreground">
									Free plan
								</p>
							</div>

							<SignOut
								size="icon"
								variant="ghost"
								className="ml-auto shrink-0 rounded-full text-muted-foreground"
							/>
						</>
					)}
				</div>

				<div
					className={cn(
						'absolute z-10 transition-all',
						isCollapsed
							? 'inset-x-0 bottom-1 flex justify-center'
							: 'inset-x-2 bottom-2 flex justify-end'
					)}
				>
					<ThemeSwitcher />
				</div>
			</div>
		</aside>
	)
}
