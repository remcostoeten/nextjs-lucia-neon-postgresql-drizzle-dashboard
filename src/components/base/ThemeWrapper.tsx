'use client'

import { metadata } from '@/core/config/metadata/metadata.root-layout'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import NextTopLoader from 'nextjs-toploader'
import { Toaster, TooltipProvider } from 'ui'
import { ThemeProvider } from '../ThemeProvider'

export { metadata }

export default function ThemeWrapper({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{' '}
				<TooltipProvider>
					<NextTopLoader
						color="#89777d"
						height={3}
						showSpinner={false}
						speed={200}
						zIndex={9999}
						initialPosition={0.55}
					/>
					<>
						<Toaster richColors position="center" />
						{children}
					</>
				</TooltipProvider>
				<Analytics />
				<SpeedInsights />
			</ThemeProvider>
		</>
	)
}
