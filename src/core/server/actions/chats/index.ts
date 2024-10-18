import { db, favorites, messages } from 'db'
import { eq, sql } from 'drizzle-orm'

export async function getChats() {
	const chats = await db
		.select({ chatId: messages.chatId })
		.from(messages)
		.groupBy(messages.chatId)
	return chats.map(chat => chat.chatId)
}

export async function getChatMessages(
	chatId: string,
	page: number,
	pageSize: number
) {
	const offset = (page - 1) * pageSize
	return db
		.select()
		.from(messages)
		.where(eq(messages.chatId, chatId))
		.limit(pageSize)
		.offset(offset)
}

export async function searchMessages(chatId: string, query: string) {
	return db
		.select()
		.from(messages)
		.where(eq(messages.chatId, chatId))
		.where(sql`${messages.message} ILIKE ${`%${query}%`}`)
}

export async function getFavorites(userId: string) {
	return db
		.select({
			id: messages.id,
			chatId: messages.chatId,
			name: messages.name,
			message: messages.message,
			timestamp: messages.timestamp,
			attachment: messages.attachment
		})
		.from(favorites)
		.innerJoin(messages, eq(favorites.messageId, messages.id))
		.where(eq(favorites.userId, userId))
}

export async function addFavorite(userId: string, messageId: number) {
	return db.insert(favorites).values({ userId, messageId })
}

export async function removeFavorite(userId: string, messageId: number) {
	return db
		.delete(favorites)
		.where(eq(favorites.userId, userId))
		.where(eq(favorites.messageId, messageId))
}
