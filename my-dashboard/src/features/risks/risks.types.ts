export type RiskStatus = 'open' | 'monitoring' | 'mitigated' | 'closed';

export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export type RiskCategory = 'technical' | 'financial' | 'operational' | 'security' | 'resource' | 'compliance';

export interface Risk {
	id: string;
	riskId: string;
	title: string;
	description: string;
	projectId: string;
	projectName: string;
	category: RiskCategory;
	probability: number;
	impact: number;
	score: number;
	severity: RiskSeverity;
	status: RiskStatus;
	owner: string;
	dueDate: string;
	mitigationPlan: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateRiskPayload {
	title: string;
	description: string;
	projectName: string;
	category: RiskCategory;
	probability: number;
	impact: number;
	owner?: string;
	dueDate?: string;
	mitigationPlan?: string;
}

export interface RiskFilters {
	search: string;
	severity: RiskSeverity | 'all';
	status: RiskStatus | 'all';
	category: RiskCategory | 'all';
}

export interface RiskPagination {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface RisksResponse {
	risks: Risk[];
	pagination: RiskPagination;
}
