import type { LucideIcon } from 'lucide-react';
import {
	BarChart3,
	BriefcaseBusiness,
	Building2,
	FileText,
	LayoutDashboard,
	ShieldAlert,
	Users,
} from 'lucide-react';
import type { UserRole } from '../features/auth/auth.types';
import { permissions } from '../features/auth/permissions';

export interface NavigationItem {
	label: string;
	path: string;
	icon: LucideIcon;
	roles: UserRole[];
}

export const navigationItems: NavigationItem[] = [
	{
		label: 'Dashboard',
		path: '/dashboard',
		icon: LayoutDashboard,
		roles: permissions.dashboard,
	},
	{
		label: 'Analytics',
		path: '/analytics',
		icon: BarChart3,
		roles: permissions.analytics,
	},
	{
		label: 'Projects',
		path: '/projects',
		icon: BriefcaseBusiness,
		roles: permissions.projects,
	},
	{
		label: 'Clients',
		path: '/clients',
		icon: Building2,
		roles: permissions.clients,
	},
	{
		label: 'Resources',
		path: '/resources',
		icon: Users,
		roles: permissions.resources,
	},
	{
		label: 'Risks',
		path: '/risks',
		icon: ShieldAlert,
		roles: permissions.risks,
	},
	{
		label: 'Reports',
		path: '/reports',
		icon: FileText,
		roles: permissions.reports,
	},
];