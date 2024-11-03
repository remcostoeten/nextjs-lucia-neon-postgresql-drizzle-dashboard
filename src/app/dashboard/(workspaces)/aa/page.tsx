import Workspaces from '@/components/workspaces'
import { auth } from '@/lib/auth'
import {
	getCollaboratingWorkspaces,
	getPrivateWorkspaces,
	getSharedWorkspaces
} from '@/lib/db/queries'

export default async function DashboardPage() {
	const session = await auth()
	const userId = session?.user?.id

	if (!userId) {
		return <div>Please sign in to view workspaces</div>
	}

	const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
		await Promise.all([
			getPrivateWorkspaces(userId),
			getCollaboratingWorkspaces(userId),
			getSharedWorkspaces(userId)
		])

	const allWorkspaces = [
		...(privateWorkspaces || []),
		...(collaboratingWorkspaces || []),
		...(sharedWorkspaces || [])
	]

	return (
		<div>
			<Workspaces workspaces={allWorkspaces} />
		</div>
	)
}
