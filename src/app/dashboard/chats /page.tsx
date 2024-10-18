import { getChats } from '@/core/server/actions/chats'
import Link from 'next/link'

export default async function ChatOverview() {
	const chats = await getChats()

	return (
		<div className="p-4 max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Chat Overview</h1>
			<ul className="space-y-2">
				{chats.map(chatId => (
					<li
						key={chatId}
						className="border p-2 rounded hover:bg-gray-100"
					>
						<Link
							href={`/dashboard/chats/${chatId}`}
							className="block"
						>
							<p className="font-medium">{chatId}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
