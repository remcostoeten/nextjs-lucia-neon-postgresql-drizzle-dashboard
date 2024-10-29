import useMouseHoverEffect from '@/core/hooks/use-mouse-hover'
import { Clock, Cloud, GitCommit } from 'lucide-react'
import React from 'react'

interface DeploymentInfoProps {
	latestCommit: {
		sha: string
		message: string
		date: string
		url: string
	}
	latestDeployment: {
		status: 'success' | 'error' | 'in_progress'
		date: string
		url: string
	}
}

const DeploymentInfo: React.FC<DeploymentInfoProps> = ({
	latestCommit,
	latestDeployment
}) => {
	const hoverRef = useMouseHoverEffect()

	return (
		<div
			ref={hoverRef}
			className="bg-card border rounded-lg p-6 hover-effect mb-8"
		>
			<h2 className="text-2xl font-semibold mb-4">
				Deployment Information
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h3 className="text-lg font-semibold mb-2 flex items-center">
						<GitCommit className="mr-2" size={20} />
						Latest Commit
					</h3>
					<p className="text-subtitle mb-1">{latestCommit.message}</p>
					<p className="text-sm text-text-muted mb-1">
						SHA:{' '}
						<a
							href={latestCommit.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-brand hover:underline"
						>
							{latestCommit.sha.substring(0, 7)}
						</a>
					</p>
					<p className="text-sm text-text-muted flex items-center">
						<Clock className="mr-1" size={14} />
						{new Date(latestCommit.date).toLocaleString()}
					</p>
				</div>
				<div>
					<h3 className="text-lg font-semibold mb-2 flex items-center">
						<Cloud className="mr-2" size={20} />
						Latest Deployment
					</h3>
					<p
						className={`text-subtitle mb-1 ${
							latestDeployment.status === 'success'
								? 'text-success'
								: latestDeployment.status === 'error'
									? 'text-error'
									: 'text-yellow'
						}`}
					>
						Status:{' '}
						{latestDeployment.status.charAt(0).toUpperCase() +
							latestDeployment.status.slice(1)}
					</p>
					<p className="text-sm text-text-muted mb-1">
						<a
							href={latestDeployment.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-brand hover:underline"
						>
							View Deployment
						</a>
					</p>
					<p className="text-sm text-text-muted flex items-center">
						<Clock className="mr-1" size={14} />
						{new Date(latestDeployment.date).toLocaleString()}
					</p>
				</div>
			</div>
		</div>
	)
}

export default DeploymentInfo
