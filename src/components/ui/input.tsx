import * as React from 'react'

import { cn } from 'cn'
;('')
export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, icon, ...props }, ref) => {
		return (
			<div className={cn('flex items-center', className)}>
				{icon && <div className="mr-3">{icon}</div>}
				<input
					type={type}
					className={cn(
						'flex h-10 w-full rounded-md border border-input focus:bg-card focus:ring-0 focus:border-1 focus:outline-none trans-all bg-body px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium transition-all duration-500 text-placeholder focus:text-title ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  trans-all disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
					ref={ref}
					{...props}
				/>
			</div>
		)
	}
)
Input.displayName = 'Input'

export { Input }
