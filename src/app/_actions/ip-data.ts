'use server'

import { CACHE_TTL, redis } from '@/lib/redis'
import type { IpApiResponse } from '@/lib/types/user'

export async function getIpData(userId: string): Promise<IpApiResponse | null> {
	try {
		const cacheKey = `ip-data-${userId}`

		// Try to get cached data
		const cachedData = await redis.get(cacheKey)
		if (cachedData) {
			return cachedData as IpApiResponse
		}

		// Fetch new data
		const res = await fetch('https://ipapi.co/json/')
		const data = (await res.json()) as IpApiResponse

		// Cache the new data
		await redis.set(cacheKey, data, {
			ex: CACHE_TTL
		})

		return data
	} catch (error) {
		console.error('Error in getIpData:', error)
		return null
	}
}
