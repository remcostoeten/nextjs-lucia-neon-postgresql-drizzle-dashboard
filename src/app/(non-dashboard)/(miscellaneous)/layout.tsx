export default function ShowcaseLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<main className="min-h-screen mt-24 mx-auto  max-w-[90vw]">
				{children}
			</main>
		</>
	)
}
