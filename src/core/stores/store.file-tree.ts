'use client'

import { TreeItemType } from '@/types/tree-item.types'
import { create } from 'zustand'

type FileTreeState = {
	data: TreeItemType[]
	selectedItem: string | null
	breadcrumb: string[]
	setData: (data: TreeItemType[]) => void
	setSelectedItem: (id: string | null) => void
	setBreadcrumb: (path: string[]) => void
}

export const useFileTreeStore = create<FileTreeState>(set => ({
	data: [],
	selectedItem: null,
	breadcrumb: [],
	setData: data => set({ data }),
	setSelectedItem: id => set({ selectedItem: id }),
	setBreadcrumb: path => set({ breadcrumb: path })
}))

// Selectors
export const selectFileTreeData = (state: FileTreeState) => state.data
export const selectSelectedItem = (state: FileTreeState) => state.selectedItem
export const selectBreadcrumb = (state: FileTreeState) => state.breadcrumb

// Actions
export const fileTreeActions = {
	setData: (data: TreeItemType[]) =>
		useFileTreeStore.getState().setData(data),
	setSelectedItem: (id: string | null) =>
		useFileTreeStore.getState().setSelectedItem(id),
	setBreadcrumb: (path: string[]) =>
		useFileTreeStore.getState().setBreadcrumb(path)
}
