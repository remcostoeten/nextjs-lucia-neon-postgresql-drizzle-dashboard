import { siteConfig } from '@/config/site'

/**
 * Returns the absolute url for the given path based on the current environment
 * @param path The path to get the absolute url for
 * @returns The absolute url for the given path
 */
export function absoluteUrl(path: string) {
	if (process.env.VERCEL) {
		switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
			case 'production':
				return `${siteConfig.url}${path}`

			case 'preview':
				return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}${path}`

			default:
				// development
				return `http://localhost:${process.env.PORT ?? 3000}${path}`
		}
	} else if (process.env.NETLIFY) {
		switch (process.env.CONTEXT) {
			case 'production':
				return `${siteConfig.url}${path}`

			case 'deploy-preview':
			case 'branch-deploy':
				return `https://${process.env.DEPLOY_PRIME_URL}${path}`

			default:
				// development
				return `http://localhost:${process.env.PORT ?? 3000}${path}`
		}
	} else {
		return `${siteConfig.url}${path}`
	}
}
