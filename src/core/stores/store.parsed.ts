import { create } from 'zustand'

type ParsedOutput = {
	id: string
	content: string
	createdAt: Date
}

interface NotesState {
	selectedFolderId: string | null
	setSelectedFolderId: (id: string | null) => void
	parsedOutputs: ParsedOutput[]
	addParsedOutput: (content: string) => void
	removeParsedOutput: (id: string) => void
}

export const useNotesStore = create<NotesState>(set => ({
	selectedFolderId: null,
	setSelectedFolderId: id => set({ selectedFolderId: id }),
	parsedOutputs: [],
	addParsedOutput: content =>
		set(state => ({
			parsedOutputs: [
				...state.parsedOutputs,
				{
					id: Date.now().toString(),
					content,
					createdAt: new Date()
				}
			]
		})),
	removeParsedOutput: id =>
		set(state => ({
			parsedOutputs: state.parsedOutputs.filter(
				output => output.id !== id
			)
		}))
}))
