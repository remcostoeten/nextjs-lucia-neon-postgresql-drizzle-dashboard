import ThemeWrapper from '@/components/base/theme-wrapper'
import Footer from './(landing)/_components/footer/footer'
import Header from './(landing)/_components/navigation/header'

export default function RootLayout({ children }: PageProps) {
	return (
		<ThemeWrapper>
			<Header />
			<main className="">{children}</main>

			<Footer />
		</ThemeWrapper>
	)
}
