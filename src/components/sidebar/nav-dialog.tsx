'use client'

import { LucideIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { cn } from 'cn'

type NavDialogProps = {
	title: string
	description: string
	icon: LucideIcon
	children: React.ReactNode
	isCollapsed?: boolean
}

export function NavDialog({
	title,
	description,
	icon: Icon,
	children,
	isCollapsed
}: NavDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className={cn(
						'group w-full justify-start',
						isCollapsed && 'h-12 w-12 p-0'
					)}
				>
					<Icon className={cn('size-5', isCollapsed && 'mx-auto')} />
					{!isCollapsed && <span>{title}</span>}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}
