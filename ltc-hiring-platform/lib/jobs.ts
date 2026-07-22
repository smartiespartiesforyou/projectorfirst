export type Job = {
  id: string;
  slug: string;
  title: string;
  facility: string;
  location: string;
  schedule: string;
  payRange: string;
  summary: string;
  responsibilities: string[];
  fitQuestions: string[];
};

export const jobs: Job[] = [
  {
    id: "job-001",
    slug: "certified-nursing-assistant-evening",
    title: "Certified Nursing Assistant (Evening Shift)",
    facility: "Willow Gardens Senior Living",
    location: "Cincinnati, OH",
    schedule: "Full-time · Evening",
    payRange: "$21–$25 / hour",
    summary:
      "Support residents with daily care in a warm assisted living environment focused on dignity and consistency.",
    responsibilities: [
      "Assist with ADLs including mobility, bathing, and meal support",
      "Report care observations clearly to nursing leadership",
      "Help maintain a calm and respectful resident environment"
    ],
    fitQuestions: [
      "Can you describe a time you helped a resident through a difficult moment?",
      "How do you stay calm when several resident needs happen at once?",
      "Why does long-term care work matter to you right now?"
    ]
  },
  {
    id: "job-002",
    slug: "licensed-practical-nurse-weekend",
    title: "Licensed Practical Nurse (Weekend Program)",
    facility: "Harborview Nursing & Rehab",
    location: "Tampa, FL",
    schedule: "Part-time · Weekends",
    payRange: "$31–$36 / hour",
    summary:
      "Deliver resident-centered clinical care and collaborate with CNAs and RNs to keep care plans on track.",
    responsibilities: [
      "Administer medications and treatments accurately",
      "Communicate resident updates with families and care teams",
      "Document interventions in a timely, complete manner"
    ],
    fitQuestions: [
      "What does compassionate clinical communication look like to you?",
      "How do you balance speed and accuracy during med pass?",
      "What would your previous charge nurse say about your teamwork?"
    ]
  }
];

export const getJobBySlug = (slug: string) => jobs.find((job) => job.slug === slug);
