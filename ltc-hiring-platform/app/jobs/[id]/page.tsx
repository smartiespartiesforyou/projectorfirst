import { notFound } from 'next/navigation';
import { FitCheckApplication } from '@/components/FitCheckApplication';
import { Section } from '@/components/Section';
import { getJobById } from '@/lib/data';

interface JobDetailProps {
  params: { id: string };
}

export default async function JobDetailPage({ params }: JobDetailProps) {
  const job = await getJobById(params.id);
  if (!job) notFound();

  const requirements = job.requirements.split('\n').filter(Boolean);

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-stone">{job.facility?.name}</p>
        <h1 className="text-4xl font-semibold tracking-tight">{job.title}</h1>
        <p className="text-sm text-gray-600">
          {job.city}, {job.state} · {job.shift} Shift · {job.employment_type}
        </p>
      </header>

      <Section title="Before You Apply">
        <ul className="list-disc space-y-2 pl-5">
          {requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </Section>

      <FitCheckApplication jobId={job.id} />

      <Section title="Job Details">
        <p>{job.description}</p>
      </Section>
    </article>
  );
}
