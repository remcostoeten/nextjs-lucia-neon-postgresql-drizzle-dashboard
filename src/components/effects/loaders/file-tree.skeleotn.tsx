import React from 'react'
import { Skeleton, SVGSkeleton } from './skeleton'

export default function FileTreeSkeleton() {
	return (
		<>
			<div>
				<div>
					<div className="flex w-full items-center gap-x-2 py-2 px-3 transition-colors">
						<div className="flex items-center justify-center">
							<SVGSkeleton className="lucide-chevron-right size-4 w-[24px] h-[24px]" />
						</div>
						<SVGSkeleton className="text-yellow-600 size-5 flex-shrink-0 w-[24px] h-[24px]" />
						<span>
							<Skeleton className="w-[55px] max-w-full" />
						</span>
						<div className="ml-auto flex items-center space-x-2">
							<div className="inline-flex items-center justify-center transition-colors hover:border hover:border-outline h-9 px-3">
								<SVGSkeleton className="w-[24px] h-[24px]" />
							</div>
							<div className="inline-flex items-center justify-center transition-colors hover:border hover:border-outline h-9 px-3">
								<SVGSkeleton className="w-[24px] h-[24px]" />
							</div>
							<div className="inline-flex items-center justify-center transition-colors hover:border hover:border-outline h-9 px-3">
								<SVGSkeleton className="w-[24px] h-[24px]" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
