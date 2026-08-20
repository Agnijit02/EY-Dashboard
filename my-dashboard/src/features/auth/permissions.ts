import type { UserRole } from './auth.types';

export const permissions = {
  // Navigation & Route access
  dashboard: ['ADMIN', 'MANAGER', 'VIEWER'] as UserRole[],
  analytics: ['ADMIN', 'MANAGER'] as UserRole[],
  projects: ['ADMIN', 'MANAGER', 'VIEWER'] as UserRole[],
  clients: ['ADMIN', 'MANAGER', 'VIEWER'] as UserRole[],
  resources: ['ADMIN', 'MANAGER', 'VIEWER'] as UserRole[],
  risks: ['ADMIN', 'MANAGER', 'VIEWER'] as UserRole[],
  reports: ['ADMIN', 'MANAGER', 'VIEWER'] as UserRole[],

  // Entity mutations & actions (Strictly forbidden for VIEWER)
  createProject: ['ADMIN', 'MANAGER'] as UserRole[],
  editProject: ['ADMIN', 'MANAGER'] as UserRole[],
  deleteProject: ['ADMIN'] as UserRole[],

  createResource: ['ADMIN', 'MANAGER'] as UserRole[],
  editResource: ['ADMIN', 'MANAGER'] as UserRole[],
  deleteResource: ['ADMIN'] as UserRole[],

  createRisk: ['ADMIN', 'MANAGER'] as UserRole[],
  editRisk: ['ADMIN', 'MANAGER'] as UserRole[],
  deleteRisk: ['ADMIN'] as UserRole[],
};

export function canUserPerform(role: UserRole | undefined, allowedRoles: UserRole[]): boolean {
  if (!role) return false;
  return allowedRoles.includes(role);
}
