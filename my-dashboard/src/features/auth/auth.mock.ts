import type { User } from './auth.types';

export const mockUsers: User[] = [
  {
    id: 'usr-001',
    name: 'Aarav Sharma',
    email: 'admin@enterprise.demo',
    role: 'ADMIN',
    department: 'Technology',
  },
  {
    id: 'usr-002',
    name: 'Priya Patel',
    email: 'manager@enterprise.demo',
    role: 'MANAGER',
    department: 'Consulting',
  },
  {
    id: 'usr-003',
    name: 'Vikram Mehta',
    email: 'viewer@enterprise.demo',
    role: 'VIEWER',
    department: 'Analytics',
  },
];
