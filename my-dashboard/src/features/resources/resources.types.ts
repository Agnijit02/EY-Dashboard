export type ResourceDepartment = 'Technology' | 'Consulting' | 'Operations' | 'Data' | 'Design';

export type ResourceRole =
	| 'Senior Architect'
	| 'Project Manager'
	| 'Full Stack Engineer'
	| 'Data Scientist'
	| 'UX Designer'
	| 'DevOps Lead';

export type AvailabilityStatus = 'available' | 'partially-allocated' | 'fully-allocated' | 'over-allocated';

export interface Resource {
	id: string;
	name: string;
	email: string;
	role: ResourceRole;
	department: ResourceDepartment;
	location: string;
	allocationPercentage: number;
	availabilityStatus: AvailabilityStatus;
	assignedProjects: string[];
	billableRate: number;
	skills: string[];
	experience: number;
}

export interface CreateResourcePayload {
	name: string;
	email: string;
	role: ResourceRole;
	department: ResourceDepartment;
	location: string;
	allocationPercentage: number;
	assignedProjects?: string[];
	billableRate?: number;
	skills?: string[];
	experience?: number;
}

export interface ResourceFilters {
	search: string;
	department: ResourceDepartment | 'all';
	role: ResourceRole | 'all';
	availability: AvailabilityStatus | 'all';
}

export interface ResourcePagination {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface ResourcesResponse {
	resources: Resource[];
	pagination: ResourcePagination;
}