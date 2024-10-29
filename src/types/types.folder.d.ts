export type FolderType = {
	id: string
	name: string
	description: string | null
	color: string
	children?: FolderType[]
	parentId?: string | null
}
