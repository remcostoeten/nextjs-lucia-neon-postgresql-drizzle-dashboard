'use client'

import { getActivityLogs } from '@/core/server/actions/users/fetch-activity'
import { useEffect, useState } from 'react'
import {
	Alert,
	AlertCircle,
	AlertDescription,
	AlertTitle,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from 'ui'

function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<Alert variant="destructive">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				{error.message}
				<Button
					onClick={resetErrorBoundary}
					variant="outline"
					size="sm"
					className="mt-2"
				>
					Try again
				</Button>
			</AlertDescription>
		</Alert>
	)
}

function ActivityFeed() {
	const [activities, setActivities] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

	async function fetchActivities(retryCount = 0) {
		const abortController = new AbortController()

		try {
			setIsLoading(true)
			const logs = await getActivityLogs(abortController.signal)
			if (!abortController.signal.aborted) {
				setActivities(logs)
				setError(null)
			}
		} catch (error) {
			if (!abortController.signal.aborted) {
				console.error('Failed to fetch activity logs:', error)

				if (error instanceof Error) {
					console.error('Error name:', error.name)
					console.error('Error message:', error.message)
					console.error('Error stack:', error.stack)
				}

				if (retryCount < 3) {
					console.log(`Retrying... Attempt ${retryCount + 1}`)
					setTimeout(
						() => fetchActivities(retryCount + 1),
						1000 * (retryCount + 1)
					)
				} else {
					setError(
						'Failed to load activity logs. Please check your connection and try again.'
					)
				}
			}
		} finally {
			if (!abortController.signal.aborted) {
				setIsLoading(false)
			}
		}

		return () => {
			abortController.abort()
		}
	}

	useEffect(() => {
		const cleanup = fetchActivities()
		return cleanup
	}, [])

	const filteredActivities = activities.filter(
		activity =>
			activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
			activity.details.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const paginatedActivities = filteredActivities.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)

	if (isLoading) {
		return <div className="text-center py-4">Loading activity feed...</div>
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
		<div className="space-y-4 p-4 bg-gray-100 dark:bg-gray-900">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Activity Feed</h2>
				<div className="flex items-center space-x-2">
					<Input
						type="text"
						placeholder="Search activities..."
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className="w-64"
					/>
					<Button
						onClick={() => fetchActivities()}
						variant="outline"
						size="sm"
					>
						Refresh
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Activities
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{activities.length}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Unique Actions
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{new Set(activities.map(a => a.action)).size}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Latest Activity
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{activities.length > 0
								? new Date(
										activities[0].timestamp
									).toLocaleString()
								: 'N/A'}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Activities Today
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{
								activities.filter(
									a =>
										new Date(a.timestamp).toDateString() ===
										new Date().toDateString()
								).length
							}
						</div>
					</CardContent>
				</Card>
			</div>

			{activities.length === 0 ? (
				<p>No activities found.</p>
			) : (
				<>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Action</TableHead>
								<TableHead>Details</TableHead>
								<TableHead>Timestamp</TableHead>
								<TableHead>Metadata</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginatedActivities.map(activity => (
								<TableRow key={activity.id}>
									<TableCell>{activity.action}</TableCell>
									<TableCell>
										{activity.details || 'N/A'}
									</TableCell>
									<TableCell>
										{new Date(
											activity.timestamp
										).toLocaleString()}
									</TableCell>
									<TableCell>
										{activity.metadata ? (
											<Button
												variant="link"
												size="sm"
												onClick={() =>
													alert(
														JSON.stringify(
															activity.metadata,
															null,
															2
														)
													)
												}
											>
												View Metadata
											</Button>
										) : (
											'N/A'
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className="flex justify-between items-center mt-4">
						<Button
							onClick={() =>
								setCurrentPage(prev => Math.max(prev - 1, 1))
							}
							disabled={currentPage === 1}
						>
							Previous
						</Button>
						<span>
							Page {currentPage} of {totalPages}
						</span>
						<Button
							onClick={() =>
								setCurrentPage(prev =>
									Math.min(prev + 1, totalPages)
								)
							}
							disabled={currentPage === totalPages}
						>
							Next
						</Button>
					</div>
				</>
			)}
		</div>
	)
}

export default function ActivityPage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Your Activity</h1>
			<ActivityFeed />
		</div>
	)
}
