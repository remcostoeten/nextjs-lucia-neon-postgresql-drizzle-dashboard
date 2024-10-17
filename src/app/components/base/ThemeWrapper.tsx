'use client'

import { metadata } from '@/core/config/metadata/metadata.root-layout'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import NextTopLoader from 'nextjs-toploader'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { Toaster, TooltipProvider } from 'ui'
import { ThemeProvider } from '../ThemeProvider'

export { metadata }

if (typeof window !== 'undefined') {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
	})
}

export default function ThemeWrapper({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<PostHogProvider client={posthog}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
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
		</PostHogProvider>
	)
}
