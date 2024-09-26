import { DropdownNavigation } from "@/components/elements/DropdownNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <DropdownNavigation />
      <main className="min-h-screen mt-24 ">{children}</main>

    </section>
  );
}
