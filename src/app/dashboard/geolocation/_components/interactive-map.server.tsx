'use client'

import dynamic from 'next/dynamic'

const InteractiveMapWithNoSSR = dynamic(
	() => import('./interactive-map').then(mod => mod.InteractiveMap),
	{ ssr: false }
)

export function InteractiveMapWrapper() {
	return <InteractiveMapWithNoSSR />
}
