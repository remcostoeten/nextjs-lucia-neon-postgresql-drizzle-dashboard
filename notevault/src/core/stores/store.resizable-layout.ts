import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type LayoutStore = {
  layout: number[]
  isCollapsed: boolean
  setLayout: (sizes: number[]) => void
  setCollapsed: (collapsed: boolean) => void
}

type LayoutState = Pick<LayoutStore, 'layout' | 'isCollapsed'>

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      layout: [16, 84],
      isCollapsed: false,
      setLayout: (sizes) => set({ layout: sizes }),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
    }),
    {
      name: 'layout-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({ 
        layout: state.layout,
        isCollapsed: state.isCollapsed 
      }),
      migrate: (persistedState: any, version): LayoutState => {
        if (version === 0) {
          // Handle migration from version 0 if needed
          return {
            layout: [16, 84],
            isCollapsed: false,
          }
        }
        return persistedState as LayoutState
      },
    }
  )
)
