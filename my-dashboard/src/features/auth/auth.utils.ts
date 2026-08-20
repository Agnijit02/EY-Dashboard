import type { UserRole } from './auth.types';

export function hasRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
	return allowedRoles.includes(userRole);
}
