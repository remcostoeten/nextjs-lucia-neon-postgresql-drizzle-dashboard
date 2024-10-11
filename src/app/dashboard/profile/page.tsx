import UnifiedSettingsComponent from '@/components/aside/site-settings-menu'
import { getUserAuth } from '@/lib/auth/utils'
import { UserProfile } from '@/types/types.users'
import { getUserProfile } from './get-user-profile'

export default async function MyAccountPage() {
	const { session } = await getUserAuth()
	let userProfile: UserProfile = {}

	if (session?.user?.id) {
		userProfile = await getUserProfile(session.user.id)
	}

	return (
		<UnifiedSettingsComponent variant="page" initialProfile={userProfile} />
	)
}
