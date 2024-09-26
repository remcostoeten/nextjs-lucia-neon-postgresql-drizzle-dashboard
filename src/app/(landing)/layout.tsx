import { DropdownNavigation } from "@/components/elements/DropdownNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <DropdownNavigation />
      {children}
    </section>
  );
}
