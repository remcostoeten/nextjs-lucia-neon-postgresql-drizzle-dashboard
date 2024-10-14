export interface Activity {
	id: string
	color: string
	name: string
	icon: IconNames
	duration: number
}

export interface ActivityCardProps extends Activity {}

export interface ActivityCardSkeletonProps {
	animate?: boolean
	opacity?: number
}

export interface ActivitiesProps {
	activities: Activity[]
}

export interface CreateActivityInput {
	name: string
	duration: number
	icon: string
	color: string
}
