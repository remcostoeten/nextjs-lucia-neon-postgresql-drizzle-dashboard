export type DBResponse<T> =
	| { data: T; error: null }
	| { data: null; error: string }

export {
	createFileInDb,
	deleteFileFromDb,
	getFiles,
	updateFileInDb
} from './files'

export {
	createFolderInDb,
	deleteFolderFromDb,
	getFolders,
	updateFolderInDb
} from './folders'

export { createWorkspace, getWorkspaceBySlug, getWorkspaces } from './workspace'
