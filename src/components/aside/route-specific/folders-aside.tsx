'use client'

import { Button, Input } from 'ui'
import { getFolders } from '@/lib/actions/folders'
import { FolderType } from '@/types/types.folder'
import { Flex } from 'atoms'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Folder, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function FoldersAside() {
	const [folders, setFolders] = useState<FolderType[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [isExpanded, setIsExpanded] = useState(true)

	useEffect(() => {
		const fetchFolders = async () => {
			const fetchedFolders = await getFolders()
			if (fetchedFolders?.folders) {
				setFolders(fetchedFolders.folders)
			}
		}
		fetchFolders()
	}, [])

	const filteredFolders = folders.filter(
		folder =>
			folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			folder.description?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className="p-4">
			<Flex justify="between" align="center" className="mb-4">
				<Button
					variant="ghost"
					onClick={() => setIsExpanded(!isExpanded)}
					className="text-lg font-semibold"
				>
					<Folder className="mr-2" />
					Folders
					{isExpanded ? (
						<ChevronDown className="ml-2" />
					) : (
						<ChevronRight className="ml-2" />
					)}
				</Button>
				<span className="text-sm text-muted-foreground">
					{folders.length}
				</span>
			</Flex>

			{isExpanded && (
				<>
					<div className="relative mb-4">
						<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
						<Input
							type="text"
							placeholder="Search folders..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="pl-8"
						/>
					</div>

					<motion.ul className="space-y-2">
						{filteredFolders.map((folder, index) => (
							<motion.li
								key={folder.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="flex items-center justify-between p-2 rounded-md hover:bg-accent"
							>
								<Flex align="center">
									<Folder
										className="mr-2"
										style={{ color: folder.color }}
									/>
									<span>{folder.name}</span>
								</Flex>
								<span className="text-sm text-muted-foreground">
									0
								</span>
							</motion.li>
						))}
					</motion.ul>
				</>
			)}
		</div>
	)
}
