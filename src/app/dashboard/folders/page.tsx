import { validateRequest } from '@/lib/auth/lucia'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import FileTree from './_components/file-tree'

export default async function FoldersPage() {
	const cookieStore = cookies()
	const { user } = await validateRequest(cookieStore)

	if (!user) {
		redirect('/sign-in')
	}

	return (
		<div className="w-full max-w-3xl">
			<h1 className="text-2xl font-bold mb-4 text-gray-100">
				File Explorer
			</h1>
			<FileTree />
		</div>
	)
}
