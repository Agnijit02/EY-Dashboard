import { projectsMockData } from '../projects/projects.mock';
import { risksMockData } from '../risks/risks.mock';
import type { AnalyticsFilters, BillingModel, PaymentStatus, PortfolioAnalyticsSummary, ProjectFinancialMetric } from './analytics.types';

const billingModels: BillingModel[] = [
	'Milestone-Based',
	'Monthly Retainer',
	'Time & Material',
	'Fixed Fee',
];

export function getProjectFinancialMetrics(): ProjectFinancialMetric[] {
	return projectsMockData.map((project, idx) => {
		const budget = Number(project.budget) || 2.5;
		const revenueGenerated = Number((budget * (project.progress / 100)).toFixed(2));
		const spent = Number(project.spent) || Number((revenueGenerated * 0.70).toFixed(2));
		const grossProfit = Number(Math.max(0, revenueGenerated - spent).toFixed(2));
		const profitMargin = revenueGenerated > 0 ? Number(((grossProfit / revenueGenerated) * 100).toFixed(1)) : 0;

		// Match linked risk or compute risk profile
		const matchedRisk = risksMockData.find(
			(r) => r.projectId === project.id || r.projectName.toLowerCase() === project.name.toLowerCase(),
		);

		const riskSeverity = matchedRisk ? matchedRisk.severity : (idx % 5 === 0 ? 'critical' : idx % 3 === 0 ? 'high' : idx % 2 === 0 ? 'medium' : 'low');
		const riskTitle = matchedRisk ? matchedRisk.title : (riskSeverity === 'critical' ? 'Delivery milestone latency' : riskSeverity === 'high' ? 'Resource contention' : 'Standard scope alignment');
		const riskScore = matchedRisk ? matchedRisk.score : (riskSeverity === 'critical' ? 20 : riskSeverity === 'high' ? 14 : riskSeverity === 'medium' ? 8 : 4);

		const billingModel: BillingModel = billingModels[idx % billingModels.length];
		
		let paymentStatus: PaymentStatus = 'Paid';
		if (riskSeverity === 'critical') {
			paymentStatus = 'Overdue Net-60';
		} else if (project.progress < 50) {
			paymentStatus = 'Pending Net-30';
		} else if (project.progress < 80) {
			paymentStatus = 'Partially Invoiced';
		}

		// Milestone Invoicing & AR calculations
		const invoicedAmount = Number((revenueGenerated * (project.progress >= 95 ? 1.0 : 0.88)).toFixed(2));
		
		let collectionRatio = 0.80;
		if (paymentStatus === 'Paid') {
			collectionRatio = project.progress >= 100 ? 0.90 : 0.82;
		} else if (paymentStatus === 'Partially Invoiced') {
			collectionRatio = 0.65;
		} else if (paymentStatus === 'Pending Net-30') {
			collectionRatio = 0.45;
		} else {
			collectionRatio = 0.25;
		}

		const collectedAmount = Number((invoicedAmount * collectionRatio).toFixed(2));
		const pendingReceivable = Number(Math.max(0, invoicedAmount - collectedAmount).toFixed(2));

		return {
			projectId: project.id,
			projectName: project.name,
			code: project.code,
			client: project.client,
			department: project.department,
			manager: project.manager,
			budget,
			spent,
			revenueGenerated,
			grossProfit,
			profitMargin,
			riskSeverity,
			riskTitle,
			riskScore,
			billingModel,
			paymentStatus,
			invoicedAmount,
			collectedAmount,
			pendingReceivable,
			nextMilestoneDueDate: project.endDate || '2026-11-30',
			paymentTerms: billingModel === 'Monthly Retainer' ? 'Monthly in Advance (Net-15)' : 'Milestone Sign-off (Net-30)',
			progress: project.progress,
		};
	});
}

export function computePortfolioAnalyticsSummary(metrics: ProjectFinancialMetric[]): PortfolioAnalyticsSummary {
	let totalBudget = 0;
	let totalSpent = 0;
	let totalRevenue = 0;
	let totalProfit = 0;
	let totalInvoiced = 0;
	let totalCollected = 0;
	let totalPending = 0;
	let highRiskProjectCount = 0;
	let overdueInvoicesCount = 0;

	for (const m of metrics) {
		totalBudget += m.budget;
		totalSpent += m.spent;
		totalRevenue += m.revenueGenerated;
		totalProfit += m.grossProfit;
		totalInvoiced += m.invoicedAmount;
		totalCollected += m.collectedAmount;
		totalPending += m.pendingReceivable;

		if (m.riskSeverity === 'critical' || m.riskSeverity === 'high') {
			highRiskProjectCount++;
		}

		if (m.paymentStatus === 'Overdue Net-60') {
			overdueInvoicesCount++;
		}
	}

	const averageMargin = totalRevenue > 0 ? Number(((totalProfit / totalRevenue) * 100).toFixed(1)) : 0;

	return {
		totalBudget: Number(totalBudget.toFixed(1)),
		totalSpent: Number(totalSpent.toFixed(1)),
		totalRevenue: Number(totalRevenue.toFixed(1)),
		totalProfit: Number(totalProfit.toFixed(1)),
		averageMargin,
		totalInvoiced: Number(totalInvoiced.toFixed(1)),
		totalCollected: Number(totalCollected.toFixed(1)),
		totalPending: Number(totalPending.toFixed(1)),
		highRiskProjectCount,
		overdueInvoicesCount,
	};
}

export function filterAnalyticsMetrics(
	metrics: ProjectFinancialMetric[],
	filters: AnalyticsFilters,
): ProjectFinancialMetric[] {
	return metrics.filter((m) => {
		if (filters.search.trim()) {
			const query = filters.search.toLowerCase().trim();
			const match =
				m.projectName.toLowerCase().includes(query) ||
				m.code.toLowerCase().includes(query) ||
				m.client.toLowerCase().includes(query) ||
				m.manager.toLowerCase().includes(query) ||
				m.billingModel.toLowerCase().includes(query);
			if (!match) return false;
		}

		if (filters.riskSeverity !== 'all' && m.riskSeverity !== filters.riskSeverity) {
			return false;
		}

		if (filters.paymentStatus !== 'all' && m.paymentStatus !== filters.paymentStatus) {
			return false;
		}

		if (filters.billingModel !== 'all' && m.billingModel !== filters.billingModel) {
			return false;
		}

		if (filters.department !== 'all' && m.department !== filters.department) {
			return false;
		}

		return true;
	});
}