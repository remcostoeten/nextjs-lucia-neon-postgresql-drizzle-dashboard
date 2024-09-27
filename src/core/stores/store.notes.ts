import { create } from 'zustand'

interface NotesState {
	selectedFolderId: string | null
	setSelectedFolderId: (id: string | null) => void
}

export const useNotesStore = create<NotesState>(set => ({
	selectedFolderId: null,
	setSelectedFolderId: id => set({ selectedFolderId: id })
}))
