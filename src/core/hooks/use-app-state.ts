'use client'

import React from 'react'
import { proxy, useSnapshot } from 'valtio'

import type { File, Folder, Workspace } from '@/core/types/db'
import type { User } from 'next-auth'

export type AppState = {
	user: User | null
	files: File[]
	folders: Folder[]
	workspaces: Workspace[]
	workspace: {
		title: string
		slug: string
		iconId: string
	} | null
}

export type AppAction = {
	addFile: (file: File) => void
	updateFile: (file: File) => void
	deleteFile: (fileId: string) => void

	addFolder: (folder: Folder) => void
	updateFolder: (folder: Folder) => void
	deleteFolder: (folderId: string) => void
}

export const store = proxy<AppState & AppAction>({
	user: null,
	files: [],
	folders: [],
	workspaces: [],
	workspace: null,

	addFile(file) {
		store.files.push(file)
	},
	updateFile(file) {
		store.files = store.files.map((f) => (f.id === file.id ? file : f))
	},
	deleteFile(id) {
		store.files = store.files.filter((f) => f.id !== id)
	},

	addFolder(folder) {
		store.folders.push(folder)
	},
	updateFolder(folder: Folder) {
		store.folders = store.folders.map((f) =>
			f.id === folder.id ? folder : f
		)
	},
	deleteFolder(id) {
		store.folders = store.folders.filter((f) => f.id !== id)
	}
})

export function setStore(newState: AppState) {
	store.user = newState.user
	store.files = newState.files
	store.folders = newState.folders
	store.workspace = newState.workspace
	store.workspaces = newState.workspaces
}

export type Store = typeof store

export const AppStateContext = React.createContext<Store | null>(null)

export function useAppState() {
	if (!AppStateContext)
		throw new Error('Cannot use `useAppState` outside of a `StoreProvider`')

	return useSnapshot(React.useContext(AppStateContext)!)
}
