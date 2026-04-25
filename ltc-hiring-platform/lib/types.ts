export type EmploymentType = 'Full-Time' | 'Part-Time' | 'PRN' | 'Baylor';
export type Shift = 'Day' | 'Evening' | 'Night';

export interface Facility {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  description: string | null;
  active: boolean;
}

export interface Job {
  id: string;
  facility_id: string;
  title: string;
  category: string;
  employment_type: EmploymentType;
  shift: Shift;
  city: string;
  state: string;
  description: string;
  requirements: string;
  status: 'active' | 'inactive';
  created_at: string;
  facility?: Pick<Facility, 'name'>;
}
