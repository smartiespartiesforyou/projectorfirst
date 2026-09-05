'use client';

import { FormEvent, useMemo, useState } from 'react';

const QUESTIONS = [
  { key: 'license', label: 'I hold the required active license/certification for this role.' },
  { key: 'shift', label: 'I can work the listed shift consistently.' },
  { key: 'transportation', label: 'I have reliable transportation to this facility.' }
] as const;

export function FitCheckApplication({ jobId }: { jobId: string }) {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const allAnswered = useMemo(() => QUESTIONS.every((q) => answers[q.key] !== null && answers[q.key] !== undefined), [answers]);
  const passed = useMemo(() => QUESTIONS.every((q) => answers[q.key] === true), [answers]);

  async function onApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitted(true);
    setMessage(null);

    const response = await fetch('/api/applications', {
      method: 'POST',
      body: JSON.stringify({
        jobId,
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        phone: data.get('phone'),
        email: data.get('email'),
        resumeUrl: data.get('resumeUrl'),
        screeningAnswers: answers
      })
    });

    if (!response.ok) {
      setMessage('We could not submit your application. Please check your details and try again.');
      return;
    }

    form.reset();
    setMessage('Application sent successfully. Thank you for your interest.');
  }

  return (
    <div className="space-y-8 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Fit Check</h3>
        <p className="text-sm text-gray-600">Please answer every item before you continue. We only accept applications that meet all requirements.</p>
        <div className="space-y-5">
          {QUESTIONS.map((question) => (
            <div key={question.key} className="space-y-2">
              <p className="text-sm text-ink">{question.label}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`rounded-full border px-4 py-1.5 text-sm ${answers[question.key] === true ? 'border-accent bg-accent text-white' : 'border-gray-300 text-gray-700'}`}
                  onClick={() => setAnswers((prev) => ({ ...prev, [question.key]: true }))}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`rounded-full border px-4 py-1.5 text-sm ${answers[question.key] === false ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 text-gray-700'}`}
                  onClick={() => setAnswers((prev) => ({ ...prev, [question.key]: false }))}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {allAnswered && !passed && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Based on your fit check, this role may not be the best match right now.
        </div>
      )}

      {allAnswered && passed && (
        <form onSubmit={onApply} className="space-y-4 border-t border-gray-200 pt-6">
          <h3 className="text-xl font-semibold">Application Form</h3>
          <input required name="firstName" placeholder="First name" />
          <input required name="lastName" placeholder="Last name" />
          <input required name="phone" placeholder="Phone" />
          <input required type="email" name="email" placeholder="Email" />
          <input required name="resumeUrl" placeholder="Resume URL (Supabase storage/public link)" />
          <button disabled={submitted} className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white disabled:opacity-60">
            {submitted ? 'Submitting...' : 'Submit application'}
          </button>
        </form>
      )}

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}
