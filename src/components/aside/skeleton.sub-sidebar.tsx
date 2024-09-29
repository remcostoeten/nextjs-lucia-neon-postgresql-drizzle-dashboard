import { Skeleton } from '@/components/ui/skeleton'

export default function SubSidebarSkeletonLoader() {
	return (
		<div className="fixed z-[1] left-[var(--sidebar-width)] top-[var(--header-height)] bottom-0 bg-body border-outline-right overflow-hidden border-outline-right w-sub-sidebar p-4">
			<Skeleton className="w-3/4 h-8 mb-6" />
			<div className="space-y-4">
				<Skeleton className="w-full h-10" />
				<Skeleton className="w-full h-10" />
				<Skeleton className="w-full h-10" />
			</div>
			<div className="mt-8 space-y-2">
				<Skeleton className="w-1/2 h-4" />
				<Skeleton className="w-full h-12" />
				<Skeleton className="w-full h-12" />
				<Skeleton className="w-full h-12" />
			</div>
			<div className="absolute bottom-4 left-4 right-4">
				<Skeleton className="w-full h-20" />
			</div>
		</div>
	)
}
