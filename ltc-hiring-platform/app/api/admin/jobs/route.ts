import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

function isAuthorized(request: Request) {
  const token = request.headers.get('x-admin-token');
  return token && token === process.env.ADMIN_PORTAL_TOKEN;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const { facilityId, title, category, employmentType, shift, city, state, description, requirements } = payload;

  if (!facilityId || !title || !category || !employmentType || !shift || !city || !state || !description || !requirements) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('jobs').insert({
    facility_id: facilityId,
    title,
    category,
    employment_type: employmentType,
    shift,
    city,
    state,
    description,
    requirements,
    status: 'active'
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
