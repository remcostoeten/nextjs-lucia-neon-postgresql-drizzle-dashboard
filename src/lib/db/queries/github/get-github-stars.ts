/**
 * Fetches the GitHub stars for the current repository
 * @returns Repo stars count
 */

import { env } from '@/config/env'

export async function getGitHubStars(): Promise<string | null> {
	try {
		const response = await fetch(
			`https://api.github.com/repos/${siteConfig.links.github
				.split('/')
				.slice(-2)
				.join('/')}`,
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

		const json = (await response.json()) as { stargazers_count: string }

		return parseInt(json.stargazers_count).toLocaleString()
	} catch (error) {
		console.error(error)
		return null
	}
}
