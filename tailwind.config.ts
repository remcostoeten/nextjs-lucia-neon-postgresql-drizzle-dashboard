import tailwindcssAnimate from 'tailwindcss-animate'
import { fontFamily } from 'tailwindcss/defaultTheme'

import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'2xl': '1280px'
			}
		},
		extend: {
			maxWidth: {
				'big-wrapper': '1128px',
				wrapper: '984px'
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
				mono: ['var(--font-mono)', ...fontFamily.mono],
				heading: ['var(--font-heading)', ...fontFamily.sans],
				handwriting: ['var(--font-handwriting)', ...fontFamily.sans]
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
	plugins: [tailwindcssAnimate]
}

export default config
