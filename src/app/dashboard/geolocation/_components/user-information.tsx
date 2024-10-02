'use client'

import {Button,Input, Label, Card, CardContent, CardHeader, CardTitle } from 'ui'
import { getUserInfo } from '@/core/server/actions/geolocation/get-ip-geolocation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

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

export function UserInformation() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [batteryStatus, setBatteryStatus] = useState<string>('Unknown')
    const [screenDimensions, setScreenDimensions] = useState<string>('Unknown')

    useEffect(() => {
        // Get screen dimensions
        setScreenDimensions(`${window.innerWidth}x${window.innerHeight}`)

        // Get battery status
        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((battery: any) => {
                updateBatteryStatus(battery)
                battery.addEventListener('levelchange', () => updateBatteryStatus(battery))
                battery.addEventListener('chargingchange', () => updateBatteryStatus(battery))
            })
        }

        function updateBatteryStatus(battery: any) {
            const level = Math.round(battery.level * 100)
            const charging = battery.charging ? 'Charging' : 'Not charging'
            setBatteryStatus(`${level}% (${charging})`)
        }
    }, [])

    async function handleViewLocation() {
        setIsLoading(true)
        setError(null)
        try {
            const result = await getUserInfo()
            setUserInfo({
                ...result,
                device: {
                    name: navigator.userAgent,
                    type: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
                    browser: getBrowserInfo(),
                    os: getOSInfo(),
                },
            })
        } catch (error) {
            console.error('Error fetching user information:', error)
            setError('Failed to fetch user information. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    function getBrowserInfo() {
        const ua = navigator.userAgent
        let browserName = "Unknown"
        if (ua.match(/chrome|chromium|crios/i)) browserName = "Chrome"
        else if (ua.match(/firefox|fxios/i)) browserName = "Firefox"
        else if (ua.match(/safari/i)) browserName = "Safari"
        else if (ua.match(/opr\//i)) browserName = "Opera"
        else if (ua.match(/edg/i)) browserName = "Edge"
        return browserName
    }

    function getOSInfo() {
        const ua = navigator.userAgent
        if (ua.indexOf("Win") != -1) return "Windows"
        if (ua.indexOf("Mac") != -1) return "MacOS"
        if (ua.indexOf("Linux") != -1) return "Linux"
        if (ua.indexOf("Android") != -1) return "Android"
        if (ua.indexOf("like Mac") != -1) return "iOS"
        return "Unknown"
    }

    return (
        <Card className="w-full bg-black text-white">
            <CardHeader>
                <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={handleViewLocation} disabled={isLoading} className="w-full mb-4">
                    {isLoading ? 'Loading...' : 'View My Location'}
                </Button>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {userInfo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-lg font-semibold mb-2">Location</h3>
                        <p>Address: {userInfo.location.address}</p>
                        <p>City: {userInfo.location.city}</p>
                        <p>Country: {userInfo.location.country}</p>
                        <p>Coordinates: {userInfo.location.coordinates.join(', ')}</p>

                        <h3 className="text-lg font-semibold mt-4 mb-2">Device Information</h3>
                        <p>Device: {userInfo.device.name}</p>
                        <p>Type: {userInfo.device.type}</p>
                        <p>Browser: {userInfo.device.browser}</p>
                        <p>OS: {userInfo.device.os}</p>
                        <p>Battery Status: {batteryStatus}</p>
                        <p>Screen Dimensions: {screenDimensions}</p>

                        <p className="mt-4">Current Time: {userInfo.currentTime}</p>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    )
}
