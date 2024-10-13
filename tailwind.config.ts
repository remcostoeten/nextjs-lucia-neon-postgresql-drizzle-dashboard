import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const {
	default: flattenColorPalette
} = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}'
	],
	theme: {
		container: {
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				bricolage: ['var(--font-bricolage)', ...fontFamily.sans]
			},
			fontSize: {
				h1: ['56px', { lineHeight: '1.2', letterSpacing: '-0.22px' }],
				h2: ['48px', { lineHeight: '1.2', letterSpacing: '-0.19px' }],
				h3: ['40px', { lineHeight: '1.2', letterSpacing: '-0.17px' }],
				xxs: '14px'
			},
			height: {
				search: '40px',
				header: '77px'
			},
			maxWidth: {
				'big-wrapper': '1128px',
				wrapper: '984px',
				search: 'var(--search-width)'
			},
			width: {
				'sub-sidebar': 'var(--sidebar-sub-width)',
				sidebar: 'var(--sidebar-width)'
			},
			padding: {
				theme: 'var(--horizontal-padding)',
				xl: '72px',
				large: '48px'
			},
			margin: {
				xl: '72px',
				large: '48px'
			},
			backgroundImage: {
				'gradient-radial':
					'radial-gradient(circle, var(--tw-gradient-stops))'
			},
			colors: {
				yellow: '#fce48d',
				purple: '#b98dfc',
				base: '#070707',
				'neutral-300': 'var(--neutral--300)',
				'neutral-400': 'var(--neutral--400)',
				'neutral-800': 'var(--neutral--800)',

				'black-002': 'var(--black--2)',
				'black-072': 'var(--black--72)',
				'white-002': 'var(--white--2)',
				'white-006': 'var(--white--6)',
				'white-010': 'var(--white--10)',
				'white-012': 'var(--white--12)',
				'white-016': 'var(--white--16)',
				'white-064': 'var(--white--64)',
				body: 'var(--bg-body)',
				card: {
					DEFAULT: 'var(--bg-card)',
					foreground: 'hsl(var(--card-foreground))'
				},
				brand: 'var(--brand)',
				section: 'var(--bg-section)',
				'section-lighter': 'var(--bg-section-lighter)',
				dropdown: 'var(--bg-dropdown)',
				modal: 'var(--bg-modal)',
				'modal-hover': 'var(--bg-modal-hover)',
				border: 'var(--border-default)',
				title: 'var(--text-title)',
				subtitle: 'var(--text-subtitle)',
				'text-muted': 'var(--text-muted)',
				'text-regular-nav': 'var(--text-regular-nav)',
				'text-button': 'var(--text-button)',
				'button-default': 'var(--button-default)',
				'button-hover': 'var(--button-hover)',
				success: 'var(--color-success)',
				error: 'var(--color-error)',
				'menu-icon': 'var(--color-menu-icon)',
				placeholder: 'var(--color-placeholder)',
				'input-focus': 'var(--color-input-focus)',
				'badge-default': 'var(--badge-default)',
				'badge-hover': 'var(--badge-hover)',
				background: 'var(--bg-section)',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					DEFAULT: 'var(--text-regular-nav)',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'var(--bg-dropdown)',
					foreground: 'hsl(var(--popover-foreground))'
				}
			},
			borderRadius: {
				'6': 'var(--radius--6px)',
				'8': 'var(--radius--8px)',
				'12': 'var(--radius--12px)',
				'24': 'var(--radius--24px)',
				'40': 'var(--radius--40px)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				marquee: {
					'0%': {
						transform: 'translateX(0%)'
					},
					'100%': {
						transform: 'translateX(-100%)'
					}
				},
				spotlight: {
					'0%': {
						opacity: '0',
						transform: 'translate(-72%, -62%) scale(0.5)'
					},
					'100%': {
						opacity: '1',
						transform: 'translate(-50%,-40%) scale(1)'
					}
				},
				'marquee-vertical': {
					from: {
						transform: 'translateY(0)'
					},
					to: {
						transform: 'translateY(calc(-100% - var(--gap)))'
					}
				}
			},
			animation: {
				marquee: 'marquee 110s linear infinite',
				spotlight: 'spotlight 2s ease .75s 1 forwards',
				'marquee-vertical':
					'marquee-vertical var(--duration) linear infinite'
			}
		}
	},
	plugins: [
		function ({ matchUtilities, theme }: any) {
			matchUtilities(
				{
					'bg-grid': (value: string) => ({
						backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='${value}'><path d='M0 .5H31.5V32'/></svg>")`
					})
				},
				{
					values: flattenColorPalette(theme('backgroundColor')),
					type: 'color'
				}
			)
		},
		addVariablesForColors
	]
}

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme('colors'))
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	)
	addBase({
		':root': newVars
	})
}

export default config
