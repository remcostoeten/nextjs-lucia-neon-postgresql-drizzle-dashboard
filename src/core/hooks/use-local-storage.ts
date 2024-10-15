'use client'

import { useCallback, useEffect, useState } from 'react'
import { useEventCallback } from './_hook_helpers/use-event-callback'
import { useEventListener } from './_hook_helpers/use-event-listener'

import type { Dispatch, SetStateAction } from 'react'

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface WindowEventMap {
		'local-storage': CustomEvent
	}
}

type UseLocalStorageOptions<T> = {
	serializer?: (value: T) => string
	deserializer?: (value: string) => T
	initializeWithValue?: boolean
}

const IS_SERVER = typeof window === 'undefined'

export function useLocalStorage<T>(
	key: string,
	initialValue: T | (() => T),
	options: UseLocalStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>, () => void, () => void] {
	const { initializeWithValue = true } = options

	const serializer = useCallback<(value: T) => string>(
		value => {
			if (options.serializer) {
				return options.serializer(value)
			}

			return JSON.stringify(value)
		},
		[options]
	)

	const deserializer = useCallback<(value: string) => T>(
		value => {
			if (options.deserializer) {
				return options.deserializer(value)
			}
			// Support 'undefined' as a value
			if (value === 'undefined') {
				return undefined as unknown as T
			}

			const defaultValue =
				initialValue instanceof Function ? initialValue() : initialValue

			let parsed: unknown
			try {
				parsed = JSON.parse(value)
			} catch (_error) {
				return defaultValue // Return initialValue if parsing fails
			}

			return parsed as T
		},
		[options, initialValue]
	)

	// Get from local storage then
	// parse stored json or return initialValue
	const readValue = useCallback((): T => {
		const initialValueToUse =
			initialValue instanceof Function ? initialValue() : initialValue

		// Prevent build error "window is undefined" but keep working
		if (IS_SERVER) {
			return initialValueToUse
		}

		try {
			const raw = window.localStorage.getItem(key)
			return raw ? deserializer(raw) : initialValueToUse
		} catch (_error) {
			return initialValueToUse
		}
	}, [initialValue, key, deserializer])

	const [storedValue, setStoredValue] = useState(() => {
		if (initializeWithValue) {
			return readValue()
		}

		return initialValue instanceof Function ? initialValue() : initialValue
	})

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue: Dispatch<SetStateAction<T>> = useEventCallback(value => {
		// Prevent build error "window is undefined" but keeps working
		if (IS_SERVER) {
			//
		}

		try {
			// Allow value to be a function so we have the same API as useState
			const newValue =
				value instanceof Function ? value(readValue()) : value

			// Save to local storage
			window.localStorage.setItem(key, serializer(newValue))

			// Save state
			setStoredValue(newValue)

			// We dispatch a custom event so every similar useLocalStorage hook is notified
			window.dispatchEvent(new StorageEvent('local-storage', { key }))
		} catch (_error) {
			// A more advanced implementation would handle the error case
		}
	})

	const removeValue = useEventCallback(() => {
		// Prevent build error "window is undefined" but keeps working
		if (IS_SERVER) {
			//
		}

		const defaultValue =
			initialValue instanceof Function ? initialValue() : initialValue

		// Remove the key from local storage
		window.localStorage.removeItem(key)

		// Save state with default value
		setStoredValue(defaultValue)

		// We dispatch a custom event so every similar useLocalStorage hook is notified
		window.dispatchEvent(new StorageEvent('local-storage', { key }))
	})

	//!! To improve to not ignore the exhaustive-deps
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setStoredValue(readValue())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key])

	const handleStorageChange = useCallback(
		(event: StorageEvent | CustomEvent) => {
			if (
				(event as StorageEvent).key &&
				(event as StorageEvent).key !== key
			) {
				return
			}
			setStoredValue(readValue())
		},
		[key, readValue]
	)

	// this only works for other documents, not the current one
	useEventListener('storage', handleStorageChange)

	// this is a custom event, triggered in writeValueToLocalStorage
	// See: useLocalStorage()
	useEventListener('local-storage', handleStorageChange)

	const setDismissed = useEventCallback(() => {
		if (IS_SERVER) {
			return
		}

		try {
			const dismissedKey = `${key}_dismissed`
			window.localStorage.setItem(dismissedKey, 'true')
			window.dispatchEvent(new StorageEvent('local-storage', { key: dismissedKey }))
		} catch (_error) {
			// Handle error if needed
		}
	})

	const isDismissed = useCallback(() => {
		if (IS_SERVER) {
			return false
		}

		try {
			const dismissedKey = `${key}_dismissed`
			return window.localStorage.getItem(dismissedKey) === 'true'
		} catch (_error) {
			return false
		}
	}, [key])

	return [storedValue, setValue, removeValue, setDismissed]
}

// New helper hook for checking dismissed state
export function useDismissedState(key: string): [boolean, () => void] {
	const [isDismissed, setIsDismissed] = useState(() => {
		if (IS_SERVER) {
			return false
		}
		const dismissedKey = `${key}_dismissed`
		return window.localStorage.getItem(dismissedKey) === 'true'
	})

	const setDismissed = useEventCallback(() => {
		if (IS_SERVER) {
			return
		}

		const dismissedKey = `${key}_dismissed`
		window.localStorage.setItem(dismissedKey, 'true')
		setIsDismissed(true)
		window.dispatchEvent(new StorageEvent('local-storage', { key: dismissedKey }))
	})

	useEventListener('storage', (event: StorageEvent) => {
		if (event.key === `${key}_dismissed`) {
			setIsDismissed(event.newValue === 'true')
		}
	})

	return [isDismissed, setDismissed]
}
