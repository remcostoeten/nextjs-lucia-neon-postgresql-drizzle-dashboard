'use client'

import type { AppState } from '@/core/hooks/use-app-state'
import { AppStateContext, setStore, store } from '@/core/hooks/use-app-state'
import React from 'react'

type AppStateProviderProps = React.PropsWithChildren<AppState>

export function AppStateProvider({
	workspace,
	workspaces = [],
	...props
}: AppStateProviderProps) {
	setStore({ ...props, workspace, workspaces })

	return (
		<AppStateContext.Provider value={store}>
			{props.children}
		</AppStateContext.Provider>
	)
}
