import Link from 'next/link';
import { getActiveJobs } from '@/lib/data';
import { JobCard } from '@/components/JobCard';

interface HomeProps {
  searchParams: { job?: string; location?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const jobs = await getActiveJobs({ title: searchParams.job, location: searchParams.location });

  return (
    <div className="space-y-12">
      <header className="space-y-5">
        <p className="text-xs uppercase tracking-[0.2em] text-stone">Long-Term Care Careers</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Jobs in Long-Term Care</h1>
        <p className="max-w-2xl text-base leading-7 text-gray-600">
          Discover meaningful roles in nursing homes, assisted living communities, and senior care centers. Apply only when a role is the right fit.
        </p>
      </header>

      <form action="/" className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
        <input type="text" name="job" placeholder="Search job title (CNA, LPN, RN...)" defaultValue={searchParams.job} />
        <input type="text" name="location" placeholder="City" defaultValue={searchParams.location} />
        <button className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white">Search jobs</button>
      </form>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Open roles</h2>
          <Link href="/jobs" className="text-sm text-gray-600 underline-offset-4 hover:underline">
            Browse all
          </Link>
        </div>
        <div className="space-y-4">
          {jobs.slice(0, 5).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          {jobs.length === 0 && <p className="text-sm text-gray-500">No active roles found right now.</p>}
        </div>
      </section>
    </div>
  );
}
