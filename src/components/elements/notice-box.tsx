'use client'

import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import ShinyButton from '../effects/shiny-button'

type NoticeBoxProps = {
	icon?: React.ReactNode
	title?: string
	description?: string
	actionText?: string
	onAction?: () => void
	homeLink?: string
	dashboardLink?: string
}

export default function NoticeBox({
	icon = <AlertTriangle className="h-4 w-4 shrink-0" />,
	title = 'Unexpected error occurred.',
	description,
	actionText = 'Try again',
	onAction = () => {},
	homeLink,
	dashboardLink
}: NoticeBoxProps) {
	return (
		<div className="w-full max-w-sm">
			<div className="rounded-lg border bg-section text-card-foreground flex flex-col items-center justify-center gap-4 border-dashed px-12 py-6 shadow-none">
				<div className="flex items-center justify-center rounded-md border bg-background p-2 shadow-sm">
					{icon}
				</div>
				<p className="text-sm text-title">{title}</p>
				{description && (
					<p className="text-sm text-subtitle">{description}</p>
				)}
				<div className="flex gap-4">
					{onAction && (
						<ShinyButton
							className="px-4 py-2 h-[54px] "
							onClick={onAction}
							// className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
						>
							{actionText}
						</ShinyButton>
					)}
					{homeLink && (
						<Link
							href={homeLink}
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 h-[50px]"
						>
							Go to Home
						</Link>
					)}
					{dashboardLink && (
						<Link
							href={dashboardLink}
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
						>
							Go to Dashboard
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
