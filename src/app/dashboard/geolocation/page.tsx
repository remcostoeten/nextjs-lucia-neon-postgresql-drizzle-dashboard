import Flex from '@/components/atoms/Flex'
import GeolocationLoader from '@/components/effects/loaders/geolocation.loaders'
import AnimatedSpinner from '@/components/ui/spinner'
import { Suspense } from 'react'
import { DistanceCalculator } from './_components/distance-calculator'
import { GeolocationFinder } from './_components/geolocation-finder'
import { InteractiveMapWrapper } from './_components/interactive-map.server'
import { ReverseSearch } from './_components/reverse-search'
import { UserInformation } from './_components/user-information'

export default function GeolocationPage() {
  return (
    <Flex dir="col" gap="4" className="p-6">
      <h1 className="text-3xl font-bold mb-6">Geolocation Dashboard</h1>

      <Suspense fallback={<GeolocationLoader />}>
        <InteractiveMapWrapper />
      </Suspense>

      <Suspense fallback={<GeolocationLoader />}>
        <GeolocationFinder />
      </Suspense>

      <Suspense fallback={<AnimatedSpinner />}>
        <DistanceCalculator />
      </Suspense>

      <Suspense fallback={<AnimatedSpinner />}>
        <ReverseSearch />
      </Suspense>

      <Suspense fallback={<AnimatedSpinner />}>
        <UserInformation />
      </Suspense>
    </Flex>
  )
}
