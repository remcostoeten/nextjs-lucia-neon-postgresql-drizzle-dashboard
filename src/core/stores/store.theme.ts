import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'default' | 'avocadoAlien' | 'rainbowCandy' | 'honeydewPunch'

type ThemeStore = {
	currentTheme: Theme
	setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		set => ({
			currentTheme: 'default',
			setTheme: theme => set({ currentTheme: theme })
		}),
		{
			name: 'theme-storage'
		}
	)
)
