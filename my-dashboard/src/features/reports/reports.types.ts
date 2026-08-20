export interface ReportKPI {
	label: string;
	value: string;
	change: number;
	trend: 'up' | 'down' | 'neutral';
}

export interface RevenuePoint {
	month: string;
	revenue: number;
	target: number;
}

export interface ProjectPerformance {
	projectId: string;
	projectName: string;
	completion: number;
	budgetUtilization: number;
	health: 'healthy' | 'at-risk' | 'critical';
}

export interface ResourceUtilization {
	department: string;
	utilization: number;
	capacity: number;
}

export interface RiskDistribution {
	severity: 'low' | 'medium' | 'high' | 'critical';
	count: number;
}

export interface ClientPerformance {
	clientId: string;
	clientName: string;
	projects: number;
	revenue: number;
	health: 'healthy' | 'at-risk' | 'critical';
}

export interface ReportsData {
	kpis: ReportKPI[];
	revenueTrend: RevenuePoint[];
	projectPerformance: ProjectPerformance[];
	resourceUtilization: ResourceUtilization[];
	riskDistribution: RiskDistribution[];
	clientPerformance: ClientPerformance[];
}
