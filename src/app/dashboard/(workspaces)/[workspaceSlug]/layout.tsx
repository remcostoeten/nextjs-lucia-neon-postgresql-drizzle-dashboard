import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AppStateProvider } from '@/components/app-state-provider'
import { getCurrentUser } from '@/lib/auth'
import { getFiles, getFolders, getWorkspaceBySlug, getWorkspaces } from '@/lib/db/queries'
import ResizableLayout from '../components/resizable-layout'

type WorkspaceLayoutProps = React.PropsWithChildren<{
	params: { workspaceSlug: string }
}>

export default async function WorkspaceLayout({ children, params }: WorkspaceLayoutProps) {
	const { workspaceSlug } = params
	const user = await getCurrentUser()

	if (!user) redirect('/login')

	const layout = (await cookies()).get('react-resizable-panels:layout')
	const collapsed = (await cookies()).get('react-resizable-panels:collapsed')

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined
	const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

	const [workspace, files, folders, workspaces] = await Promise.all([
		getWorkspaceBySlug(workspaceSlug),
		getFiles(workspaceSlug),
		getFolders(workspaceSlug),
		getWorkspaces(user.id)
	])

	if (!workspace) redirect('/dashboard')

	return (
		<AppStateProvider 
			user={user} 
			files={files!} 
			folders={folders!}
			workspace={workspace}
			workspaces={workspaces}
		>
			<ResizableLayout
				defaultLayout={defaultLayout as number[]}
				defaultCollapsed={defaultCollapsed as boolean}
			>
				{children}
			</ResizableLayout>
		</AppStateProvider>
	)
}
