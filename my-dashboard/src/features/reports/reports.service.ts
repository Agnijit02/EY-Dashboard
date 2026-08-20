import { clientsMockData } from '../clients/clients.mock';
import { projectsMockData } from '../projects/projects.mock';
import { resourcesMockData } from '../resources/resources.mock';
import { risksMockData } from '../risks/risks.mock';
import {
	calculateClientPerformance,
	calculateKPIs,
	calculateProjectPerformance,
	calculateResourceUtilization,
	calculateRiskDistribution,
	generateRevenueTrend,
} from './analytics.utils';

export async function getReports() {
	await new Promise((resolve) => setTimeout(resolve, 700));

	return {
		kpis: calculateKPIs(clientsMockData, projectsMockData, resourcesMockData, risksMockData),
		revenueTrend: generateRevenueTrend(),
		projectPerformance: calculateProjectPerformance(projectsMockData),
		resourceUtilization: calculateResourceUtilization(resourcesMockData),
		riskDistribution: calculateRiskDistribution(risksMockData),
		clientPerformance: calculateClientPerformance(clientsMockData),
	};
}
