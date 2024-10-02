'use server'

import { headers } from 'next/headers'
import { cache } from 'react'

const IP_GEOLOCATION_API_KEY = process.env.IP_GEOLOCATION_API_KEY

if (!IP_GEOLOCATION_API_KEY) {
    throw new Error('IP_GEOLOCATION_API_KEY is not set in environment variables')
}

type UserInfo = {
    location: {
        address: string
        city: string
        country: string
        coordinates: [number, number]
    }
    device: {
        name: string
        type: string
        browser: string
        os: string
    }
    currentTime: string
}

async function getIPGeolocation(ip: string): Promise<any> {
    const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${IP_GEOLOCATION_API_KEY}&ip=${ip}`)
    if (!response.ok) {
        throw new Error(`Failed to fetch IP geolocation data: ${response.statusText}`)
    }
    return response.json()
}

export const getUserInfo = cache(async (): Promise<UserInfo> => {
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'Unknown'

    try {
        const geoData = await getIPGeolocation(ip)

        return {
            location: {
                address: geoData.city || 'Unknown',
                city: geoData.city || 'Unknown',
                country: geoData.country_name || 'Unknown',
                coordinates: [
                    parseFloat(geoData.latitude) || 0,
                    parseFloat(geoData.longitude) || 0
                ],
            },
            device: {
                name: 'Server-side rendering',
                type: 'Server-side rendering',
                browser: 'Server-side rendering',
                os: 'Server-side rendering',
            },
            currentTime: new Date().toLocaleString('en-US', { timeZone: geoData.time_zone?.name || 'UTC' }),
        }
    } catch (error) {
        console.error('Error fetching user info:', error)
        throw new Error('Failed to fetch user information')
    }
})
