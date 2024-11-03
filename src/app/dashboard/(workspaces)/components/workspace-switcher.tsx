'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { Workspace } from '@/core/types/db'
import { motion } from 'framer-motion'
import { ChevronsUpDown, Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type WorkspaceSwitcherProps = {
	workspaces: Workspace[]
}

export default function WorkspaceSwitcher({
	workspaces = []
}: WorkspaceSwitcherProps) {
	const { workspaceSlug } = useParams() as { workspaceSlug?: string }

	const selectedWorkspace =
		workspaces?.find((w) => w.slug === workspaceSlug) || workspaces?.[0]

	if (!workspaces?.length) return null

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-auto w-[240px] justify-start gap-2 border border-zinc-800 bg-zinc-900 px-3 py-2 hover:bg-zinc-900/50"
				>
					<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800">
						<span className="text-lg">
							{selectedWorkspace?.iconId}
						</span>
					</div>
					<div className="flex flex-col items-start">
						<span className="text-sm font-medium text-zinc-100">
							{selectedWorkspace?.title}
						</span>
						<span className="text-xs text-zinc-400">Workspace</span>
					</div>
					<ChevronsUpDown className="ml-auto h-4 w-4 text-zinc-400" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				className="w-[240px] border border-zinc-800 bg-zinc-900"
				sideOffset={8}
			>
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.15, ease: 'easeOut' }}
				>
					{workspaces.map((workspace) => (
						<DropdownMenuItem
							key={workspace.slug}
							className="flex items-center gap-2 py-2 hover:bg-zinc-800/50"
							asChild
						>
							<Link href={`/dashboard/${workspace.slug}`}>
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800">
									<span className="text-lg">
										{workspace.iconId}
									</span>
								</div>
								<span className="text-sm font-medium text-zinc-100">
									{workspace.title}
								</span>
								{selectedWorkspace?.slug === workspace.slug && (
									<motion.div
										layoutId="active"
										style={{
											marginLeft: 'auto',
											height: '0.375rem',
											width: '0.375rem',
											borderRadius: '9999px',
											backgroundColor: 'var(--primary)'
										}}
										transition={{
											duration: 0.15,
											ease: 'easeOut'
										}}
									/>
								)}
							</Link>
						</DropdownMenuItem>
					))}
					<DropdownMenuSeparator className="bg-zinc-800" />
					<DropdownMenuItem
						asChild
						className="flex items-center gap-2 py-2 hover:bg-zinc-800/50"
					>
						<Link href="/dashboard/new-workspace">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800">
								<Plus className="h-4 w-4 text-zinc-400" />
							</div>
							<span className="text-sm font-medium text-zinc-100">
								Create Workspace
							</span>
						</Link>
					</DropdownMenuItem>
				</motion.div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
