export type DBResponse<T> =
	| { data: T; error: null }
	| { data: null; error: string }

export { createFile, deleteFileFromDb, getFiles, updateFileInDb } from './file'

export {
	createFolder,
	createFolderInDb,
	deleteFolderFromDb,
	getFolders,
	updateFolderInDb
} from './folder'

export { getUserSubscription } from './subscription'

export {
	createWorkspace,
	getCollaboratingWorkspaces,
	getPrivateWorkspaces,
	getSharedWorkspaces,
	getWorkspaceBySlug,
	getWorkspaces
} from './workspace'
