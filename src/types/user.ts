// src/types/user.ts
export type UserRole = 'admin' | 'staff' | 'manager';

export interface User {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  tier: string;
  role?: UserRole;
  business_id?: string;
  created_at?: string;
}

export interface Business {
  id?: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  custom_domain: string;
  theme_id?: string;
  created_at?: string;
}
