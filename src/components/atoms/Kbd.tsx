import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { Command, Option } from 'lucide-react'
import React from 'react'

const kbdVariants = cva(
	'inline-flex items-center justify-center rounded-md px-2 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background !border-outline',
	{
		variants: {
			variant: {
				default:
					//   "bg-dark-section border-dark-section--lighters text-muted border shadow-sm hover:bg-dark-section--lighter",
					'bg-section-lighter border-outline hover:bg-dark-section e text-title',
				accent:
					//   "bg-blue-600 text-title border border-blue-500 shadow-sm hover:bg-blue-500",
					'bg-dark-bg--lighter hover:bg-brand border border-border text-title',
				ghost:
					//   "bg-transparent text-subtitle border border-gray-700 hover:bg-gray-800",
					'bg-dark-bg--lighter hover:bg-dark-section border border-transparent hover:border-border text-title'
			},
			size: {
				default: 'h-8',
				sm: 'h-6 text-xs px-1.5 py-0.5',
				lg: 'h-10 text-base px-3 py-2'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface KbdProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof kbdVariants> {
	children: React.ReactNode
	combination?: string[]
}

const Kbd = React.forwardRef<HTMLSpanElement, KbdProps>(
	({ className, variant, size, combination, ...props }, ref) => {
		const renderKey = (key: string) => {
			switch (key.toLowerCase()) {
				case 'ctrl':
				case 'cmd':
					return <Command className="w-4 h-4" />
				case 'alt':
				case 'option':
					return <Option className="w-4 h-4" />
				default:
					return key
			}
		}

		const renderKeys = () => {
			if (combination) {
				return combination.map((key, index) => (
					<React.Fragment key={key}>
						{index > 0 && (
							<span className="mx-1 text-gray-500">+</span>
						)}
						<span className="min-w-[1.5em] text-center flex items-center justify-center">
							{renderKey(key)}
						</span>
					</React.Fragment>
				))
			}
			return props.children
		}

		return (
			<span
				className={cn(kbdVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{renderKeys()}
			</span>
		)
	}
)
Kbd.displayName = 'Kbd'

export { Kbd, kbdVariants }
