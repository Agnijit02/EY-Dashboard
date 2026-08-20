export type ProjectStatus = 'active' | 'completed' | 'at-risk' | 'delayed';

export type ProjectRegion = 'india' | 'europe' | 'americas' | 'apac';

export interface Project {
	id: string;
	name: string;
	code: string;
	client: string;
	manager: string;
	status: ProjectStatus;
	region: ProjectRegion;
	department: string;
	budget: number;
	spent: number;
	progress: number;
	startDate: string;
	endDate: string;
	teamSize: number;
	description: string;
}

export interface ProjectFilters {
	search: string;
	status: ProjectStatus | 'all';
	region: ProjectRegion | 'all';
	manager: string | 'all';
}

export interface ProjectPagination {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface ProjectsResponse {
	projects: Project[];
	pagination: ProjectPagination;
}

/**
 * Payload used when creating a project.
 *
 * We don't ask the frontend user to provide:
 * - id
 * - spent
 *
 * Those are system-managed fields.
 */
export interface CreateProjectPayload {
	name: string;
	code: string;
	client: string;
	manager: string;
	status: ProjectStatus;
	region: ProjectRegion;
	department: string;
	budget: number;
	progress: number;
	startDate: string;
	endDate: string;
	teamSize: number;
	description: string;
}

export interface UpdateProjectPayload extends CreateProjectPayload {
	id: string;
}