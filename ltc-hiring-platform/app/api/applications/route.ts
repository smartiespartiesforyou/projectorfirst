import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { firstName, lastName, email, phone, resumeUrl, jobId, screeningAnswers } = payload;

    if (!firstName || !lastName || !email || !phone || !resumeUrl || !jobId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: applicant, error: applicantError } = await supabaseAdmin
      .from('applicants')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        resume_url: resumeUrl
      })
      .select('id')
      .single();

    if (applicantError) {
      return NextResponse.json({ error: applicantError.message }, { status: 400 });
    }

    const { error: applicationError } = await supabaseAdmin.from('applications').insert({
      applicant_id: applicant.id,
      job_id: jobId,
      status: 'New',
      screening_answers: screeningAnswers
    });

    if (applicationError) {
      return NextResponse.json({ error: applicationError.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
