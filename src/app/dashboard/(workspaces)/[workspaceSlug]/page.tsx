import Workspaces from '@/components/workspaces'
import { auth } from '@/lib/auth'
import { getWorkspaces } from '@/lib/db/queries'

export default async function DashboardPage() {
	const session = await auth()
	const userId = session?.user?.id

	if (!userId) {
		return <div>Please sign in to view workspaces</div>
	}

	const workspaces = await getWorkspaces(userId)

	return (
		<div>
			<Workspaces workspaces={workspaces} />
		</div>
	)
}
