import { geistMono, geistSans } from '@/core/config/fonts/fonts'
import { metadata } from '@/core/config/metadata/metadata.root-layout'
import { Toaster, TooltipProvider } from 'ui'
export { metadata }

export default function ThemeWrapper({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			dir="ltr"
			className="scroll-smooth dark"
			color-scheme="dark"
			suppressHydrationWarning
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-body relative pb-[330px]`}
			>
				<TooltipProvider>
					<main>
						<Toaster richColors />
						{children}
					</main>
				</TooltipProvider>
			</body>
		</html>
	)
}
