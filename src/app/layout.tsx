import AuthStatusIndicator from '@/components/_development-utils/auth-status-indicator'
import ThemeWrapper, { metadata } from '@/components/base/ThemeWrapper'
import { geistMono, geistSans, ptMono } from '@/core/config/fonts/fonts'
import '../styles/app.scss'

export { metadata }

export default function RootLayout({ children }: PageProps) {
	return (
		<html
			lang="en"
			dir="ltr"
			className="scroll-smooth dark"
			color-scheme="dark"
			suppressHydrationWarning
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${ptMono.className} antialiased dark:bg-body relative pb-[330px]`}
			>
				<ThemeWrapper>
					<AuthStatusIndicator />
					{children}
				</ThemeWrapper>
			</body>
		</html>
	)
}
