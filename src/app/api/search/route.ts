import { searchMessages } from '@/core/server/actions/chats'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const query = searchParams.get('q')
	const chatId = searchParams.get('chatId')

	if (!query || !chatId) {
		return NextResponse.json(
			{ error: 'Query and chatId parameters are required' },
			{ status: 400 }
		)
	}

	const results = await searchMessages(chatId, query)

	return NextResponse.json(results)
}
;``
