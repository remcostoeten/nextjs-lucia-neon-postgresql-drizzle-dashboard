import { Suspense } from 'react'
import { GeolocationFinder } from './_components/geolocation-finder'
import { DistanceCalculator } from './_components/distance-calculator'
import { ReverseSearch } from './_components/reverse-search'
import { UserInformation } from './_components/user-information'
import { Flex } from '@/components/atoms/Flex'
import { Skeleton } from 'ui/skeleton'

export default function GeolocationPage() {
  return (
    <Flex direction="column" gap="4" className="p-6">
      <h1 className="text-3xl font-bold mb-6">Geolocation Dashboard</h1>
      
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
