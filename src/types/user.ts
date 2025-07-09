// src/types/user.ts
export type UserRole = 'admin' | 'staff' | 'manager';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: UserRole;
  business_id: string;
  created_at?: string;
}