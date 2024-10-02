import Flex from '@/components/atoms/Flex'
import { Suspense } from 'react'
import { Skeleton } from 'ui'
import { DistanceCalculator } from './_components/distance-calculator'
import { GeolocationFinder } from './_components/geolocation-finder'
import { InteractiveMapWrapper } from './_components/interactive-map.server'
import { ReverseSearch } from './_components/reverse-search'
import { UserInformation } from './_components/user-information'

export default function GeolocationPage() {
  return (
    <Flex dir="col" gap="4" className="p-6">
      <h1 className="text-3xl font-bold mb-6">Geolocation Dashboard</h1>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <InteractiveMapWrapper />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <GeolocationFinder />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <DistanceCalculator />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
        <ReverseSearch />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
        <UserInformation />
      </Suspense>
    </Flex>
  )
}
