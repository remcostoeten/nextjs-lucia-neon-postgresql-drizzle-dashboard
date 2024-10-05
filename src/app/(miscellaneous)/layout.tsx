import { DropdownNavigation } from '@/components/elements'

export default function ShowcaseLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<DropdownNavigation />
			<main className="min-h-screen mt-24 mx-auto  max-w-[90vw]">
				{children}
			</main>
		</>
	)
}
