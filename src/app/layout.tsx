import ThemeWrapper, { metadata } from '@/components/base/ThemeWrapper'
import '../styles/app.scss'
import Navigation from './(landing)/_components/navigation/navigation'
import Footer from '@/app/(landing)/_components/footer/footer'

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
				<ThemeWrapper>
					<Navigation />
					{children}
					<Footer />
				</ThemeWrapper>
			</body>
		</html>
	)
}
