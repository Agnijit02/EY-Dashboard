import { clientsMockData } from '../clients/clients.mock';
import { projectsMockData } from '../projects/projects.mock';
import { resourcesMockData } from '../resources/resources.mock';
import { risksMockData } from '../risks/risks.mock';
import { loadActivities } from './activity.service';
import type { DashboardData, RiskProjectItem } from './dashboard.types';
import type { DashboardFilters } from '../../types/filters';

export async function getDashboardData(filters: DashboardFilters): Promise<DashboardData> {
	await new Promise((resolve) => {
		setTimeout(resolve, 250);
	});

	// 1. Filter projects based on incoming filters
	let activeProjects = [...projectsMockData];

	if (filters.projectStatus && filters.projectStatus !== 'all') {
		activeProjects = activeProjects.filter((p) => p.status === filters.projectStatus);
	}

	if (filters.region && filters.region !== 'all') {
		activeProjects = activeProjects.filter((p) => p.region.toLowerCase() === filters.region.toLowerCase());
	}

	if (filters.department && filters.department !== 'all') {
		activeProjects = activeProjects.filter((p) => p.department.toLowerCase() === filters.department.toLowerCase());
	}

	// 2. Dynamic Financial & Volume Calculations
	const totalBudget = activeProjects.reduce((sum, p) => sum + (Number(p.budget) || 0), 0);
	const totalSpent = activeProjects.reduce((sum, p) => sum + (Number(p.spent) || 0), 0);
	const totalProjectsCount = activeProjects.length;

	// Resource metrics
	const avgUtilization = resourcesMockData.length > 0
		? Math.round(resourcesMockData.reduce((sum, r) => sum + (r.allocationPercentage || 0), 0) / resourcesMockData.length)
		: 85;

	// Project Health breakdown (Dynamic from project list)
	const completedCount = activeProjects.filter((p) => p.status === 'completed').length;
	const inProgressCount = activeProjects.filter((p) => p.status === 'active').length;
	const atRiskCount = activeProjects.filter((p) => p.status === 'at-risk').length;
	const delayedCount = activeProjects.filter((p) => p.status === 'delayed').length;

	// Regional Performance breakdown (Dynamic with associated project details)
	const regions = ['Americas', 'India', 'Europe', 'APAC'] as const;
	const regionalPerformance = regions.map((regionName) => {
		const regionProjects = activeProjects.filter(
			(p) => p.region.toLowerCase() === regionName.toLowerCase(),
		);
		const regionRevenue = regionProjects.reduce((sum, p) => sum + (Number(p.budget) || 0), 0);
		return {
			region: regionName,
			revenue: Number(regionRevenue.toFixed(1)),
			growth: Math.min(25, Math.max(5, regionProjects.length * 2)),
			projectCount: regionProjects.length,
			projects: regionProjects.map((p) => ({
				id: p.id,
				name: p.name,
				code: p.code,
				client: p.client,
				budget: p.budget,
				progress: p.progress,
				status: p.status,
			})),
		};
	});

	// Dynamic Risk mapping with associated project names
	const getProjectsForSeverity = (severity: 'critical' | 'high' | 'medium' | 'low'): RiskProjectItem[] => {
		const matchingRisks = risksMockData.filter((r) => r.severity === severity);
		const projectItems: RiskProjectItem[] = [];

		matchingRisks.forEach((r) => {
			const proj = projectsMockData.find((p) => p.id === r.projectId || p.name.toLowerCase() === (r.projectName || '').toLowerCase());
			const name = proj ? proj.name : (r.projectName || 'Phoenix Core');
			const code = proj ? proj.code : undefined;
			if (!projectItems.some((item) => item.projectName === name && item.riskTitle === r.title)) {
				projectItems.push({ projectName: name, riskTitle: r.title, code });
			}
		});

		// Also attach any projects that are directly marked as 'delayed' or 'at-risk'
		if (severity === 'critical') {
			const delayedProjects = projectsMockData.filter((p) => p.status === 'delayed').slice(0, 3);
			delayedProjects.forEach((dp) => {
				if (!projectItems.some((item) => item.projectName === dp.name)) {
					projectItems.push({
						projectName: dp.name,
						riskTitle: 'Delivery schedule milestone delay',
						code: dp.code,
					});
				}
			});
		} else if (severity === 'high') {
			const atRiskProjects = projectsMockData.filter((p) => p.status === 'at-risk').slice(0, 3);
			atRiskProjects.forEach((ap) => {
				if (!projectItems.some((item) => item.projectName === ap.name)) {
					projectItems.push({
						projectName: ap.name,
						riskTitle: 'Scope and capacity overrun risk',
						code: ap.code,
					});
				}
			});
		}

		return projectItems;
	};

	const criticalProjects = getProjectsForSeverity('critical');
	const highProjects = getProjectsForSeverity('high');
	const mediumProjects = getProjectsForSeverity('medium');
	const lowProjects = getProjectsForSeverity('low');

	const risks = [
		{ level: 'Critical' as const, count: Math.max(criticalProjects.length, 1), projects: criticalProjects },
		{ level: 'High' as const, count: Math.max(highProjects.length, 1), projects: highProjects },
		{ level: 'Medium' as const, count: Math.max(mediumProjects.length, 1), projects: mediumProjects },
		{ level: 'Low' as const, count: Math.max(lowProjects.length, 1), projects: lowProjects },
	];

	// Monthly Revenue trajectory (Scaled to real total budget)
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
	const baseMonthly = totalBudget > 0 ? totalBudget / months.length : 3;
	const revenue = months.map((month, i) => {
		const factor = 0.7 + (i / (months.length - 1)) * 0.6;
		return {
			month,
			revenue: Number((baseMonthly * factor).toFixed(1)),
			target: Number((baseMonthly * (factor * 0.95)).toFixed(1)),
		};
	});

	// Dynamic Recent Activities with calculated relative timestamps
	const activities = loadActivities();

	return {
		kpis: [
			{
				id: 'revenue',
				title: 'Total Portfolio Budget',
				value: `₹${totalBudget.toFixed(1)} Cr`,
				change: `${((totalSpent / (totalBudget || 1)) * 100).toFixed(0)}% spent`,
				changeType: 'positive',
				description: 'aggregate contract value',
			},
			{
				id: 'projects',
				title: 'Active Projects',
				value: `${totalProjectsCount}`,
				change: `${inProgressCount} in delivery`,
				changeType: 'positive',
				description: 'tracked in enterprise portfolio',
			},
			{
				id: 'utilization',
				title: 'Resource Utilization',
				value: `${avgUtilization}%`,
				change: `${resourcesMockData.length} resources`,
				changeType: 'positive',
				description: 'across all delivery practices',
			},
			{
				id: 'satisfaction',
				title: 'Client Enterprise Accounts',
				value: `${clientsMockData.length}`,
				change: `${clientsMockData.filter((c) => c.status === 'active').length} active`,
				changeType: 'positive',
				description: 'managed global accounts',
			},
		],
		revenue,
		projectHealth: [
			{ name: 'Completed', value: completedCount },
			{ name: 'Active', value: inProgressCount },
			{ name: 'At Risk', value: atRiskCount },
			{ name: 'Delayed', value: delayedCount },
		],
		regionalPerformance,
		risks,
		activities,
	};
}