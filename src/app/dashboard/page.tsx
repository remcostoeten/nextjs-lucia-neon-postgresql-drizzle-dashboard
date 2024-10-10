import OnboardingTrigger from '@/components/dashboard/onboarding-trigger'
import IntroShortcutGuide from '@/components/dashboard/intro-guide'
import { getUserAuth } from '@/lib/auth/utils'
import { db } from '@/lib/db/index'
import { userProfiles } from '@/lib/db/schema/auth'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
	const { session } = await getUserAuth()

	if (!session) {
		redirect('/sign-in')
	}

	const userProfile = await db.query.userProfiles.findFirst({
		where: eq(userProfiles.userId, session.user.id)
	})

	const hasCompletedOnboarding = !!userProfile

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-4">
				Welcome to your Dashboard
			</h1>
			<OnboardingTrigger
				userId={session.user.id}
				hasCompletedOnboarding={hasCompletedOnboarding}
			/>{' '}
			<IntroShortcutGuide user={session.user} />
			{/* Rest of your dashboard content */}
		</div>
	)
}
