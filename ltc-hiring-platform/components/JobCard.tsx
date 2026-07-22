import Link from 'next/link';
import { Job } from '@/lib/types';

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-gray-300">
      <h3 className="text-xl font-medium tracking-tight">{job.title}</h3>
      <p className="mt-2 text-sm text-gray-500">
        {job.city}, {job.state} · {job.shift} Shift · {job.employment_type}
      </p>
      <p className="mt-3 text-sm text-gray-700">{job.facility?.name}</p>
    </Link>
  );
}
