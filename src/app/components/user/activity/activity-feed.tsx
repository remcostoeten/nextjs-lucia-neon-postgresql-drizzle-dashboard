'use client'

import Center from '@/components/atoms/Center'
import Spinner from '@/components/ui/spinner'
import { getActivityLogs } from '@/core/server/actions/activity-log/fetch-activity'
import { AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	Alert,
	AlertDescription,
	AlertTitle,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Dialog,
	DialogContent,
	DialogTrigger,
	Input,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from 'ui'

type ErrorFallbackProps = {
	error: Error
	resetErrorBoundary: () => void
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
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
		try {
			setIsLoading(true)
			const logs = await getActivityLogs()
			setActivities(logs)
			setError(null)
		} catch (error) {
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
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchActivities()
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
		return (
			<Center method="absolute">
				<Spinner />
			</Center>
		)
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
		<div className="space-y-4 bg-section border text-subtitle p-4">
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
										<Dialog>
											{activity.metadata ? (
												<DialogTrigger>
													<Button
														variant="link"
														size="sm"
														className="text-blue-500 hover:text-blue-700"
													>
														View Metadata
													</Button>
													<DialogContent>
														<div className="p-4">
															<pre className="text-sm text-gray-700">
																{JSON.stringify(
																	activity.metadata,
																	null,
																	2
																)}
															</pre>
														</div>
													</DialogContent>
												</DialogTrigger>
											) : (
												'N/A'
											)}
										</Dialog>
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

export default ActivityFeed
