import { create } from 'zustand'

type ToastType = 'error' | 'success' | 'info' | 'warning'

interface ToastState {
	message: string
	type: ToastType
	isVisible: boolean
	showToast: (message: string, type: ToastType) => void
	hideToast: () => void
}

export const useToastStore = create<ToastState>(set => ({
	message: '',
	type: 'info',
	isVisible: false,
	showToast: (message: string, type: ToastType) => {
		set({ message, type, isVisible: true })
		setTimeout(() => {
			set({ isVisible: false })
		}, 5000)
	},
	hideToast: () => set({ isVisible: false })
}))
