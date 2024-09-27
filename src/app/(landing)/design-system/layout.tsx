
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <main className="min-h-screen mt-24 mx-auto  max-w-[90vw]">
        {children}
      </main>
    </section>
  );
}
