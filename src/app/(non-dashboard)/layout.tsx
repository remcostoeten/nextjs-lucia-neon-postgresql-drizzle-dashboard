import ThemeWrapper from '@/components/base/ThemeWrapper'
import Footer from './(landing)/_components/footer/footer'
import Header from './(landing)/_components/navigation/header'

export default function RootLayout({ children }: PageProps) {
	return (
		<ThemeWrapper>
			<Header />
			{children}
			<Footer />
		</ThemeWrapper>
	)
}
