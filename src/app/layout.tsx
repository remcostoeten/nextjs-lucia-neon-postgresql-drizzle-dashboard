import ColorPicker from '@/components/_development-utils/color-picker'
import ThemeWrapper, { metadata } from '@/components/base/ThemeWrapper'
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
			{/* <body
				className={`${geistSans.variable} ${geistMono.variable} ${ptMono.className} antialiased `}
			> */}
			<body className="antialiased">
				<ThemeWrapper>
					{/* Makes infinite requests for some reason.<AuthStatusIndicator /> */}
					{children}
					<ColorPicker />
				</ThemeWrapper>
			</body>
		</html>
	)
}
