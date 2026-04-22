import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function HomePage() {
  return (
    <>
      <PageHeader />
      <section className="space-y-8">
        <p className="text-sm uppercase tracking-[0.2em] text-moss">Long-Term Care Hiring</p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
          A calmer way to match care professionals with long-term care teams.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
          Thoughtful job listings. Short fit checks. Better applications for nursing homes, assisted living, and
          senior care communities.
        </p>
        <div>
          <Link
            href="/jobs"
            className="inline-flex items-center rounded-full bg-moss px-6 py-3 text-sm font-medium text-white hover:bg-ink"
          >
            View Open Roles
          </Link>
        </div>
      </section>
    </>
  );
}
