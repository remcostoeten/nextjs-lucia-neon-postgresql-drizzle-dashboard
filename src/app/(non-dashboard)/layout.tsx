import ThemeWrapper from '@/components/base/ThemeWrapper'
import Footer from './(landing)/_components/footer/footer'
import Header from './(landing)/_components/navigation/header'

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
					<Header />
					{children}
					<Footer />
				</ThemeWrapper>
			</body>
		</html>
	)
}
