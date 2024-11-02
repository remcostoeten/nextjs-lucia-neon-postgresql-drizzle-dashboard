import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type PageContainerProps = {
	children: ReactNode
	className?: string
	as?: keyof JSX.IntrinsicElements
}

export default function PageContainer({
	children,
	className,
	as: Component = 'div'
}: PageContainerProps) {
	return (
		<Component className={cn('container mx-auto px-4', className)}>
			{children}
		</Component>
	)
}
