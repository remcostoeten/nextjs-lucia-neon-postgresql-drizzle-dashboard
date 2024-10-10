'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook to fetch and manage user information such as device type, location, timezone, last visited page, and operating system.
 *
 * This hook utilizes the useEffect hook to fetch user information on component mount and updates the state accordingly.
 *
 * @returns An object containing user information: device type, location, timezone, last visited page, and operating system.
 */
export const useUserInfo = () => {
	const [userInfo, setUserInfo] = useState({
		device: '',
		location: '',
		timezone: '',
		lastPage: '',
		os: ''
	})

	/**
	 * Effect hook to fetch user information.
	 *
	 * This effect hook fetches user information such as device type, location, timezone, last visited page, and operating system.
	 * It updates the userInfo state with the fetched information.
	 */
	useEffect(() => {
		const getUserInfo = async () => {
			const device = getDeviceType()
			const location = await getLocation()
			const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
			const lastPage = document.referrer
			const os = getOS()

			setUserInfo({ device, location, timezone, lastPage, os })
		}

		getUserInfo()
	}, [])

	/**
	 * Function to determine the device type based on the user agent.
	 *
	 * This function checks the user agent string to determine if the user is accessing the site from a desktop, tablet, or mobile device.
	 *
	 * @returns The type of device the user is accessing from.
	 */
	const getDeviceType = () => {
		const ua = navigator.userAgent
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			return 'tablet'
		}
		if (
			/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
				ua
			)
		) {
			return 'mobile'
		}
		return 'desktop'
	}

	/**
	 * Function to fetch the user's location.
	 *
	 * This function makes an API call to fetch the user's location based on their IP address.
	 *
	 * @returns A string representing the user's location.
	 */
	const getLocation = async () => {
		try {
			const response = await fetch('https://ipapi.co/json/')
			const data = await response.json()
			return `${data.city}, ${data.country_name}`
		} catch (error) {
			console.error('Error fetching location:', error)
			return 'unknown'
		}
	}

	/**
	 * Function to determine the user's operating system.
	 *
	 * This function checks the user agent string and the platform to determine the user's operating system.
	 *
	 * @returns A string representing the user's operating system.
	 */
	const getOS = () => {
		const userAgent = window.navigator.userAgent,
			platform = window.navigator.platform,
			macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
			windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
			iosPlatforms = ['iPhone', 'iPad', 'iPod']

		if (macosPlatforms.indexOf(platform) !== -1) {
			return 'Mac OS'
		} else if (iosPlatforms.indexOf(platform) !== -1) {
			return 'iOS'
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			return 'Windows'
		} else if (/Android/.test(userAgent)) {
			return 'Android'
		} else if (/Linux/.test(platform)) {
			return 'Linux'
		}

		return 'unknown'
	}

	return userInfo
}
