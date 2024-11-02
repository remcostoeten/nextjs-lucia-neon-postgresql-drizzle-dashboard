import { env } from '@/config/env'
import { siteConfig } from '@/config/site'

/**
 * Fetches the number of commits on the master branch for the current repository
 * @returns Commit count as a string
 */
export async function getCommitCount(): Promise<string | null> {
	try {
		const [owner, repo] = siteConfig.links.github.split('/').slice(-2)
		const response = await fetch(
			`https://api.github.com/repos/${owner}/${repo}/commits?sha=master&per_page=1`,
			{
				headers: {
					Accept: 'application/vnd.github+json',
					Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`
				},
				next: { revalidate: 60 }
			}
		)

		if (!response.ok) {
			return null
		}

		const linkHeader = response.headers.get('Link')
		if (!linkHeader) {
			return '0'
		}

		const match = linkHeader.match(/&page=(\d+)>; rel="last"/)
		if (!match) {
			return '1'
		}

		return match[1]
	} catch (error) {
		console.error(error)
		return null
	}
}
