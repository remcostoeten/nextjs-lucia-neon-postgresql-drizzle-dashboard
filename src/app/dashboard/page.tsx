import IntroShortcutGuide from '@/components/dashboard/intro-guide'
import { getUserAuth } from 'session'

export default async function Home() {
	try {
		const { session } = await getUserAuth()
		console.log('Session:', session)

		if (!session) {
			console.log('Session is null or undefined')
			return <div>No active session</div>
		}

		return <IntroShortcutGuide user={session.user} />
	} catch (error) {
		console.error('Error in Home component:', error)
		return <div>Error loading profile</div>
	}
}
