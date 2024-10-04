import ActivityFeed from '@/components/user/activity/activity-feed'

export default function ActivityPage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Your Activity</h1>
			<ActivityFeed />
		</div>
	)
}
