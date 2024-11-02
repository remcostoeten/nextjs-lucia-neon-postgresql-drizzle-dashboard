import '@/styles/app.scss'

import React from 'react'

import AuthIndicator from '@/components/dev/auth-indicator'
import { Providers } from '@/components/providers'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>
					{children}
					<AuthIndicator />
				</Providers>
			</body>
		</html>
	)
}
