'use client'

import { getFolders } from '@/lib/actions/folders'
import { FolderType } from '@/types/types.folder'
import { useEffect, useState } from 'react'

const FolderList: React.FC = () => {
	const [folders, setFolders] = useState<FolderType[]>([])

	useEffect(() => {
		const fetchFolders = async () => {
			const fetchedFolders = await getFolders()
			if (fetchedFolders?.folders) {
				setFolders(
					fetchedFolders.folders.map(folder => ({
						...folder,
						description: folder.description ?? null
					}))
				)
			}
		}

		fetchFolders()
	}, [])

	return (
		<div className="space-y-4">
			{folders.length > 0 ? (
				folders.map(folder => (
					<div key={folder.id} className="p-2 border rounded">
						{folder.name}
					</div>
				))
			) : (
				<p>No folders found</p>
			)}
		</div>
	)
}

export default FolderList
