'use client'

import * as React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'
import { TooltipProvider } from 'ui'

import type { ThemeProviderProps } from 'next-themes/dist/types'

type Props = {
	theme?: ThemeProviderProps
	children: React.ReactNode
}

export function Providers({ children, theme }: Props) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			disableTransitionOnChange
			{...theme}
		>
			<SessionProvider>
				<TooltipProvider delayDuration={0}>
					<NextTopLoader
						color="#89777d"
						height={3}
						showSpinner={false}
						speed={200}
						zIndex={9999}
						initialPosition={0.55}
					/>
					<Toaster />

					{children}
					<Analytics />
					<SpeedInsights />
				</TooltipProvider>
			</SessionProvider>
		</ThemeProvider>
	)
}
