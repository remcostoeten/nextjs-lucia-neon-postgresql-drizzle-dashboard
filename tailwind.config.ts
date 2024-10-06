import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
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
	prefix: '',
	theme: {
		container: {
			center: 'true',
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			height: {
				search: '40px',
				header: '77px'
			},
			maxWidth: {
				search: 'var(--search-width)'
			},
			width: {
				'sub-sidebar': 'var(--sidebar-sub-width)',
				sidebar: 'var(--sidebar-width)'
			},
			colors: {
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				body: 'var(--bg-body)',
				card: {
					DEFAULT: 'var(--bg-card)',
					foreground: 'hsl(var(--card-foreground))'
				},
				brand: 'var(--brand)',
				avatar: 'var(--avatar)',
				section: 'var(--bg-section)',
				'section-lighter': 'var(--bg-section-lighter)',
				input: 'hsl(var(--input))',
				dropdown: 'var(--bg-dropdown)',
				modal: 'var(--bg-modal)',
				'modal-hover': 'var(--bg-modal-hover)',
				'border-default': 'var(--border-default)',
				'border-outline': 'var(--border-outline)',
				'border-separator': 'var(--border-separator)',
				title: 'var(--text-title)',
				subtitle: 'var(--text-subtitle)',
				'text-muted': 'var(--text-muted)',
				'text-regular-nav': 'var(--text-regular-nav)',
				'text-button': 'var(--text-button)',
				'text-button-alt': 'var(--text-button-alt)',
				'text-dropdown-item': 'var(--text-dropdown-item)',
				'button-default': 'var(--button-default)',
				'button-hover': 'var(--button-hover)',
				success: 'var(--color-success)',
				error: 'var(--color-error)',
				'menu-icon': 'var(--color-menu-icon)',
				placeholder: 'var(--color-placeholder)',
				'input-focus': 'var(--color-input-focus)',
				'badge-default': 'var(--badge-default)',
				'badge-hover': 'var(--badge-hover)',
				border: 'var(--border-default)',
				ring: 'hsl(var(--ring))',
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
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
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
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				ripple: {
					'0%, 100%': {
						transform: 'translate(-50%, -50%) scale(1)'
					},
					'50%': {
						transform: 'translate(-50%, -50%) scale(0.9)'
					}
				},
				marquee: {
					from: {
						transform: 'translateX(0)'
					},
					to: {
						transform: 'translateX(calc(-100% - var(--gap)))'
					}
				},
				'marquee-vertical': {
					from: {
						transform: 'translateY(0)'
					},
					to: {
						transform: 'translateY(calc(-100% - var(--gap)))'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
				marquee: 'marquee var(--duration) linear infinite',
				'marquee-vertical':
					'marquee-vertical var(--duration) linear infinite',
				spotlight: 'spotlight 2s ease .75s 1 forwards'
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
