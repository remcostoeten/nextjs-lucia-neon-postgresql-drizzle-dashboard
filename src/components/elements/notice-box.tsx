'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui'

type NoticeBoxProps = {
	icon?: React.ReactNode
	title?: string
	description?: string
	actionText?: string
	onAction?: () => void
	homeLink?: string
	dashboardLink?: string
	children?: React.ReactNode
	useMotion?: boolean
	width?: 'sm' | 'md' | 'lg'
}

const MotionWrapper = motion.div

export default function NoticeBox({
	icon = <AlertTriangle className="h-4 w-4 shrink-0" />,
	title = 'Unexpected error occurred.',
	description,
	actionText = 'Try again',
	onAction,
	homeLink,
	dashboardLink,
	children,
	useMotion = false,
	width = 'sm'
}: NoticeBoxProps) {
	const widthClasses = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg'
	}

	const contentVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.25, 0.1, 0.25, 1]
			}
		}
	}

	const content = (
		<div className={`w-full ${widthClasses[width]}`}>
			<div className="rounded-lg border bg-section text-card-foreground flex flex-col items-center justify-center gap-4 border-dashed px-12 py-6 shadow-none">
				{useMotion ? (
					<MotionWrapper variants={contentVariants}>
						<div className="flex items-center justify-center rounded-md border bg-background p-2 shadow-sm">
							{icon}
						</div>
					</MotionWrapper>
				) : (
					<div className="flex items-center justify-center rounded-md border bg-background p-2 shadow-sm">
						{icon}
					</div>
				)}

				{useMotion ? (
					<MotionWrapper variants={contentVariants}>
						<h2 className="text-sm font-semibold text-title">
							{title}
						</h2>
					</MotionWrapper>
				) : (
					<h2 className="text-sm font-semibold text-title">
						{title}
					</h2>
				)}

				{description &&
					(useMotion ? (
						<MotionWrapper variants={contentVariants}>
							<p className="text-sm text-subtitle">
								{description}
							</p>
						</MotionWrapper>
					) : (
						<p className="text-sm text-subtitle">{description}</p>
					))}
				{children}
				<div className="flex flex-wrap gap-4 justify-center">
					{onAction && (
						<Button
							onClick={onAction}
							className="px-4 py-2 h-[54px]"
						>
							{actionText}
						</Button>
					)}
					{homeLink && (
						<Button asChild variant="secondary">
							<Link href={homeLink}>Go to Home</Link>
						</Button>
					)}
					{dashboardLink && (
						<Button asChild variant="outline">
							<Link href={dashboardLink}>Go to Dashboard</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	)

	if (!useMotion) {
		return content
	}
	return (
		<MotionWrapper
			initial="hidden"
			animate="visible"
			variants={{
				hidden: { opacity: 0, scale: 0.9, rotate: '3deg' },
				visible: {
					opacity: 1,
					scale: 1,
					rotate: 0,
					transition: {
						duration: 0.7,
						ease: [0.25, 0.8, 0.25, 1.4],
						staggerChildren: 0.12,
						delayChildren: 0.1
					}
				}
			}}
		>
			{content}
		</MotionWrapper>
	)
}
