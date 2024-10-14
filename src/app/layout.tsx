import ThemeWrapper, { metadata } from '@/components/base/ThemeWrapper'
import '../styles/app.scss'

export { metadata }

export default function RootLayout({ children }: PageProps) {
	return (
		<html
			lang="en"
			dir="ltr"
			className="scroll-smooth "
			// color-scheme="dark"
			suppressHydrationWarning
		>
			{/* <body
				className={`${geistSans.variable} ${geistMono.variable} ${ptMono.className} antialiased `}
			> */}
			<body className="antialiased bg-base">
				<ThemeWrapper>{children}</ThemeWrapper>
			</body>
		</html>
	)
}
