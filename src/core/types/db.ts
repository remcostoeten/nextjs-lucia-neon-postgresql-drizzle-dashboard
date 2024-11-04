import type {
	accounts,
	collaborators,
	customers,
	prices,
	products,
	subscriptions,
	users
} from '@/lib/db/schema'

export type User = typeof users.$inferInsert
export type Workspace = {
	id: string
	title: string
	slug: string
	iconId: string
	workspaceOwnerId: string
	createdAt?: string
	updatedAt?: string
}
export type Folder = {
	id: string
	title: string
	iconId: string
	workspaceId: string
	inTrash?: boolean
}
export type CreateFolderInput = {
	title: string
	iconId: string
	workspaceId: string
}
export type File = {
	id: string
	title: string
	iconId: string
	folderId: string
	workspaceId: string
	inTrash?: boolean
}
export type CreateFileInput = {
	title: string
	iconId: string
	folderId: string
	workspaceId: string
}
export type Account = typeof accounts.$inferInsert
export type Customer = typeof customers.$inferInsert
export type Product = typeof products.$inferInsert
export type Collaborator = typeof collaborators.$inferInsert
export type Price = typeof prices.$inferInsert & { products: Product[] }
export type Subscription = typeof subscriptions.$inferInsert
