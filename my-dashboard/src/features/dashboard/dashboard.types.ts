export interface KPIData {
	id: string;
	title: string;
	value: string;
	change: string;
	changeType: 'positive' | 'negative' | 'neutral';
	description: string;
}

export interface RevenueData {
	month: string;
	revenue: number;
	target: number;
}

export interface ProjectHealthData {
	name: string;
	value: number;
}

export interface RegionProjectItem {
	id: string;
	name: string;
	code: string;
	client: string;
	budget: number;
	progress: number;
	status: string;
}

export interface RegionalPerformanceData {
	region: string;
	revenue: number;
	growth: number;
	projectCount?: number;
	projects?: RegionProjectItem[];
}

export interface RiskProjectItem {
	projectName: string;
	riskTitle: string;
	code?: string;
}

export interface RiskData {
	level: 'Critical' | 'High' | 'Medium' | 'Low';
	count: number;
	projects?: RiskProjectItem[];
}

export interface ActivityData {
	id: string;
	title: string;
	description: string;
	timestamp: string;
	type: 'project' | 'client' | 'risk' | 'report';
}

export interface DashboardData {
	kpis: KPIData[];
	revenue: RevenueData[];
	projectHealth: ProjectHealthData[];
	regionalPerformance: RegionalPerformanceData[];
	risks: RiskData[];
	activities: ActivityData[];
}