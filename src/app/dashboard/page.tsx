import { getCurrentUser } from '@/lib/auth'
import { getWorkspaces } from '@/lib/db/queries'
import { redirect } from 'next/navigation'

export const metadata = {
	title: 'Dashboard',
	description: 'Your workspaces'
}

export default async function DashboardPage() {
	const user = await getCurrentUser()

	if (!user) {
		redirect('/login')
	}

	const workspaces = await getWorkspaces(user.id)
	const firstWorkspace = workspaces?.[0]

	if (!firstWorkspace) {
		redirect('/dashboard/new-workspace')
	}

	redirect(`/dashboard/${firstWorkspace.slug}`)
}
