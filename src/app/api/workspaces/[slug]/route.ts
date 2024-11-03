import { db } from '@/lib/db'
import { workspaces } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		const workspace = await db.query.workspaces.findFirst({
			where: eq(workspaces.slug, params.slug)
		})

		if (!workspace) {
			return new NextResponse('Workspace not found', { status: 404 })
		}

		return NextResponse.json(workspace)
	} catch (error) {
		return new NextResponse('Internal Error', { status: 500 })
	}
}
