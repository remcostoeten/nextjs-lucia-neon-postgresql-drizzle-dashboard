import { getCurrentUser } from '@/lib/auth'
import { getWorkspaces } from '@/lib/db/queries'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const user = await getCurrentUser()

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const workspaces = await getWorkspaces(user.id)
		return NextResponse.json(workspaces)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch workspaces' },
			{ status: 500 }
		)
	}
}
