import AuthStatusIndicator from '@/components/_development-utils/auth-status-indicator'
import ThemeWrapper, { metadata } from '@/components/base/ThemeWrapper'
import '../styles/app.scss'
export { metadata }

type PageProps = {
	children: React.ReactNode
}

export default function RootLayout({ children }: PageProps) {
	return (
		<ThemeWrapper>
			<AuthStatusIndicator />
			{children}
		</ThemeWrapper>
	)
}
