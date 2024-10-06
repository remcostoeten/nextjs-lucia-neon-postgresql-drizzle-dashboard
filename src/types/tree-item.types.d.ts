export type TreeItemType = {
	id: string
	name: string
	type: 'folder' | 'file'
	children?: TreeItemType[]
}
