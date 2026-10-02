import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { jobs } from "@/lib/jobs";

export default function JobsPage() {
  return (
    <>
      <PageHeader />
      <section className="space-y-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold">Current openings</h1>
          <p className="text-slate-600">Each role includes a short fit check before application.</p>
        </div>
        <div className="space-y-6">
          {jobs.map((job) => (
            <article key={job.id} className="space-y-3 rounded-2xl border border-mist bg-white p-6">
              <p className="text-sm text-slate-500">{job.facility}</p>
              <h2 className="text-2xl font-medium">{job.title}</h2>
              <p className="text-sm text-slate-600">
                {job.location} · {job.schedule} · {job.payRange}
              </p>
              <p className="text-slate-700">{job.summary}</p>
              <Link href={`/jobs/${job.slug}`} className="text-sm font-medium">
                Read details and apply →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
