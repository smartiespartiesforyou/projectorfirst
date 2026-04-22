import { supabase } from '@/lib/supabase';
import { Job } from '@/lib/types';

export async function getActiveJobs(query?: { title?: string; location?: string }): Promise<Job[]> {
  let request = supabase
    .from('jobs')
    .select('*, facility:facilities(name)')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (query?.title) request = request.ilike('title', `%${query.title}%`);
  if (query?.location) request = request.ilike('city', `%${query.location}%`);

  const { data, error } = await request;

  if (error) {
    console.error('Could not load jobs', error.message);
    return [];
  }

  return (data as Job[]) ?? [];
}

export async function getJobById(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*, facility:facilities(name)')
    .eq('id', id)
    .eq('status', 'active')
    .single();

  if (error) {
    console.error('Could not load job', error.message);
    return null;
  }

  return data as Job;
}
