'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { addFavorite, removeFavorite } from '@/core/server/actions/chats'
export default function FavoriteButton({
	messageId,
	chatId
}: {
	messageId: number
	chatId: string
}) {
	const [isFavorite, setIsFavorite] = useState(false)
	const userId = 'user123' // In een echte applicatie zou je dit dynamisch ophalen

	useEffect(() => {
		// Check if the message is favorited
		// This would typically involve a database query
		// For now, we'll use localStorage as a simple example
		const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')
		setIsFavorite(!!favorites[messageId])
	}, [messageId])

	const toggleFavorite = async () => {
		try {
			if (isFavorite) {
				await removeFavorite(userId, messageId)
			} else {
				await addFavorite(userId, messageId)
			}
			setIsFavorite(!isFavorite)

			// Update localStorage
			const favorites = JSON.parse(
				localStorage.getItem('favorites') || '{}'
			)
			if (isFavorite) {
				delete favorites[messageId]
			} else {
				favorites[messageId] = { chatId, messageId }
			}
			localStorage.setItem('favorites', JSON.stringify(favorites))
		} catch (error) {
			console.error('Error toggling favorite:', error)
		}
	}

	return (
		<button onClick={toggleFavorite} className="focus:outline-none">
			<Star
				className={`h-5 w-5 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
			/>
		</button>
	)
}
