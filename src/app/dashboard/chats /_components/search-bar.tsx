'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type SearchResult = {
	index: number
	message: string
	timestamp: string
}

export default function SearchBar({ chatId }: { chatId: string }) {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<SearchResult[]>([])
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const router = useRouter()

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault()
		const response = await fetch(
			`/api/search?chatId=${chatId}&q=${encodeURIComponent(query)}`
		)
		const searchResults = await response.json()
		setResults(searchResults)
		setIsSearchOpen(true)
	}

	const jumpToMessage = (index: number) => {
		const page = Math.floor(index / 30) + 1
		router.push(
			`/dashboard/chats/${chatId}?page=${page}&highlight=${index}`
		)
		setIsSearchOpen(false)
	}

	const closeSearch = () => {
		setIsSearchOpen(false)
		setResults([])
		setQuery('')
	}

	return (
		<div className="bg-gray-800 p-4">
			<form onSubmit={handleSearch} className="mb-4">
				<input
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder="Search messages..."
					className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
				/>
			</form>
			{isSearchOpen && results.length > 0 && (
				<div className="relative">
					<div className="absolute top-0 right-0 p-2">
						<button
							onClick={closeSearch}
							className="text-gray-400 hover:text-white"
						>
							Close
						</button>
					</div>
					<div className="max-h-60 overflow-y-auto bg-gray-700 rounded p-2 mt-2">
						{results.map((result, index) => (
							<div
								key={index}
								className="cursor-pointer hover:bg-gray-600 p-2 rounded"
								onClick={() => jumpToMessage(result.index)}
							>
								<p className="text-sm">{result.message}</p>
								<p className="text-xs text-gray-400">
									{new Date(
										result.timestamp
									).toLocaleString()}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
