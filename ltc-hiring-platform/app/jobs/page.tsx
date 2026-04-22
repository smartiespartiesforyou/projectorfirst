import { JobCard } from '@/components/JobCard';
import { getActiveJobs } from '@/lib/data';

interface JobsPageProps {
  searchParams: { job?: string; location?: string };
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const jobs = await getActiveJobs({ title: searchParams.job, location: searchParams.location });

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Long-Term Care Jobs</h1>
        <p className="text-sm text-gray-600">A calm, focused job list built for caregiving professionals.</p>
      </header>

      <form className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
        <input type="text" name="job" placeholder="Job title" defaultValue={searchParams.job} />
        <input type="text" name="location" placeholder="City" defaultValue={searchParams.location} />
        <button className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white">Update search</button>
      </form>

      <section className="space-y-5">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        {jobs.length === 0 && <p className="text-gray-500">No matching roles.</p>}
      </section>
    </div>
  );
}
