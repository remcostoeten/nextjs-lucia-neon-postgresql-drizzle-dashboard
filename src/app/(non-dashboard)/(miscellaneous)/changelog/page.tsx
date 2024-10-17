'use client'

import { Flex } from '@/components/atoms'
import { GitHubIcon } from '@/components/base/Icons'
import DeploymentInfo from '@/components/DeploymentInfo'
import HeartbeatLoader from '@/components/effects/loaders/heartbeat-loader'
import useMouseHoverEffect from '@/core/hooks/use-mouse-hover'
import { Octokit } from '@octokit/rest'
import { format } from 'date-fns'
import {
	Clock,
	Code,
	ExternalLink,
	GitCommit,
	GitFork,
	GitMerge,
	GitPullRequest,
	Minus,
	Plus,
	Search,
	Star,
	Users
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN })

// Types
interface Release {
	id: number
	name: string
	published_at: string
	body: string
	html_url: string
	tag_name: string
}

interface Metrics {
	totalCommits: number
	openPRs: number
	closedPRs: number
	contributors: number
	linesAdded: number
	linesDeleted: number
}

interface TimelineItem {
	type: 'commit' | 'merge'
	sha: string
	message: string
	date: string
	author: string
	url: string
}

interface MetricCardProps {
	icon: React.ReactNode
	label: string
	value: number
}

interface TimelineCardProps {
	item: TimelineItem
}

interface ReleaseCardProps {
	release: Release
}

interface ProjectSummary {
	name: string
	description: string
	stars: number
	forks: number
	openIssues: number
	language: string
}

interface ContributionData {
	date: string
	contributions: number
}

