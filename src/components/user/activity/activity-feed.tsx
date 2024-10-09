'use client'

import { Skeleton } from '@/components/effects/loaders/skeleton'
import { getActivityLogs } from 'actions'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, ChevronDown, ChevronUp, Filter, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	Alert,
	AlertDescription,
	AlertTitle,
	Button,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from 'ui'

const severityColors = {
	error: 'bg-red-500',
	warning: 'bg-yellow-500',
	info: 'bg-blue-500'
}

type ActivityItemProps = {
	activity: any;
	isExpanded: boolean;
	onToggle: () => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isExpanded, onToggle }) => {
	return (
		<motion.div
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="border-l-2 border-gray-600 pl-4 py-2"
		>
			<div className="flex items-center justify-between cursor-pointer" onClick={onToggle}>
				<div className="flex items-center space-x-2">
					<div className={`w-2 h-2 rounded-full ${severityColors[activity.severity as keyof typeof severityColors]}`} />
					<span className="font-medium">{activity.action}</span>
				</div>
				<div className="flex items-center space-x-2">
					<span className="text-sm text-gray-400">{new Date(activity.timestamp).toLocaleString()}</span>
					{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
				</div>
			</div>
			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="mt-2 text-sm text-gray-300"
					>
						<p>{activity.details}</p>
						{activity.metadata && (
							<pre className="mt-2 p-2 bg-gray-800 rounded">
								{JSON.stringify(activity.metadata, null, 2)}
							</pre>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

type ExpandedItems = Record<string, boolean>

export default function ActivityLog() {
	const [activities, setActivities] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [filterSeverity, setFilterSeverity] = useState('all')
	const [expandedItems, setExpandedItems] = useState<ExpandedItems>({})

	useEffect(() => {
		fetchActivities()
	}, [])

	async function fetchActivities() {
		try {
			setIsLoading(true)
			const logs = await getActivityLogs()
			setActivities(logs)
			setError(null)
		} catch (error) {
			console.error('Failed to fetch activity logs:', error)
			setError('Failed to load activity logs. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	const filteredActivities = activities.filter(activity =>
		(activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
			activity.details.toLowerCase().includes(searchTerm.toLowerCase())) &&
		(filterSeverity === 'all' || activity.severity === filterSeverity)
	)
	const toggleExpanded = (id: string) => {
		setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }))
	}

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		)
	}

	return (
		<div className="space-y-4 p-4 bg-section text-subtitle">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Activity Log</h2>
				<Button onClick={fetchActivities} variant="outline" size="sm">
					Refresh
				</Button>
			</div>

			<div className="flex space-x-2">
				<div className="relative flex-grow">
					<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-subtitle" size={18} />
					<Input
						type="text"
						placeholder="Search activities..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="relative">
					<Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-subtitle" size={18} />
					<Select
						value={filterSeverity}
						onValueChange={setFilterSeverity}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filter Severity" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Severities</SelectItem>
							<SelectItem value="error">Error</SelectItem>
							<SelectItem value="warning">Warning</SelectItem>
							<SelectItem value="info">Info</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="space-y-2">
				{isLoading ? (
					Array.from({ length: 5 }).map((_, index) => (
						<Skeleton key={index} className="h-12 w-full bg-gray-800" />
					))
				) : filteredActivities.length === 0 ? (
					<p className="text-center py-4">No activities found.</p>
				) : (
					filteredActivities.map(activity => (
						<ActivityItem
							key={activity.id}
							activity={activity}
							isExpanded={expandedItems[activity.id as keyof typeof expandedItems]}
							onToggle={() => toggleExpanded(activity.id)}
						/>
					))
				)}
			</div>
		</div>
	)
}
