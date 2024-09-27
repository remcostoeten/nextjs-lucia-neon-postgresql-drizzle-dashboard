import { create } from 'zustand'

type MainSidebarStore = {
	isCollapsed: boolean
	toggleCollapse: () => void
}

export const useMainSidebarStore = create<MainSidebarStore>(set => ({
	isCollapsed: false,
	toggleCollapse: () => set(state => ({ isCollapsed: !state.isCollapsed }))
}))
