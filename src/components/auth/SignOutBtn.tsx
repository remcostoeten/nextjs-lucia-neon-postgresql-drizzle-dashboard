import { signOutAction } from '@/lib/actions/users'
import { getUserAuth } from '@/lib/auth/utils'
import { redirect } from 'next/navigation'
import { Button } from '../ui/button'

export default async function SignOutBtn() {
	const { session } = await getUserAuth()

	if (!session) {
		redirect('/sign-in')
	}

	return (
		<form onSubmit={signOutAction} className="w-full text-left">
			<Button type="submit" variant={'destructive'}>
				Sign out
			</Button>
		</form>
	)
}
