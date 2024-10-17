import { cn } from 'cn'

function Skeleton({
	className,
	noPulse = false,
	...props
}: React.HTMLAttributes<HTMLDivElement> & { noPulse?: boolean }) {
	return (
		<div
			className={cn(
				'animate-pulse rounded-md bg-black',
				noPulse && 'animate-none',
				className
			)}
			{...props}
		/>
	)
}

export { Skeleton }
