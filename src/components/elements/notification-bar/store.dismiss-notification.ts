'use client'

import { create } from 'zustand'

type DismissState = {
	isDismissed: boolean
	setIsDismissed: (value: boolean) => void
}

export const useDismissStore = create<DismissState>(set => ({
	isDismissed: false,
	setIsDismissed: value => set({ isDismissed: value })
}))
