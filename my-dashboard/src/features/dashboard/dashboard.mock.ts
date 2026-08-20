import type { DashboardData } from './dashboard.types';

export const dashboardMockData: DashboardData = {
	kpis: [
		{ id: 'revenue', title: 'Total Revenue', value: '₹24.8 Cr', change: '12.5%', changeType: 'positive', description: 'vs previous period' },
		{ id: 'projects', title: 'Active Projects', value: '128', change: '8.2%', changeType: 'positive', description: 'vs previous period' },
		{ id: 'utilization', title: 'Resource Utilization', value: '87.4%', change: '4.1%', changeType: 'positive', description: 'vs previous period' },
		{ id: 'satisfaction', title: 'Client Satisfaction', value: '92%', change: '2.8%', changeType: 'positive', description: 'vs previous period' },
	],
	revenue: [
		{ month: 'Jan', revenue: 12, target: 11 },
		{ month: 'Feb', revenue: 15, target: 13 },
		{ month: 'Mar', revenue: 14, target: 14 },
		{ month: 'Apr', revenue: 18, target: 16 },
		{ month: 'May', revenue: 20, target: 18 },
		{ month: 'Jun', revenue: 24, target: 21 },
		{ month: 'Jul', revenue: 23, target: 22 },
		{ month: 'Aug', revenue: 27, target: 24 },
	],
	projectHealth: [
		{ name: 'Completed', value: 64 },
		{ name: 'Active', value: 42 },
		{ name: 'At Risk', value: 10 },
		{ name: 'Delayed', value: 12 },
	],
	regionalPerformance: [
		{ region: 'India', revenue: 9.2, growth: 14 },
		{ region: 'Europe', revenue: 6.4, growth: 11 },
		{ region: 'Americas', revenue: 5.8, growth: 19 },
		{ region: 'APAC', revenue: 3.4, growth: 8 },
	],
	risks: [
		{ level: 'Critical', count: 3 },
		{ level: 'High', count: 8 },
		{ level: 'Medium', count: 14 },
		{ level: 'Low', count: 27 },
	],
	activities: [
		{ id: '1', title: 'Project Phoenix updated', description: 'Project progress was updated to 82%', timestamp: '10 minutes ago', type: 'project' },
		{ id: '2', title: 'New client added', description: 'ABC Corporation was added to the portfolio', timestamp: '35 minutes ago', type: 'client' },
		{ id: '3', title: 'Risk level changed', description: 'Infrastructure migration moved to Critical', timestamp: '1 hour ago', type: 'risk' },
		{ id: '4', title: 'Report generated', description: 'Monthly performance report is ready', timestamp: '2 hours ago', type: 'report' },
	],
};