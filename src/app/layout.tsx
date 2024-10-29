import ThemeWrapper from '@/components/base/ThemeWrapper'
import { metadata as rootMetadata } from '@/core/config/metadata/metadata.root-layout'
import { Metadata } from 'next'
import '../styles/app.scss'

export const metadata: Metadata = rootMetadata

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="en"
			dir="ltr"
			className="scroll-smooth"
			suppressHydrationWarning
		>
			<body className="antialiased bg-base">
				<ThemeWrapper>{children}</ThemeWrapper>
			</body>
		</html>
	)
}
