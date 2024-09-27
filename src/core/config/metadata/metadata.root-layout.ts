import type { Metadata } from 'next'

const appName = 'NoteVault'
const appDescription =
	'Secure, fast, and simple note-taking app built with Next.js, Turso, and Drizzle ORM'
const appUrl = 'https://notevault.remcostoeten.com'

export const metadata: Metadata = {
	title: {
		default: appName,
		template: `%s | ${appName}`
	},
	description: appDescription,
	keywords: [
		'notes',
		'productivity',
		'Next.js',
		'Turso',
		'SQLite',
		'Drizzle ORM',
		'NextAuth'
	],
	authors: [{ name: 'Remco Stoeten', url: 'https://remcostoeten.com' }],
	creator: 'Remco Stoeten',
	publisher: 'Remco Stoeten',
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	},
	metadataBase: new URL(appUrl),
	alternates: {
		canonical: '/',
		languages: {
			'en-US': '/en-US'
		}
	},
	openGraph: {
		title: appName,
		description: appDescription,
		url: appUrl,
		siteName: appName,
		images: [
			{
				url: `${appUrl}/og-image.png`,
				width: 1200,
				height: 630,
				alt: 'NoteVault - Your secure note-taking app'
			}
		],
		locale: 'en_US',
		type: 'website'
	},
	twitter: {
		card: 'summary_large_image',
		title: appName,
		description: appDescription,
		images: [`${appUrl}/twitter-image.png`],
		creator: '@remcostoeten'
	},
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png'
	},
	manifest: `${appUrl}/manifest.json`,
	applicationName: appName,
	referrer: 'origin-when-cross-origin',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	category: 'productivity'
}
