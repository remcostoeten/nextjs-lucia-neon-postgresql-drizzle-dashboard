'use server'

import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
	auth: process.env.GITHUB_ACCESS_TOKEN
})

type CommitDate = Date

function getRelativeDay(commitDate: CommitDate): string {
	const today = new Date()
	const yesterday = new Date(today)
	yesterday.setDate(yesterday.getDate() - 1)

	if (commitDate.toDateString() === today.toDateString()) {
		return 'Today' + ','
	} else if (commitDate.toDateString() === yesterday.toDateString()) {
		return 'Yesterday' + ','
	} else {
		const daysOfWeek = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		]
		return `Last ${daysOfWeek[commitDate.getDay()]}`
	}
}

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

		// Get last commit date with relative day and time
		const {
			data: [latestCommit]
		} = await octokit.repos.listCommits({
			owner: 'remcostoeten',
			repo: 'nextjs-lucia-neon-postgresql-drizzle-dashboard',
			per_page: 1
		})

		if (
			!latestCommit ||
			!latestCommit.commit ||
			!latestCommit.commit.committer
		) {
			throw new Error('Failed to retrieve latest commit data')
		}

		const lastCommitDate = latestCommit.commit.committer.date
		if (!lastCommitDate) {
			throw new Error('Last commit date is undefined')
		}

		const commitDate = new Date(lastCommitDate)
		const relativeDay = getRelativeDay(commitDate)
		const hours = commitDate.getHours().toString().padStart(2, '0')
		const minutes = commitDate.getMinutes().toString().padStart(2, '0')

		console.log('Fetched GitHub stats:', {
			codingStreak,
			totalCommits,
			lastCommitDate,
			relativeDay,
			hours,
			minutes
		})

		return {
			codingStreak,
			totalCommits,
			lastCommitDate,
			lastCommitDay: relativeDay,
			lastCommitHours: hours,
			lastCommitMinutes: minutes,
			madeBy: userData.login
		}
	} catch (error) {
		console.error('Error fetching GitHub stats:', error)
		return {
			codingStreak: 0,
			totalCommits: 0,
			lastCommitDate: null,
			lastCommitDay: 'N/A',
			lastCommitHours: '00',
			lastCommitMinutes: '00',
			madeBy: '@remcostoeten'
		}
	}
}
