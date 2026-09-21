import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getJobBySlug } from "@/lib/jobs";

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  return (
    <>
      <PageHeader />
      <article className="space-y-12">
        <section className="space-y-4">
          <Link href="/jobs" className="text-sm">
            ← Back to jobs
          </Link>
          <h1 className="text-3xl font-semibold">{job.title}</h1>
          <p className="text-slate-600">
            {job.facility} · {job.location} · {job.schedule}
          </p>
          <p className="font-medium text-moss">{job.payRange}</p>
          <p className="max-w-2xl leading-relaxed text-slate-700">{job.summary}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Role focus</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-5 rounded-2xl border border-mist bg-white p-6">
          <h2 className="text-xl font-semibold">Fit check</h2>
          <p className="text-sm text-slate-600">
            Please answer each prompt before submitting your application.
          </p>
          {job.fitQuestions.map((question, index) => (
            <div key={question} className="space-y-2">
              <label htmlFor={`fit-${index}`} className="block text-sm font-medium text-slate-700">
                {index + 1}. {question}
              </label>
              <textarea
                id={`fit-${index}`}
                name={`fit-${index}`}
                required
                rows={3}
                className="w-full rounded-xl border border-mist px-3 py-2 text-sm focus:border-moss focus:outline-none"
              />
            </div>
          ))}
        </section>

        <section className="space-y-5 rounded-2xl border border-mist bg-white p-6">
          <h2 className="text-xl font-semibold">Application</h2>
          <form className="space-y-4">
            <Field label="Full name" name="full_name" type="text" />
            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" type="tel" />
            <Field label="Years in long-term care" name="experience_years" type="number" />
            <div className="space-y-2">
              <label htmlFor="license" className="block text-sm font-medium text-slate-700">
                License / certification details
              </label>
              <textarea
                id="license"
                name="license"
                rows={3}
                className="w-full rounded-xl border border-mist px-3 py-2 text-sm focus:border-moss focus:outline-none"
              />
            </div>
            <button type="submit" className="rounded-full bg-moss px-6 py-3 text-sm font-medium text-white hover:bg-ink">
              Submit application
            </button>
          </form>
        </section>
      </article>
    </>
  );
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        required
        id={name}
        name={name}
        type={type}
        className="w-full rounded-xl border border-mist px-3 py-2 text-sm focus:border-moss focus:outline-none"
      />
    </div>
  );
}
