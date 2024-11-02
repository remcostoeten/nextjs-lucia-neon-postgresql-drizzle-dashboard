'use server'

async function getAllCommits(repoPath: string, token: string) {
	let page = 1
	let allCommits = []
	let hasNextPage = true

	while (hasNextPage) {
		const response = await fetch(
			`https://api.github.com/repos/${repoPath}/commits?per_page=100&page=${page}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/vnd.github.v3+json',
					'X-GitHub-Api-Version': '2022-11-28'
				},
				cache: 'no-store'
			}
		)

		if (!response.ok) {
			// Check for rate limiting
			if (response.status === 403) {
				const rateLimitReset = response.headers.get('X-RateLimit-Reset')
				const resetDate =
					rateLimitReset ?
						new Date(parseInt(rateLimitReset) * 1000)
					:	new Date()
				console.error(
					`Rate limited until ${resetDate.toLocaleString()}`
				)
				throw new Error('GitHub API rate limit exceeded')
			}

			const error = await response.text()
			console.error('GitHub API Error:', error)
			throw new Error(`Failed to fetch commit count: ${response.status}`)
		}

		const commits = await response.json()

		if (commits.length === 0) {
			hasNextPage = false
		} else {
			allCommits = [...allCommits, ...commits]
			page++
		}

		// Check remaining rate limit
		const remaining = response.headers.get('X-RateLimit-Remaining')
		if (remaining && parseInt(remaining) < 1) {
			console.warn('Rate limit almost exceeded, stopping pagination')
			hasNextPage = false
		}
	}

	return allCommits
}

export async function getCommitCount() {
	try {
		const repoUrl = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY
		const repoPath = repoUrl?.split('github.com/')[1]
		const token = process.env.GITHUB_ACCESS_TOKEN

		if (!repoPath || !token) {
			throw new Error('Invalid repository URL or missing token')
		}

		const commits = await getAllCommits(repoPath, token)

		return {
			totalCommits: commits.length,
			madeBy: '@remcostoeten'
		}
	} catch (error) {
		console.error('Error fetching commit count:', error)
		return {
			totalCommits: 0,
			madeBy: '@remcostoeten'
		}
	}
}
