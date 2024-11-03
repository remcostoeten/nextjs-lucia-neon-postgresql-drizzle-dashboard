import '@/styles/app.scss'

import React from 'react'

import AuthIndicator from '@/components/dev/auth-indicator'
import { Providers } from '@/components/providers'
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Providers>
						{children}
						<AuthIndicator />
					</Providers>
				</ThemeProvider>
			</body>
		</html>
	)
}
