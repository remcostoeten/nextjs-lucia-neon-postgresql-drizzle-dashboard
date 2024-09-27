import ThemeWrapper, { metadata } from '@/components/base/ThemeWrapper'
import '../styles/app.scss'
export { metadata }

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return <ThemeWrapper>{children}</ThemeWrapper>
}
