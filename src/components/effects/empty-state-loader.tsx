import { Flex } from '@/components/atoms/Flex'
import { Button, Skeleton } from '@/components/ui'
import { LucideIcon } from 'lucide-react'

type ActionButton = {
	label: string
	onClick: () => void
	icon?: LucideIcon
}

type EmptyStateMessageProps = {
	message: string
	cardCount?: number
	animate?: boolean
	opacity?: number
	actions?: ActionButton[]
}

export default function EmptyStateMessage({
	message,
	cardCount = 8,
	animate = true,
	opacity = 50,
	actions = []
}: EmptyStateMessageProps) {
	return (
		<div className="relative overflow-hidden">
			<div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
				<p className="max-w-[40ch] text-center text-sm text-subtitle backdrop-blur-3xl backdrop-opacity-100 mb-4">
					{message}
				</p>
				{actions.length > 0 && (
					<div className="flex gap-2">
						{actions.map((action, index) => (
							<Button
								key={index}
								onClick={action.onClick}
								className="bg-zinc-100 hover:bg-zinc-200 text-neutral-900 font-bold py-2 px-4 rounded inline-flex items-center"
							>
								{action.icon && (
									<action.icon className="mr-2" size={16} />
								)}
								{action.label}
							</Button>
						))}
					</div>
				)}
			</div>
			<Flex className="overflow-hidden" gap="4">
				{Array.from({ length: cardCount }, (_, i) => (
					<SkeletonLoader
						key={i}
						opacity={opacity}
						animate={animate}
					/>
				))}
			</Flex>
		</div>
	)
}

function SkeletonLoader({
	animate = true,
	opacity = 100
}: {
	animate?: boolean
	opacity?: number
}) {
	return (
		<div
			className="shrink-0 basis-full lg:basis-[250px]"
			style={{ opacity: `${opacity}%` }}
		>
			<div className="flex flex-col gap-2 rounded-xl border bg-card p-6">
				<Skeleton noPulse={!animate} className="size-5" />
				<Skeleton noPulse={!animate} className="mt-2 h-6 w-full" />
				<Skeleton noPulse={!animate} className="mt-1 h-4 w-[50px]" />
			</div>
		</div>
	)
}
