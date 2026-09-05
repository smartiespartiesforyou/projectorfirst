import Link from "next/link";

export function PageHeader() {
  return (
    <header className="mb-14 flex items-center justify-between border-b border-mist pb-6">
      <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">
        LTC Hiring
      </Link>
      <Link href="/jobs" className="text-sm">
        Browse Jobs
      </Link>
    </header>
  );
}
