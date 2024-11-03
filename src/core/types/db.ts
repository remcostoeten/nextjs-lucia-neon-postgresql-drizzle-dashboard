import type {
	accounts,
	collaborators,
	customers,
	files,
	folders,
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
export type Folder = typeof folders.$inferInsert
export type File = typeof files.$inferInsert
export type Account = typeof accounts.$inferInsert
export type Customer = typeof customers.$inferInsert
export type Product = typeof products.$inferInsert
export type Collaborator = typeof collaborators.$inferInsert
export type Price = typeof prices.$inferInsert & { products: Product[] }
export type Subscription = typeof subscriptions.$inferInsert
