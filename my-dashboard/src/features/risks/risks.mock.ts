import type { Risk } from './risks.types';

const STORAGE_KEY = 'ey_platform_risks_mock_v1';

const initialRisks: Risk[] = [
	{
		id: 'risk-001',
		riskId: 'RISK-0001',
		title: 'Data migration delay',
		description: 'Legacy data migration may take longer than planned due to inconsistent source systems.',
		projectId: 'project-001',
		projectName: 'Phoenix',
		category: 'technical',
		probability: 4,
		impact: 5,
		score: 20,
		severity: 'critical',
		status: 'open',
		owner: 'Rahul Sharma',
		dueDate: '2026-09-15',
		mitigationPlan: 'Introduce parallel migration validation and allocate additional engineering resources.',
		createdAt: '2026-08-01',
		updatedAt: '2026-08-10',
	},
	{
		id: 'risk-002',
		riskId: 'RISK-0002',
		title: 'Resource availability',
		description: 'Insufficient availability of senior consultants may impact project delivery.',
		projectId: 'project-002',
		projectName: 'Atlas',
		category: 'resource',
		probability: 3,
		impact: 4,
		score: 12,
		severity: 'high',
		status: 'monitoring',
		owner: 'Priya Mehta',
		dueDate: '2026-08-30',
		mitigationPlan: 'Identify backup resources and rebalance existing allocations.',
		createdAt: '2026-07-25',
		updatedAt: '2026-08-08',
	},
	{
		id: 'risk-003',
		riskId: 'RISK-0003',
		title: 'Security vulnerability',
		description: 'A dependency vulnerability may expose application infrastructure to security threats.',
		projectId: 'project-003',
		projectName: 'Orion',
		category: 'security',
		probability: 5,
		impact: 5,
		score: 25,
		severity: 'critical',
		status: 'open',
		owner: 'Arjun Das',
		dueDate: '2026-08-20',
		mitigationPlan: 'Upgrade vulnerable dependencies and complete security validation.',
		createdAt: '2026-08-05',
		updatedAt: '2026-08-11',
	},
	{
		id: 'risk-004',
		riskId: 'RISK-0004',
		title: 'Budget overrun',
		description: 'Unexpected implementation costs may exceed the approved project budget.',
		projectId: 'project-004',
		projectName: 'Nova',
		category: 'financial',
		probability: 3,
		impact: 3,
		score: 9,
		severity: 'medium',
		status: 'monitoring',
		owner: 'Sneha Kapoor',
		dueDate: '2026-09-01',
		mitigationPlan: 'Review monthly burn rate and introduce tighter cost controls.',
		createdAt: '2026-07-20',
		updatedAt: '2026-08-07',
	},
	{
		id: 'risk-005',
		riskId: 'RISK-0005',
		title: 'Regulatory approval',
		description: 'Required regulatory approval may take longer than the planned timeline.',
		projectId: 'project-005',
		projectName: 'Mercury',
		category: 'compliance',
		probability: 2,
		impact: 3,
		score: 6,
		severity: 'medium',
		status: 'monitoring',
		owner: 'Vikram Singh',
		dueDate: '2026-09-25',
		mitigationPlan: 'Engage compliance stakeholders early and maintain an approval tracker.',
		createdAt: '2026-07-15',
		updatedAt: '2026-08-04',
	},
];

function loadRisks(): Risk[] {
	try {
		if (typeof window !== 'undefined' && window.localStorage) {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed) && parsed.length > 0) {
					return parsed;
				}
			}
		}
	} catch {
		// Ignore storage error
	}
	return initialRisks;
}

export const risksMockData: Risk[] = loadRisks();

export function persistRisks(data: Risk[]) {
	try {
		if (typeof window !== 'undefined' && window.localStorage) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		}
	} catch {
		// Ignore storage error
	}
}