interface DeploymentData {
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

interface Contributor {
	login: string
	avatar_url: string
	contributions: number
}

interface LanguageData {
	name: string
	value: number
}

interface IssueData {
	open: number
	closed: number
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value }) => {
	const hoverRef = useMouseHoverEffect()
	return (
		<div
			ref={hoverRef}
			className="flex items-center space-x-3 bg-body border  p-4 rounded-lg hover-effect"
		>
			<div className="text-brand">{icon}</div>
			<div>
				<div className="text-sm text-text-muted">{label}</div>
				<div className="text-xl font-semibold text-title">
					{value.toLocaleString()}
				</div>
			</div>
		</div>
	)
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item }) => {
	const hoverRef = useMouseHoverEffect()
	return (
		<div
			ref={hoverRef}
			className="bg-card border  rounded-lg p-4 flex items-start space-x-4 hover-effect"
		>
			<div
				className={`mt-1 ${item.type === 'commit' ? 'text-success' : 'text-purple'}`}
			>
				{item.type === 'commit' ? (
					<GitCommit size={20} />
				) : (
					<GitMerge size={20} />
				)}
			</div>
			<div className="flex-grow">
				<div className="flex justify-between items-start">
					<h3 className="text-lg font-semibold text-title">
						{item.type === 'commit' ? 'Commit' : 'Merge'}
					</h3>
					<span className="text-sm text-text-muted flex items-center">
						<Clock size={14} className="mr-1" />
						{format(new Date(item.date), 'MMM d, yyyy HH:mm')}
					</span>
				</div>
				<p className="text-subtitle mt-1">{item.message}</p>
				<div className="mt-2 flex items-center space-x-4 text-sm">
					<span className="text-text-muted">by {item.author}</span>
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand hover:underline flex items-center"
					>
						<GitHubIcon className="mr-1" />
						View on GitHub
					</a>
				</div>
			</div>
		</div>
	)
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({ release }) => {
	const hoverRef = useMouseHoverEffect()
	return (
		<div
			ref={hoverRef}
			className="bg-card border  rounded-lg p-6 hover-effect"
		>
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-2xl font-bold text-title">
					{release.name}
				</h3>
				<span className="text-sm text-text-muted">
					{format(new Date(release.published_at), 'MMMM d, yyyy')}
				</span>
			</div>
			<div
				className="prose prose-invert max-w-none mb-4 text-subtitle"
				dangerouslySetInnerHTML={{ __html: release.body }}
			/>
			<div className="flex space-x-4">
				<a
					href={release.html_url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center text-brand hover:underline"
				>
					<GitHubIcon className="mr-2" size={16} />
					View on GitHub
				</a>
				<a
					href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPOSITORY}/releases/tag/${release.tag_name}`}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center text-brand hover:underline"
				>
					<ExternalLink className="mr-2" size={16} />
					Release Notes
				</a>
			</div>
		</div>
	)
}

const ProjectSummaryCard: React.FC<{ summary: ProjectSummary }> = ({
	summary
}) => {
	const hoverRef = useMouseHoverEffect()
	return (
		<div
			ref={hoverRef}
			className="bg-card border  rounded-lg p-6 hover-effectmb-4"
		>
			<h2 className="text-2xl font-bold text-title mb-2">
				{summary.name}
			</h2>
			<p className="text-subtitle mb-4">{summary.description}</p>
			<div className="flex space-x-6">
				<div className="flex items-center">
					<Star className="mr-2 text-yellow" />
					<span>{summary.stars} stars</span>
				</div>
				<div className="flex items-center">
					<GitFork className="mr-2 text-brand" />
					<span>{summary.forks} forks</span>
				</div>
				<div className="flex items-center">
					<GitPullRequest className="mr-2 text-purple" />
					<span>{summary.openIssues} open issues</span>
				</div>
				<div className="flex items-center">
					<Code className="mr-2 text-green-500" />
					<span>{summary.language}</span>
				</div>
			</div>
		</div>
	)
}

const ContributionGraph: React.FC<{ data: ContributionData[] }> = ({
	data
}) => (
	<div className="bg-card border  rounded-lg p-6mb-4">
		<h3 className="text-xl font-semibold mb-4">Contribution Activity</h3>
		<ResponsiveContainer width="100%" height={200}>
			<AreaChart data={data}>
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Area
					type="monotone"
					dataKey="contributions"
					stroke="#8884d8"
					fill="#8884d8"
				/>
			</AreaChart>
		</ResponsiveContainer>
	</div>
)

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({
	onSearch
}) => (
	<div className="mb-8">
		<div className="relative">
			<input
				type="text"
				placeholder="Search commits, PRs, or releases..."
				className="w-full p-2 pl-10 bg-card border  rounded-lg text-title"
				onChange={e => onSearch(e.target.value)}
			/>
			<Search
				className="absolute left-3 top-2.5 text-text-muted"
				size={20}
			/>
		</div>
	</div>
)

const RecentContributors: React.FC<{ contributors: Contributor[] }> = ({
	contributors
}) => {
	const hoverRef = useMouseHoverEffect()
	return (
		<div
			ref={hoverRef}
			className="bg-card border  rounded-lg p-6 hover-effectmb-4"
		>
			<h3 className="text-xl font-semibold mb-4">Recent Contributors</h3>
			<div className="flex flex-wrap gap-4">
				{contributors.map(contributor => (
					<div key={contributor.login} className="flex items-center">
						<img
							src={contributor.avatar_url}
							alt={contributor.login}
							className="w-10 h-10 rounded-full mr-2"
						/>
						<div>
							<p className="text-subtitle">{contributor.login}</p>
							<p className="text-sm text-text-muted">
								{contributor.contributions} commits
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

const FileChangeHeatmap: React.FC<{ data: any[] }> = ({ data }) => {
	const hoverRef = useMouseHoverEffect()
	return (
		<div
			ref={hoverRef}
			className="bg-card border  rounded-lg p-6 hover-effectmb-4"
		>
			<h3 className="text-xl font-semibold mb-4">File Change Heatmap</h3>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="size" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

const PullRequestStats: React.FC<{
	open: number
	closed: number
	merged: number
}> = ({ open, closed, merged }) => {
	const hoverRef = useMouseHoverEffect()
	const data = [
		{ name: 'Open', value: open },
		{ name: 'Closed', value: closed },
		{ name: 'Merged', value: merged }
	]
	const COLORS = ['#FFBB28', '#FF8042', '#00C49F']

	return (
		<div
			ref={hoverRef}
			className="bg-card border  rounded-lg p-6 hover-effectmb-4"
		>
			<h3 className="text-xl font-semibold mb-4">
				Pull Request Statistics
			</h3>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						labelLine={false}
						outerRadius={80}
						fill="#8884d8"
						dataKey="value"
						label={({ name, percent }) =>
							`${name} ${(percent * 100).toFixed(0)}%`
						}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

const LanguageDistribution: React.FC<{ languages: LanguageData[] }> = ({
	languages
}) => {
	const hoverRef = useMouseHoverEffect()
	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

	return (
		<div
			ref={hoverRef}
			className="bg-card border  rounded-lg p-6 hover-effectmb-4"
		>
			<h3 className="text-xl font-semibold mb-4">
				Language Distribution
			</h3>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={languages}
						cx="50%"
						cy="50%"
						outerRadius={80}
						fill="#8884d8"
						dataKey="value"
						label={({ name, percent }) =>
							`${name} ${(percent * 100).toFixed(0)}%`
						}
					>
						{languages.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

const IssueTrackerSummary: React.FC<{ issues: IssueData }> = ({ issues }) => {
	const hoverRef = useMouseHoverEffect()
	return (
		<div
			ref={hoverRef}
			className="bg-card border  rounded-lg p-6 hover-effectmb-4"
		>
			<h3 className="text-xl font-semibold mb-4">
				Issue Tracker Summary
			</h3>
			<div className="flex justify-around">
				<div className="text-center">
					<p className="text-2xl font-bold text-green-500">
						{issues.open}
					</p>
					<p className="text-subtitle">Open Issues</p>
				</div>
				<div className="text-center">
					<p className="text-2xl font-bold text-blue-500">
						{issues.closed}
					</p>
					<p className="text-subtitle">Closed Issues</p>
				</div>
			</div>
		</div>
	)
}

const ChangelogPage: React.FC = () => {
	const [releases, setReleases] = useState<Release[]>([])
	const [metrics, setMetrics] = useState<Metrics | null>(null)
	const [timeline, setTimeline] = useState<TimelineItem[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [projectSummary, setProjectSummary] = useState<ProjectSummary | null>(
		null
	)
	const [contributionData, setContributionData] = useState<
		ContributionData[]
	>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [deploymentData, setDeploymentData] = useState<DeploymentData | null>(
		null
	)
	const [recentContributors, setRecentContributors] = useState<Contributor[]>(
		[]
	)
	const [fileChangeData, setFileChangeData] = useState<any[]>([])
	const [prStats, setPrStats] = useState({ open: 0, closed: 0, merged: 0 })
	const [languageData, setLanguageData] = useState<LanguageData[]>([])
	const [issueData, setIssueData] = useState<IssueData>({
		open: 0,
		closed: 0
	})

	const metricsRef = useMouseHoverEffect()

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const [owner, repo] = process.env
					.NEXT_PUBLIC_GITHUB_REPOSITORY!.split('/')
					.slice(-2)

				// Fetch releases, metrics, and timeline data
				const [
					releasesResponse,
					commitsResponse,
					prsResponse,
					contributorsResponse
				] = await Promise.all([
					octokit.repos.listReleases({ owner, repo }),
					octokit.repos.listCommits({ owner, repo }),
					octokit.pulls.list({ owner, repo, state: 'all' }),
					octokit.repos.listContributors({ owner, repo })
				])

				setReleases(releasesResponse.data)

				// Set metrics
				const totalCommits = commitsResponse.data.length
				const openPRs = prsResponse.data.filter(
					pr => pr.state === 'open'
				).length
				const closedPRs = prsResponse.data.filter(
					pr => pr.state === 'closed'
				).length
				const contributorCount = contributorsResponse.data?.length || 0 // Renamed from 'contributors'
				const linesAdded = totalCommits * 10 // Simplified estimate
				const linesDeleted = totalCommits * 5 // Simplified estimate

				setMetrics({
					totalCommits,
					openPRs,
					closedPRs,
					contributors: contributorCount, // Use the renamed variable here
					linesAdded,
					linesDeleted
				})

				// Create timeline
				const timelineItems: TimelineItem[] = [
					...commitsResponse.data.map(commit => ({
						type: 'commit' as const,
						sha: commit.sha,
						message: commit.commit.message,
						date: commit.commit.author?.date || '',
						author: commit.commit.author?.name || '',
						url: commit.html_url
					})),
					...prsResponse.data
						.filter(pr => pr.merged_at)
						.map(pr => ({
							type: 'merge' as const,
							sha: pr.merge_commit_sha || '',
							message: pr.title,
							date: pr.merged_at || '',
							author: pr.user?.login || '',
							url: pr.html_url
						}))
				]

				timelineItems.sort(
					(a, b) =>
						new Date(b.date).getTime() - new Date(a.date).getTime()
				)
				setTimeline(timelineItems)

				// Fetch project summary
				const { data: repoData } = await octokit.repos.get({
					owner,
					repo
				})
				setProjectSummary({
					name: repoData.name,
					description: repoData.description || '',
					stars: repoData.stargazers_count,
					forks: repoData.forks_count,
					openIssues: repoData.open_issues_count,
					language: repoData.language || 'N/A'
				})

				// Fetch contribution data (simplified for example)
				const contributionResponse =
					await octokit.repos.getParticipationStats({ owner, repo })
				const weeklyData = contributionResponse.data.all || []
				const contributionData = weeklyData.map((count, index) => ({
					date: format(
						new Date(
							Date.now() -
								(weeklyData.length - 1 - index) *
									7 *
									24 *
									60 *
									60 *
									1000
						),
						'MMM d'
					),
					contributions: count
				}))
				setContributionData(contributionData)

				// Fetch latest commit
				const { data: commits } = await octokit.repos.listCommits({
					owner,
					repo,
					per_page: 1
				})
				const latestCommit = commits[0]

				// Fetch latest deployment (this is a placeholder - adjust based on your actual deployment platform)
				// For Vercel, you might use their API to get this information
				const latestDeployment = {
					status: 'success' as const,
					date: new Date().toISOString(),
					url: `https://${repo}.vercel.app`
				}

				setDeploymentData({
					latestCommit: {
						sha: latestCommit.sha,
						message: latestCommit.commit.message,
						date: latestCommit.commit.author.date,
						url: latestCommit.html_url
					},
					latestDeployment
				})

				// Fetch recent contributors (this was likely the cause of the duplicate name)
				const { data: recentContributors } =
					await octokit.repos.listContributors({
						owner,
						repo,
						per_page: 5
					})
				setRecentContributors(recentContributors)

				// Fetch file change data (simplified example)
				const { data: files } = await octokit.repos.getContent({
					owner,
					repo,
					path: ''
				})
				setFileChangeData(
					files.map((file: any) => ({
						name: file.name,
						size: file.size
					}))
				)

				// Fetch PR stats
				const { data: prs } = await octokit.pulls.list({
					owner,
					repo,
					state: 'all'
				})
				setPrStats({
					open: prs.filter(pr => pr.state === 'open').length,
					closed: prs.filter(
						pr => pr.state === 'closed' && !pr.merged_at
					).length,
					merged: prs.filter(pr => pr.merged_at).length
				})

				// Fetch language data
				const { data: languages } = await octokit.repos.listLanguages({
					owner,
					repo
				})
				setLanguageData(
					Object.entries(languages).map(([name, value]) => ({
						name,
						value
					}))
				)

				// Fetch issue data
				const { data: issues } = await octokit.issues.listForRepo({
					owner,
					repo,
					state: 'all'
				})
				setIssueData({
					open: issues.filter(issue => issue.state === 'open').length,
					closed: issues.filter(issue => issue.state === 'closed')
						.length
				})
			} catch (err) {
				console.error('Error fetching data:', err)
				setError(
					'Failed to fetch changelog data. Please try again later.'
				)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const handleSearch = (query: string) => {
		setSearchQuery(query)
		// Implement search logic here (e.g., filter commits, PRs, and releases based on the query)
	}

	if (loading) {
		return (
			<div className="text-title flex items-center justify-center">
				<Flex dir="col" align="center" justify="center" gap="2">
					<HeartbeatLoader />
					<span>Loading changelog...</span>
				</Flex>
			</div>
		)
	}

	if (error) {
		return (
			<div className="min-h-screen bg-body text-title flex items-center justify-center">
				<div className="text-error">{error}</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-body  text-title ">
			<h1 className="text-4xl font-bold mb-4">
				<span className="gradient-span">Changelog & git metrics</span>
			</h1>

			{deploymentData && <DeploymentInfo {...deploymentData} />}
			{projectSummary && <ProjectSummaryCard summary={projectSummary} />}

			<SearchBar onSearch={handleSearch} />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{contributionData.length > 0 && (
					<ContributionGraph data={contributionData} />
				)}
				{recentContributors.length > 0 && (
					<RecentContributors contributors={recentContributors} />
				)}
				{fileChangeData.length > 0 && (
					<FileChangeHeatmap data={fileChangeData} />
				)}
				<PullRequestStats {...prStats} />
				{languageData.length > 0 && (
					<LanguageDistribution languages={languageData} />
				)}
				<IssueTrackerSummary issues={issueData} />
			</div>

			{metrics && (
				<div
					ref={metricsRef}
					className="my-12 bg-card border rounded-lg p-6 hover-effect"
				>
					<h2 className="text-2xl font-semibold mb-4">
						Project Metrics
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						<MetricCard
							icon={<GitCommit />}
							label="Total Commits"
							value={metrics.totalCommits}
						/>
						<MetricCard
							icon={<GitPullRequest />}
							label="Open PRs"
							value={metrics.openPRs}
						/>
						<MetricCard
							icon={<GitMerge />}
							label="Closed PRs"
							value={metrics.closedPRs}
						/>
						<MetricCard
							icon={<Users />}
							label="Contributors"
							value={metrics.contributors}
						/>
						<MetricCard
							icon={<Plus />}
							label="Lines Added"
							value={metrics.linesAdded}
						/>
						<MetricCard
							icon={<Minus />}
							label="Lines Deleted"
							value={metrics.linesDeleted}
						/>
					</div>
				</div>
			)}

			<div className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Timeline</h2>
				<div className="space-y-4">
					{timeline
						.filter(
							item =>
								item.message
									.toLowerCase()
									.includes(searchQuery.toLowerCase()) ||
								item.author
									.toLowerCase()
									.includes(searchQuery.toLowerCase())
						)
						.map((item, index) => (
							<TimelineCard key={index} item={item} />
						))}
				</div>
			</div>

			<div className="space-y-8">
				<h2 className="text-2xl font-semibold mb-4">Releases</h2>
				{releases
					.filter(
						release =>
							release.name
								.toLowerCase()
								.includes(searchQuery.toLowerCase()) ||
							release.body
								.toLowerCase()
								.includes(searchQuery.toLowerCase())
					)
					.map(release => (
						<ReleaseCard key={release.id} release={release} />
					))}
			</div>
		</div>
	)
}

export default ChangelogPage
