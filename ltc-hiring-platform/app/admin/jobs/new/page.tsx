'use client';

import { FormEvent, useState } from 'react';

export default function NewJobPage() {
  const [message, setMessage] = useState<string>('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const response = await fetch('/api/admin/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': String(data.get('adminToken'))
      },
      body: JSON.stringify({
        facilityId: data.get('facilityId'),
        title: data.get('title'),
        category: data.get('category'),
        employmentType: data.get('employmentType'),
        shift: data.get('shift'),
        city: data.get('city'),
        state: data.get('state'),
        description: data.get('description'),
        requirements: data.get('requirements')
      })
    });

    if (!response.ok) {
      setMessage('Could not create job. Confirm admin token and fields.');
      return;
    }

    setMessage('Job created successfully.');
    form.reset();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Create Job (Admin)</h1>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
        <input required type="password" name="adminToken" placeholder="Admin token" />
        <input required name="facilityId" placeholder="Facility ID" />
        <input required name="title" placeholder="Job title" />
        <input required name="category" placeholder="Category (Nursing, Therapy...)" />
        <select required name="employmentType">
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>PRN</option>
          <option>Baylor</option>
        </select>
        <select required name="shift">
          <option>Day</option>
          <option>Evening</option>
          <option>Night</option>
        </select>
        <input required name="city" placeholder="City" />
        <input required name="state" placeholder="State" />
        <textarea required name="description" rows={5} placeholder="Role description" />
        <textarea required name="requirements" rows={5} placeholder="One requirement per line" />
        <button className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white">Create job</button>
      </form>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}
