export type GitHubCommit = {
	commit: {
		author: {
			date: string
		}
	}
}

export type GitHubContributor = {
	total: number
	author: {
		login: string
	}
}

export type GitHubResponse<T> = T
