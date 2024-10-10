import { getUserAuth } from '@/lib/auth/utils'
import { UserProfile } from '@/types/types.users'
import { getUserProfile } from './get-user-profile'
import MyAccountForm from './my-account-form'

export default async function MyAccountPage() {
	const { session } = await getUserAuth()
	let userProfile: UserProfile = {}

	if (session?.user?.id) {
		userProfile = await getUserProfile(session.user.id)
	}

	return <MyAccountForm initialProfile={userProfile} />
}
