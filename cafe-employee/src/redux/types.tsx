export interface Cafe {
  id: string;
  name: string;
  description: string;
  logo: string;
  location: string;
  employees: number;
  actions: React.ReactNode;
}

export interface Employee {
  id: string;
  name: string;
  email_address: string;
  phone_number: string;
  gender: string;
  cafe_location: string;
  cafe: string;
  start_date: Date;
  actions: React.ReactNode;
  num_of_work_days: string;
}

export interface CafeEmployeeState {
  cafes: Cafe[];
  cafe: Cafe | null;
  employees: Employee[];
  employee: Employee | null;
  error: boolean;
  isLoading: boolean;
  loc: string;
}
