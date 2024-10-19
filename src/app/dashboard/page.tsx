import { Flex } from '@/components/atoms/Flex'
import TimeWeatherInfo from '@/components/dashboard/weather-time'
import OnboardingNotice from '@/components/effects/onboarding-trigger'
import ShowHide from '@/components/effects/show-hide'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
		<Flex dir="col" className="max-w-[1400px] w-full px-4 py-8 gap-8">
			<OnboardingNotice
				userId={user.id}
				hasCompletedOnboarding={!!userProfile}
			>
				Finished the onboarding? Click here to dismiss this notice
			</OnboardingNotice>

			<Flex dir="col" gap="4">
				<h1 className="text-5xl font-semibold text-title leading-[55px] max-md:max-w-full max-md:text-4xl">
					<span className="gradient-span">{greeting},</span>
					<span className="text-title">{displayName}!</span>
				</h1>
				<TimeWeatherInfo />
			</Flex>

			<Card>
				<CardHeader>
					<CardTitle>Recent Activities</CardTitle>
				</CardHeader>
				<CardContent>
					<ShowHide title="Recent Activities">
						{/* Content removed as per instructions */}
					</ShowHide>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Task Management</CardTitle>
				</CardHeader>
				<CardContent>
					<Flex dir="col" gap="4">
						<Flex justify="between" items="center">
							<select className="bg-background text-foreground border border-input rounded-md px-3 py-2">
								<option value="">Select a project</option>
							</select>
							<Button variant="outline">Create New Board</Button>
						</Flex>
						<Flex gap="4">
							{['Backlog', 'In Progress', 'Completed'].map(
								(lane) => (
									<Card key={lane} className="flex-1">
										<CardHeader>
											<CardTitle>{lane}</CardTitle>
										</CardHeader>
										<CardContent>
											<Button
												variant="ghost"
												className="w-full"
											>
												+ Add Task
											</Button>
										</CardContent>
									</Card>
								)
							)}
						</Flex>
						<Button>Create Task</Button>
					</Flex>
				</CardContent>
			</Card>
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
