import { getChatMessages } from '@/core/server/actions/chats'
import { db, messages } from 'db'
import { sql } from 'drizzle-orm'
import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from '../_components/favourite-btn'
import Pagination from '../_components/pagination'
import SearchBar from '../_components/search-bar'

export default async function ChatDetail({
	params,
	searchParams
}: {
	params: { id: string }
	searchParams: { page?: string; highlight?: string }
}) {
	const page = parseInt(searchParams.page || '1', 10)
	const pageSize = 30
	const chatMessages = await getChatMessages(params.id, page, pageSize)
	const totalMessagesResult = await db
		.select({ count: sql<number>`count(*)` })
		.from(messages)
		.where(sql`${messages.chatId} = ${params.id}`)
	const totalMessages = totalMessagesResult[0].count
	const totalPages = Math.ceil(totalMessages / pageSize)
	const highlightIndex = searchParams.highlight
		? parseInt(searchParams.highlight, 10)
		: -1

	return (
		<div className="flex flex-col h-screen bg-gray-900 text-white">
			<div className="bg-gray-800 text-white p-4 flex items-center">
				<Link href="/dashboard/chats" className="mr-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
				</Link>
				<h1 className="text-xl font-bold flex-grow">
					Chat with {params.id}
				</h1>
				<Link
					href="/dashboard/favorites"
					className="text-sm bg-green-700 hover:bg-green-600 px-3 py-1 rounded"
				>
					View Favorites
				</Link>
			</div>

			<SearchBar chatId={params.id} />

			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{chatMessages.map(message => (
					<div
						key={message.id}
						id={`message-${message.id}`}
						className={`flex ${message.name === 'Remco' ? 'justify-end' : 'justify-start'} ${message.id === highlightIndex ? 'bg-yellow-900' : ''}`}
					>
						<div
							className={`max-w-[70%] rounded-lg p-3 ${message.name === 'Remco' ? 'bg-green-800 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}
						>
							{message.name !== 'Remco' && (
								<p className="font-bold text-sm text-blue-300">
									{message.name}
								</p>
							)}
							<p className="break-words">{message.message}</p>
							{message.attachment && (
								<div className="mt-2">
									{message.attachment.endsWith('.mp4') ? (
										<video
											controls
											className="max-w-full h-auto rounded"
										>
											<source
												src={`/attachments/${message.attachment}`}
												type="video/mp4"
											/>
											Your browser does not support the
											video tag.
										</video>
									) : (
										<Image
											src={`/attachments/${message.attachment}`}
											alt="Attachment"
											width={200}
											height={200}
											className="max-w-full h-auto rounded"
										/>
									)}
								</div>
							)}
							<div className="flex justify-between items-center mt-2">
								<p className="text-xs text-gray-400">
									{new Date(
										message.timestamp
									).toLocaleTimeString([], {
										hour: '2-digit',
										minute: '2-digit'
									})}
								</p>
								<FavoriteButton
									messageId={message.id}
									chatId={params.id}
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			<Pagination
				currentPage={page}
				totalPages={totalPages}
				chatId={params.id}
			/>
		</div>
	)
}
