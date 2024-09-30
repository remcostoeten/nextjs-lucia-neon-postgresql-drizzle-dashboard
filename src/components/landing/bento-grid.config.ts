export const bentoMarqueeFiles = [
	{
		name: 'notevault.tsx',
		body: 'Notevault: A React component for secure note-taking using Next.js 14+, TailwindCSS, and ShadCN UI components.'
	},
	{
		name: 'auth.ts',
		body: 'Authentication setup using Lucia, with email/password registration and plans for OAuth2 social login integration.'
	},
	{
		name: 'db.ts',
		body: 'Database configuration using DrizzleORM with PostgreSQL (Neon) and plans for SQLite integration (Turso).'
	},
	{
		name: 'kanban.tsx',
		body: 'Future Kanban board component for task management and organization within the Notevault application.'
	}
]

// Constants for heights of the bentoboxes. Originla design was 22rem, so we're reducing by 30% and
const oldHeight = '22rem'
const percentageReduction = 0.3

export const TOP_ROW_HEIGHT = `h-[${parseFloat(oldHeight.replace('rem', '')) * (1 - percentageReduction)}rem]`
export const BOTTOM_ROW_HEIGHT = `h-[${parseFloat(oldHeight.replace('rem', '')) * (1 - percentageReduction)}rem]`

// Bentobox card styles
export const CARD_STYLES = {
	base: 'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
	border: 'border-gray-950/[.1] dark:border-gray-50/[.1]',
	background:
		'bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
	effect: 'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none',
	boxShadow:
		'shadow-md hover:shadow-lg dark:shadow-red-800/30 dark:hover:shadow-red-800/40'
}
// Bentobox animation
export const FADE_UP_CLASSNAME =
	'lg:motion-safe:opacity-0 lg:motion-safe:animate-fade-up lg:motion-safe:animate-scale-in'
