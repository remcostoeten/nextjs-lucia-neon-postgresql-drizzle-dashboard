import RecentActivities from '@/components/dashboard/features/activity/recent-activities';
import { validateRequest } from '@/lib/auth/lucia';

const COLORS = {
	BACKGROUND: 'bg-neutral-900',
	TEXT_PRIMARY: 'text-gray-200',
	TEXT_SECONDARY: 'text-zinc-400',
	BORDER: 'border-zinc-800',
} as const;

type DashboardProps = {
	user: Awaited<ReturnType<typeof validateRequest>>['user'];
};

function Dashboard({ user }: DashboardProps) {
	const displayName = user?.name || user?.email || 'Guest';
	return (
		<section className="max-w-[1400px] w-[1400px] max-md:pl-5 max-md:max-w-full">
			<div className="flex gap-5 max-md:flex-col">
				<div className="flex flex-col w-4/5 max-md:ml-0 max-md:w-full">
					<div className="flex flex-col grow items-start mt-2 max-md:mt-10 max-md:max-w-full">
						<h1 className="text-5xl font-semibold text-title leading-[55px] max-md:max-w-full max-md:text-4xl">
							Good evening, {displayName}!
						</h1>
						<RecentActivities />
					</div>
				</div>
			</div>
		</section>
	);
}

export default Dashboard;
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
