export const siteConfig = {
	name: 'Remco Stoeten',
	applicationName: 'Notevault',
	description: 'Frontend Developer specializing in Next.js and React',
	url: 'https://notevault.remcostoeten.com', // Replace with your actual website URL
	ogImage: 'x', // Replace with your actual OG image URL
	links: {
		github: 'https://github.com/remcostoeten',
		gitlab: 'https://gitlab.com/remcostoeten',
		linkedin: 'https://linkedin.com/in/remco-stoeten', // Replace with your actual LinkedIn URL
		twitter: 'https://twitter.com/' // Replace with your actual Twitter URL
	},
	contact: {
		email: {
			primary: 'remcostoeten@hotmail.com',
			secondary: 'stoetenremco.rs@gmail.com'
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
		// Add more projects as needed
	},
	social: {
		github: 'remcostoeten',
		twitter: 'x',
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
			secondary: '#10B981' // Example color, adjust as needed
		}
	}
}

export type SiteConfig = typeof siteConfig
