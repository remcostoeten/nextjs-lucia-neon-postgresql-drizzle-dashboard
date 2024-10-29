'use client'

import * as React from 'react'
import { Toaster as Sonner } from 'sonner'

const Toaster = ({ ...props }: React.ComponentProps<typeof Sonner>) => {
	return (
		<Sonner
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:shadow-md',
					title: 'group-[.toast]:font-display group-[.toast]:text-lg',
					description: 'group-[.toast]:text-neutral-600',
					actionButton:
						'group-[.toast]:bg-foreground group-[.toast]:text-neutral-100 group-[.toast]:rounded-default',
					cancelButton:
						'group-[.toast]:bg-neutral-200 group-[.toast]:text-neutral-600 group-[.toast]:rounded-default'
				}
			}}
			{...props}
		/>
	)
}
Toaster.displayName = 'Toaster'

export { Toaster }
