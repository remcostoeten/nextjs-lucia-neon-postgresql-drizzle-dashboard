'use client'

import { create } from 'zustand'

import { useDismissedState } from '@/core/hooks/use-local-storage'

type DismissState = {
	isDismissed: boolean
	setIsDismissed: () => void
}

// Create a constant for the storage key
export const NOTIFICATION_STORAGE_KEY = 'notification_dismissed'

export const useDismissStore = create<DismissState>((set) => {
	const [isDismissed, setDismissed] = useDismissedState(
		NOTIFICATION_STORAGE_KEY
	)

	return {
		isDismissed,
		setIsDismissed: setDismissed
	}
})
