'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook to manage and provide access to development mode features.
 *
 * This hook provides a way to toggle development mode, log, warn, and error messages,
 * as well as measure the execution time of specific code blocks. It utilizes the
 * `useEffect` hook to initialize the development mode state based on environment
 * variables and local storage.
 *
 * @returns An object containing the development mode state, toggle function, and
 * logging, warning, error, and timing functions.
 */
export type DevModeProps = {
	enabled: boolean
	toggle: () => void
	log: (...args: any[]) => void
	warn: (...args: any[]) => void
	error: (...args: any[]) => void
	time: (label: string) => void
	timeEnd: (label: string) => void
}

export default function useDevMode(): DevModeProps {
	const [enabled, setEnabled] = useState(false)
	const timers = useRef<Record<string, number>>({})

	useEffect(() => {
		const isDev = process.env.NODE_ENV === 'development'
		const isDevModeEnabled =
			process.env.NEXT_PUBLIC_ENABLE_DEV_MODE === 'true'
		setEnabled(
			isDev &&
				isDevModeEnabled &&
				localStorage.getItem('devMode') === 'true'
		)
	}, [])

	/**
	 * Toggles the development mode state and updates local storage accordingly.
	 */
	const toggle = () => {
		const newState = !enabled
		setEnabled(newState)
		localStorage.setItem('devMode', newState.toString())
	}

	/**
	 * Logs a message to the console if development mode is enabled.
	 *
	 * @param args - The message or messages to log.
	 */
	const log = (...args: any[]) => {
		if (enabled) {
			console.log('[DevMode]', ...args)
		}
	}

	/**
	 * Warns a message to the console if development mode is enabled.
	 *
	 * @param args - The message or messages to warn.
	 */
	const warn = (...args: any[]) => {
		if (enabled) {
			console.warn('[DevMode]', ...args)
		}
	}

	/**
	 * Errors a message to the console if development mode is enabled.
	 *
	 * @param args - The message or messages to error.
	 */
	const error = (...args: any[]) => {
		if (enabled) {
			console.error('[DevMode]', ...args)
		}
	}

	/**
	 * Starts a timer for a given label if development mode is enabled.
	 *
	 * @param label - The label for the timer.
	 */
	const time = (label: string) => {
		if (enabled) {
			timers.current[label] = performance.now()
		}
	}

	/**
	 * Ends a timer for a given label, logs the duration, and removes the timer if development mode is enabled.
	 *
	 * @param label - The label for the timer.
	 */
	const timeEnd = (label: string) => {
		if (enabled && timers.current[label]) {
			const duration = performance.now() - timers.current[label]
			console.log(`[DevMode] ${label}: ${duration.toFixed(2)}ms`)
			delete timers.current[label]
		}
	}

	return { enabled, toggle, log, warn, error, time, timeEnd }
}
