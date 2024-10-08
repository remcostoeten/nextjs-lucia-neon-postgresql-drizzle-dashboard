import CsvModifier from "./_components/csv-ig-parser";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">CSV Text Modifier</h1>
      <CsvModifier />
    </main>
  );
}
