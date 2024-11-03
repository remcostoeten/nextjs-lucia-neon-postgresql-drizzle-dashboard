import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AppStateProvider } from '@/components/app-state-provider'
import { getCurrentUser } from '@/lib/auth'
import { getFiles, getFolders } from '@/lib/db/queries'
import ResizableLayout from '../components/resizable-layout'

type WorkspaceLayoutProps = React.PropsWithChildren<{
	params: { workspaceId: string }
}>

export default async function WorkspaceLayout(props: WorkspaceLayoutProps) {
	const params = await props.params

	const { workspaceId } = params

	const { children } = props

	const user = await getCurrentUser()

	if (!user) redirect('/login')

	const layout = (await cookies()).get('react-resizable-panels:layout')
	const collapsed = (await cookies()).get('react-resizable-panels:collapsed')

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined
	const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

	const [files, folders] = await Promise.all([
		getFiles(workspaceId),
		getFolders(workspaceId)
	])

	return (
		<AppStateProvider user={user} files={files!} folders={folders!}>
			<ResizableLayout
				defaultLayout={defaultLayout as number[]}
				defaultCollapsed={defaultCollapsed as boolean}
			>
				{children}
			</ResizableLayout>
		</AppStateProvider>
	)
}
