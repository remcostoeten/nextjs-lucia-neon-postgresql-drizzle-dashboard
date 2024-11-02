'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'

import { ThemeProvider } from '../theme-provider'
import { TooltipProvider } from '../ui'

export default function ThemeWrapper({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
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
			</TooltipProvider>
			e <Analytics />
			<SpeedInsights />
		</ThemeProvider>
	)
}
