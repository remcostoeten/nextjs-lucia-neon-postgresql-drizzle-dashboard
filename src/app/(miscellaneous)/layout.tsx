import { DropdownNavigation } from '@/components/elements'

export default function ShowcaseLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<div className="translate-y-10">
				<DropdownNavigation topPosition='-1rem' showLogo={true} />
			</div>
			<main className="min-h-screen mt-24 mx-auto  max-w-[90vw]">
				{children}
			</main>
		</>
	)
}
