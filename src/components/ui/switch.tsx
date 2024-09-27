'use client'

import { cn } from '@/lib/utils'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import * as React from 'react'

const SWITCH_STYLES = {
	bg: 'bg-gray-200',
	bgActive: 'bg-blue-600',
	ball: 'bg-red-400',
	ballActive: 'translate-x-5'
}

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
			SWITCH_STYLES.bg,
			`data-[state=checked]:${SWITCH_STYLES.bgActive}`,
			className
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				'block h-5 w-5 rounded-full transition-transform',
				SWITCH_STYLES.ball,
				`data-[state=checked]:${SWITCH_STYLES.ballActive}`
			)}
		/>
	</SwitchPrimitives.Root>
))

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
