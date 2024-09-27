'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'
import * as React from 'react'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from 'ui'

export type DropdownAction = {
	label: string
	icon?: React.ReactNode
	onClick: () => void
}

type CustomDropdownProps = {
	actions: DropdownAction[]
}

export function CustomDropdown({ actions }: CustomDropdownProps) {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<AnimatePresence>
				{isOpen && (
					<DropdownMenuContent asChild forceMount>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							{actions.map((action, index) => (
								<DropdownMenuItem
									key={index}
									onClick={() => {
										action.onClick()
										setIsOpen(false)
									}}
								>
									{action.icon && (
										<span className="mr-2">
											{action.icon}
										</span>
									)}
									{action.label}
								</DropdownMenuItem>
							))}
						</motion.div>
					</DropdownMenuContent>
				)}
			</AnimatePresence>
		</DropdownMenu>
	)
}
