import RecentActivities from '@/components/dashboard/features/activity/recent-activities'
import OnboardingNotice from '@/components/effects/onboarding-trigger'
import { validateRequest } from '@/lib/auth/lucia'

function getGreeting(hour: number): string {
	if (hour < 12) return 'Good morning'
	if (hour < 18) return 'Good afternoon'
	return 'Good evening'
}

export default async function Dashboard() {
	const { user } = await validateRequest()

	if (!user) {
		return <div>Please sign in to access the dashboard.</div>
	}

	const displayName = user.name || user.email || 'Guest'
	const currentHour = new Date().getHours()
	const greeting = getGreeting(currentHour)

	return (
		<section className="max-w-[1400px] w-[1400px] max-md:pl-5 max-md:max-w-full">
			<div className="flex gap-5 max-md:flex-col">
				<div className="flex flex-col w-4/5 max-md:ml-0 max-md:w-full">
					<div className="flex flex-col grow items-start mt-2 max-md:mt-10 max-md:max-w-full">
						<OnboardingNotice
							userId={user.id}
							hasCompletedOnboarding={false}
						>
							Finished the onboarding? Click here to dismiss this
							notice
						</OnboardingNotice>

						<h1 className="text-5xl font-semibold text-title leading-[55px] max-md:max-w-full max-md:text-4xl">
							{greeting}, {displayName}!
						</h1>
						<RecentActivities />
					</div>
				</div>
			</div>
		</section>
	)
}
// import SignOutBtn from '@/components/auth/sign-out-button'
// import IntroShortcutGuide from '@/components/dashboard/intro-guide'
// import OnboardingTrigger from '@/components/dashboard/onboarding-trigger'
// import { getUserAuth } from '@/lib/auth/utils'
// import { db } from '@/lib/db/index'
// import { userProfiles } from '@/lib/db/schema/auth'
// import { eq } from 'drizzle-orm'
// import React from 'react'

// export default async function DashboardPage() {
// 	const { session } = await getUserAuth()

// 	if (!session) {
// 		return <div>Please sign in to access the dashboard.</div>
// 	}

// 	const userProfile = await db.query.userProfiles.findFirst({
// 		where: eq(userProfiles.userId, session.user.id)
// 	})

// 	const hasCompletedOnboarding = !!userProfile

// 	return (
// 		<React.Fragment>
// 			<SignOutBtn />
// 			<IntroShortcutGuide user={session.user} />
// 			<OnboardingTrigger
// 				userId={session.user.id}
// 				hasCompletedOnboarding={hasCompletedOnboarding}
// 			/>
// 		</React.Fragment>
// 	)
// }
