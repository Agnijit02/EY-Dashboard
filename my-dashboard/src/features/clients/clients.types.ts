export type ClientStatus = 'active' | 'inactive' | 'at-risk';

export type Industry = 'Technology' | 'Financial' | 'Healthcare' | 'Consulting' | 'Retail';

export interface Client {
	id: string;
	name: string;
	code: string;
	industry: Industry;
	status: ClientStatus;
	activeProjects: number;
	totalRevenue: number; // in ₹ Cr
	accountManager: string;
	primaryContact: string;
	email: string;
	location: string;
	description: string;
	joinedDate: string;
}

export interface ClientFilters {
	search: string;
	industry: Industry | 'all';
	status: ClientStatus | 'all';
}

export interface ClientPagination {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface ClientsResponse {
	clients: Client[];
	pagination: ClientPagination;
}