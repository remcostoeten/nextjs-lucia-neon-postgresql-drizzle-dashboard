export const siteConfig = {
	name: 'Remco Stoeten',
	applicationName: 'Notevault',
	description: 'Frontend Developer specializing in Next.js and React',
	url: 'https://notevault.remcostoeten.com',
	ogImage: '/path/to/og-image.jpg', // Replace with the actual path to your OG image
	username: 'remcostoeten',
	repositoryName: 'nextjs-lucia-neon-postgresql-drizzle-dashboard',
	links: {
		github: 'https://github.com/remcostoeten',
		gitlab: 'https://gitlab.com/remcostoeten',
		linkedin: 'https://linkedin.com/in/remco-stoeten',
		twitter: 'https://twitter.com/remcostoeten' // Assuming your Twitter handle is the same as your username
	},
	contact: {
		email: {
			primary: process.env.ADMIN_EMAIL,
			secondary: process.env.ADMIN_EMAIL_TWO
		}
	},
	location: {
		country: 'The Netherlands',
		timezone: 'Europe/Amsterdam'
	},
	projects: {
		main: {
			name: 'nextjs-lucia-neon-postgresql-drizzle-dashboard',
			url: 'https://github.com/remcostoeten/nextjs-lucia-neon-postgresql-drizzle-dashboard',
			description:
				'A dashboard built with Next.js, Lucia, Neon, PostgreSQL, and Drizzle'
		}
	},
	social: {
		github: 'remcostoeten',
		twitter: 'remcostoeten',
		linkedin: 'remcostoeten'
	},
	metrics: {
		githubStats: {
			username: 'remcostoeten',
			repoName: 'nextjs-lucia-neon-postgresql-drizzle-dashboard'
		},
		techStack: {
			frontend: ['Next.js 14+', 'React 18-19'],
			databases: ['PostgreSQL (Neon)', 'SQLite (Turso)'],
			ui: ['TailwindCSS', 'ShadCN', 'Framer Motion'],
			authentication: [
				'Lucia',
				'Email and password registration',
				'ToDo: Email verification/reset password',
				'ToDo: oAuth2 social login'
			],
			corePackages: ['DrizzleORM', 'Zustand', 'Zod', 'TipTap']
		},
		futureFeatures: [
			'Kanban board',
			'Chromedriver WhatsApp scraper',
			'CSV mutate tool',
			'Text mutate tool',
			'Diff checker with diffs stored to a db',
			'View and mutate personal WhatsApp history',
			'HTML to JSX/TSX converter + component creator',
			'Finance logger/dashboard',
			'Filevault Storage',
			'Utility scripts Storage',
			'Config manager (.zshrc with partials easily listed out)',
			'Blog through mdx',
			'Transition easing helper tool (CSS and Framer motion)',
			'Knowledge base',
			'Personal code (Vercel, Github, Gitlab) statistics',
			'Personal homepage (e.g., a section to have as newtab with an overview of your favorite bookmarks)',
			'.env storage/sharing',
			'Whiteboard/creative dump your thoughts feature',
			'SVG to CSS-pseudo selector/SVG to react component converter'
		]
	},
	seo: {
		keywords: [
			'Remco Stoeten',
			'Frontend Developer',
			'Next.js',
			'React',
			'TypeScript',
			'Web Development',
			'The Netherlands'
		]
	},
	theme: {
		colors: {
			primary: '#ff6c00',
			secondary: '#10B981'
		}
	}
}

export type SiteConfig = typeof siteConfig
