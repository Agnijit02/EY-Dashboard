import { recordActivity } from '../dashboard/activity.service';
import { persistRisks, risksMockData } from './risks.mock';
import type { CreateRiskPayload, Risk, RiskFilters, RiskSeverity, RisksResponse } from './risks.types';

interface GetRisksParams {
	filters: RiskFilters;
	page: number;
	pageSize: number;
}

export function computeRiskSeverity(score: number): RiskSeverity {
	if (score >= 15) return 'critical';
	if (score >= 10) return 'high';
	if (score >= 5) return 'medium';
	return 'low';
}

export async function getRisks(params: GetRisksParams): Promise<RisksResponse> {
	await new Promise((resolve) => setTimeout(resolve, 200));

	let filtered = [...risksMockData];
	const { filters, page, pageSize } = params;

	if (filters.search.trim()) {
		const search = filters.search.toLowerCase().trim();
		filtered = filtered.filter(
			(risk) =>
				risk.title.toLowerCase().includes(search) ||
				risk.description.toLowerCase().includes(search) ||
				risk.projectName.toLowerCase().includes(search) ||
				risk.riskId.toLowerCase().includes(search),
		);
	}

	if (filters.severity !== 'all') {
		filtered = filtered.filter((risk) => risk.severity === filters.severity);
	}

	if (filters.status !== 'all') {
		filtered = filtered.filter((risk) => risk.status === filters.status);
	}

	if (filters.category !== 'all') {
		filtered = filtered.filter((risk) => risk.category === filters.category);
	}

	const total = filtered.length;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const safePage = Math.min(Math.max(page, 1), totalPages);
	const start = (safePage - 1) * pageSize;

	return {
		risks: filtered.slice(start, start + pageSize),
		pagination: {
			page: safePage,
			pageSize,
			total,
			totalPages,
		},
	};
}

export async function createRisk(payload: CreateRiskPayload): Promise<Risk> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const probability = Number(payload.probability) || 3;
	const impact = Number(payload.impact) || 3;
	const score = probability * impact;
	const severity = computeRiskSeverity(score);

	const nowIso = new Date().toISOString().split('T')[0];
	const dueDate = payload.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

	const newRisk: Risk = {
		id: `risk-${Date.now()}`,
		riskId: `RISK-${String(risksMockData.length + 1).padStart(4, '0')}`,
		title: payload.title.trim(),
		description: payload.description.trim() || `${payload.title} identified on ${payload.projectName}.`,
		projectId: `proj-${payload.projectName.toLowerCase().replace(/\s+/g, '-')}`,
		projectName: payload.projectName.trim() || 'General Portfolio',
		category: payload.category,
		probability,
		impact,
		score,
		severity,
		status: 'open',
		owner: payload.owner?.trim() || 'Rahul Sharma',
		dueDate,
		mitigationPlan: payload.mitigationPlan?.trim() || 'Conduct active monitoring and resource realignment.',
		createdAt: nowIso,
		updatedAt: nowIso,
	};

	risksMockData.unshift(newRisk);
	persistRisks(risksMockData);

	recordActivity({
		type: 'risk',
		title: `Risk registered: ${newRisk.title}`,
		description: `${newRisk.severity.toUpperCase()} severity (${newRisk.score}/25) identified on ${newRisk.projectName}`,
	});

	return newRisk;
}
