import { DropdownNavigation } from '@/components/elements/dropdown-navigation'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<DropdownNavigation />
			{children}
		</>

	)
}
