import { Flex } from '@/components/atoms/Flex'

import EmptyStateMessage from '@/components/effects/empty-state-loader'
import OnboardingNotice from '@/components/effects/onboarding-trigger'
import ShowHide from '@/components/effects/show-hide'
import { validateRequest } from '@/core/server/auth/lucia'
import { db, userProfiles } from '@/core/server/db'
import { eq } from 'drizzle-orm'

export default async function Dashboard() {
	const { user } = await validateRequest()
	if (!user) {
		return <div>Please sign in to access the dashboard.</div>
	}

	const userProfile = await db.query.userProfiles.findFirst({
		where: eq(userProfiles.userId, user.id)
	})

	const displayName =
		userProfile?.firstName || user.name || user.email || 'Guest'
	const currentHour = new Date().getHours()
	const greeting = getGreeting(currentHour)

	return (
		<Flex
			dir="col"
			className="max-w-[1400px] w-[1400px] max-md:pl-5 max-md:max-w-full"
		>
			<Flex dir="col" className="w-4/5 mt-2 max-md:mt-10 max-md:w-full">
				<OnboardingNotice
					userId={user.id}
					hasCompletedOnboarding={!!userProfile}
				>
					Finished the onboarding? Click here to dismiss this notice
				</OnboardingNotice>
				<h1 className="text-5xl font-semibold text-title leading-[55px] max-md:max-w-full max-md:text-4xl">
					<span className="gradient-span">{greeting},</span>
					<span className="text-title">{displayName}!</span>
				</h1>
				<ShowHide title="Recent Activities">
					<EmptyStateMessage
						message="You don't have any recent activities yet. Go ahead and get busy!"
						cardCount={6}
						animate={true}
						opacity={75}
					/>
				</ShowHide>
			</Flex>
		</Flex>
	)
}

function getGreeting(hour: number): string {
	if (hour >= 0 && hour < 5) return 'Good night'
	if (hour >= 5 && hour < 7) return 'Rise and shine'
	if (hour >= 7 && hour < 12) return 'Good morning'
	if (hour >= 12 && hour < 13) return "It's high noon"
	if (hour >= 13 && hour < 17) return 'Good afternoon'
	if (hour >= 17 && hour < 19) return 'Good evening'
	if (hour >= 19 && hour < 22) return "Hope you're having a pleasant night"
	return 'Burning the midnight oil'
}
