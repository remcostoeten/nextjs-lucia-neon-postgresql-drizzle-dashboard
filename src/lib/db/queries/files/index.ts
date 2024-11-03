export * from './create-file'
export * from './get-files'
export * from './delete-file-from-db'
export * from './update-file-from-db'

export type CreateFolderInput = {
	title: string
	iconId: string
	workspaceId: string
	data?: string | null
	bannerUrl?: string | null
}
