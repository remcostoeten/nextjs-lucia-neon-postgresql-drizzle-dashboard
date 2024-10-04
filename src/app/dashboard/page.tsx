import IntroShortcutGuide from '@/components/dashboard/intro-guide'
import { getUserAuth } from '@/lib/auth/utils'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
	const { session } = await getUserAuth()

	if (!session) {
		redirect('/sign-in')
	}

	return <IntroShortcutGuide user={session.user} />
}
