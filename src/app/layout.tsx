import ThemeWrapper from '@/components/base/ThemeWrapper'
import '../styles/app.scss'
export default function RootLayout({ children }: PageProps) {
	return (
		<html
			lang="en"
			dir="ltr"
			className="scroll-smooth "
			// color-scheme="dark"
			suppressHydrationWarning
		>
			<body className="antialiased bg-base">
				<ThemeWrapper>{children}</ThemeWrapper>
			</body>
		</html>
	)
}
