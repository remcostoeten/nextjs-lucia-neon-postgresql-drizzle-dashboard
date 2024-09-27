import { DropdownNavigation } from '@/components/elements/dropdown-navigation'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<section>
			<DropdownNavigation />
			<main className="min-h-screen pointer-events-none">{children}</main>
		</section>
	)
}
