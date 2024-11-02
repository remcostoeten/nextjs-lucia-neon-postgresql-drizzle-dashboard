export const siteConfig = {
	name: 'Notevault',
	url: 'https://notevault.remcostoeten.com',
	description: 'Frontend Developer specializing in Next.js and React',

	author: {
		name: 'Remco Stoeten',
		url: 'https://remcostoeten.com',
		email: process.env.ADMIN_EMAIL,
		x: '@remcostoeten'
	},

	links: {
		github: 'https://github.com/remcostoeten',
		discord: 'https://discord.gg/remcostoeten',
		x: 'https://twitter.com/yowremco'
	},
	usernames: 'remcostoeten'
}

export type SiteConfig = typeof siteConfig
