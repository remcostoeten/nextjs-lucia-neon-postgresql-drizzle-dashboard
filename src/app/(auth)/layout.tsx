import { getUserAuth } from '@/lib/auth/utils'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
	children
}: {
	children: React.ReactNode
}) {
	const session = await getUserAuth()
	if (session?.session) redirect('/dashboard')

	return (
		<div className=" h-screen  w-screen place-items-center">{children}</div>
	)
}
