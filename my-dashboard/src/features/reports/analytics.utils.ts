import type { Client } from '../clients/clients.types';
import type { Project } from '../projects/projects.types';
import type { Resource } from '../resources/resources.types';
import type { Risk } from '../risks/risks.types';

export function calculateResourceUtilization(resources: Resource[]) {
	const departments = ['Technology', 'Consulting', 'Operations', 'Data', 'Design'] as const;

	return departments.map((department) => {
		const departmentResources = resources.filter((resource) => resource.department === department);

		if (departmentResources.length === 0) {
			return {
				department,
				utilization: 0,
				capacity: 0,
			};
		}

		const utilization =
			departmentResources.reduce((sum, resource) => sum + (resource.allocationPercentage ?? 0), 0) /
			departmentResources.length;

		return {
			department,
			utilization: Math.round(utilization),
			capacity: departmentResources.length * 100,
		};
	});
}

export function calculateRiskDistribution(risks: Risk[]) {
	const severities = ['low', 'medium', 'high', 'critical'] as const;

	return severities.map((severity) => ({
		severity,
		count: risks.filter((risk) => risk.severity === severity).length,
	}));
}

export function calculateProjectPerformance(projects: Project[]) {
	return projects.map((project) => {
		const completion = project.progress ?? 0;
		const budgetUtilization = project.budget ? Math.round(((project.spent ?? 0) / project.budget) * 100) : 0;

		let health: 'healthy' | 'at-risk' | 'critical' = 'healthy';

		if (completion < 50 && budgetUtilization > 70) {
			health = 'critical';
		} else if (completion < 70 || budgetUtilization > 85) {
			health = 'at-risk';
		}

		return {
			projectId: project.id,
			projectName: project.name,
			completion,
			budgetUtilization,
			health,
		};
	});
}

export function calculateClientPerformance(clients: Client[]) {
	return clients.map((client) => {
		let health: 'healthy' | 'at-risk' | 'critical' = 'healthy';

		if (client.status === 'at-risk') {
			health = 'at-risk';
		}

		if (client.status === 'inactive') {
			health = 'critical';
		}

		return {
			clientId: client.id,
			clientName: client.name,
			projects: client.activeProjects,
			revenue: client.totalRevenue,
			health,
		};
	});
}

export function generateRevenueTrend() {
	return [
		{ month: 'Jan', revenue: 82, target: 78 },
		{ month: 'Feb', revenue: 88, target: 82 },
		{ month: 'Mar', revenue: 91, target: 86 },
		{ month: 'Apr', revenue: 97, target: 90 },
		{ month: 'May', revenue: 104, target: 96 },
		{ month: 'Jun', revenue: 112, target: 102 },
		{ month: 'Jul', revenue: 121, target: 110 },
		{ month: 'Aug', revenue: 128, target: 118 },
	];
}

export function calculateKPIs(clients: Client[], projects: Project[], resources: Resource[], risks: Risk[]) {
	const totalRevenue = clients.reduce((sum, client) => sum + (client.totalRevenue ?? 0), 0);
	const averageUtilization = resources.length
		? Math.round(resources.reduce((sum, resource) => sum + (resource.allocationPercentage ?? 0), 0) / resources.length)
		: 0;
	const openRisks = risks.filter((risk) => risk.status !== 'closed').length;

	return [
		{
			label: 'Contract Value',
			value: `₹${totalRevenue.toFixed(1)} Cr`,
			change: 12.4,
			trend: 'up' as const,
		},
		{
			label: 'Active Projects',
			value: String(projects.length),
			change: 8.2,
			trend: 'up' as const,
		},
		{
			label: 'Resource Utilization',
			value: `${averageUtilization}%`,
			change: 4.1,
			trend: 'up' as const,
		},
		{
			label: 'Open Risks',
			value: String(openRisks),
			change: -6.8,
			trend: 'down' as const,
		},
	];
}
