export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 border-t border-gray-200 pt-8">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-gray-700">{children}</div>
    </section>
  );
}
