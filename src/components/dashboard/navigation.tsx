import { getUserAuth } from '@/lib/auth/utils'
import NavigationClient from './navigation.client'

export default async function Navigation() {
	const { session } = await getUserAuth()

	if (!session) {
		return null
	}

	return <NavigationClient userEmail={session.user.email || ''} />
}
