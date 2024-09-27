import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SiteSettings = {
	disableAllAnimations: boolean
	disableSidebarAnimations: boolean
	toggleAllAnimations: () => void
	toggleSidebarAnimations: () => void
}

export const useSiteSettingsStore = create<SiteSettings>()(
	persist(
		set => ({
			disableAllAnimations: false,
			disableSidebarAnimations: false,
			toggleAllAnimations: () =>
				set(state => {
					const newValue = !state.disableAllAnimations
					return {
						disableAllAnimations: newValue,
						disableSidebarAnimations: newValue
							? true
							: state.disableSidebarAnimations
					}
				}),
			toggleSidebarAnimations: () =>
				set(state => ({
					disableSidebarAnimations: !state.disableSidebarAnimations
				}))
		}),
		{
			name: 'site-settings-storage'
		}
	)
)
