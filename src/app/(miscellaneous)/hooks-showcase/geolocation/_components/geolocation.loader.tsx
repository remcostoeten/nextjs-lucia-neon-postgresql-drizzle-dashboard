import { SVGSkeleton } from '@/components/effects/loaders/skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function GeolocationLoader() {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex items-center space-x-4 p-4 border">
					<div>
						<SVGSkeleton className="lucide-map-pin w-[24px] h-[24px]" />
					</div>
					<div>
						<p>
							<Skeleton className="w-[88px] max-w-full" />
						</p>
						<p>
							<Skeleton className="w-[99px] max-w-full" />
						</p>
					</div>
				</div>
				<div className="flex items-center space-x-4 p-4 border">
					<div>
						<SVGSkeleton className="lucide-map-pin w-[24px] h-[24px]" />
					</div>
					<div>
						<p>
							<Skeleton className="w-[99px] max-w-full" />
						</p>
						<p>
							<Skeleton className="w-[88px] max-w-full" />
						</p>
					</div>
				</div>
				<div className="flex items-center space-x-4 p-4 border">
					<div>
						<SVGSkeleton className="w-[24px] h-[24px]" />
					</div>
					<div>
						<p>
							<Skeleton className="w-[88px] max-w-full" />
						</p>
						<p>
							<Skeleton className="w-[121px] max-w-full" />
						</p>
					</div>
				</div>
				<div className="flex items-center space-x-4 p-4 border">
					<div>
						<SVGSkeleton className="lucide-map-pin w-[24px] h-[24px]" />
					</div>
					<div>
						<p>
							<Skeleton className="w-[88px] max-w-full" />
						</p>
						<p>
							<Skeleton className="w-[33px] max-w-full" />
						</p>
					</div>
				</div>
				<div className="flex items-center space-x-4 p-4 border">
					<div>
						<SVGSkeleton className="w-[24px] h-[24px]" />
					</div>
					<div>
						<p>
							<Skeleton className="w-[187px] max-w-full" />
						</p>
						<p>
							<Skeleton className="w-[33px] max-w-full" />
						</p>
					</div>
				</div>
				<div className="flex items-center space-x-4 p-4 border">
					<div>
						<SVGSkeleton className="w-[24px] h-[24px]" />
					</div>
					<div>
						<p>
							<Skeleton className="w-[77px] max-w-full" />
						</p>
						<p>
							<Skeleton className="w-[33px] max-w-full" />
						</p>
					</div>
				</div>
				<div className="flex items-center space-x-4 p-4 border">
					<div>
						<SVGSkeleton className="w-[1empx] h-[1empx]" />
					</div>
					<div>
						<p>
							<Skeleton className="w-[55px] max-w-full" />
						</p>
						<p>
							<Skeleton className="w-[33px] max-w-full" />
						</p>
					</div>
				</div>
				<div className="flex items-center space-x-4 p-4 border">
					<div>
						<SVGSkeleton className="w-[24px] h-[24px]" />
					</div>
					<div>
						<p>
							<Skeleton className="w-[99px] max-w-full" />
						</p>
						<p>
							<Skeleton className="w-[242px] max-w-full" />
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
