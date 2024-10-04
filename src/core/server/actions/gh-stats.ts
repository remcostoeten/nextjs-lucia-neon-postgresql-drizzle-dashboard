'use server'

import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
	auth: process.env.GITHUB_ACCESS_TOKEN
})

export async function fetchGitHubStats() {
	try {
		const { data: userData } = await octokit.users.getByUsername({
			username: 'remcostoeten'
		})

		const { data: repoData } = await octokit.repos.get({
			owner: 'remcostoeten',
			repo: 'nextjs-lucia-neon-postgresql-drizzle-dashboard'
		})

		// Fetch commit activity
		const { data: commitActivity } =
			await octokit.repos.getCommitActivityStats({
				owner: 'remcostoeten',
				repo: 'nextjs-lucia-neon-postgresql-drizzle-dashboard'
			})

		// Calculate coding streak
		const codingStreak = commitActivity.reduce((streak, week) => {
			return week.days.some(day => day > 0) ? streak + 1 : 0
		}, 0)

		// Get total commits
		const totalCommits = commitActivity.reduce(
			(sum, week) => sum + week.total,
			0
		)

		// Get last commit date to the minute
		const {
			data: [latestCommit]
		} = await octokit.repos.listCommits({
			owner: 'remcostoeten',
			repo: 'nextjs-lucia-neon-postgresql-drizzle-dashboard',
			per_page: 1
		})

		const lastCommitDate =
			latestCommit.commit.committer?.date ?? new Date().toISOString()
		const lastCommitTimestamp = new Date(lastCommitDate).toLocaleTimeString(
			[],
			{ hour: '2-digit', minute: '2-digit' }
		)

		return {
			codingStreak,
			totalCommits,
			lastCommitDate,
			lastCommitTimestamp,
			madeBy: userData.login
		}
	} catch (error) {
		console.error('Error fetching GitHub stats:', error)
		return {
			codingStreak: 0,
			totalCommits: 0,
			lastCommitDate: null,
			madeBy: '@remcostoeten'
		}
	}
}
