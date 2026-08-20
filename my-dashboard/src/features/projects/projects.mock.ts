import type { Project } from './projects.types';

const STORAGE_KEY = 'ey_platform_projects_mock_v5';

const projectNames = ['Phoenix', 'Atlas', 'Mercury', 'Horizon', 'Orion', 'Apollo', 'Summit', 'Nexus', 'Vertex', 'Quantum', 'Catalyst', 'Pioneer', 'Infinity', 'Titan', 'Nova'];
const clients = ['ABC Corporation', 'XYZ Limited', 'Acme Industries', 'Global Enterprises', 'TechNova', 'Stark Industries'];
const managers = ['Rahul Sharma', 'Priya Mehta', 'Arjun Das', 'Sneha Kapoor', 'Vikram Singh'];
const regionDistribution: ('india' | 'americas' | 'europe' | 'apac')[] = [
	'americas', 'india', 'americas', 'europe', 'india', 'americas', 'apac', 'india',
	'europe', 'americas', 'india', 'apac', 'americas', 'europe', 'india', 'americas',
	'india', 'europe', 'apac', 'americas', 'india', 'europe', 'americas', 'india',
	'apac', 'americas', 'india', 'europe', 'india', 'americas', 'apac', 'europe',
	'india', 'americas', 'india', 'europe', 'americas', 'apac', 'india', 'europe',
	'india', 'americas', 'europe', 'apac', 'india', 'americas', 'europe', 'india',
];

function generateInitialProjects(): Project[] {
	return Array.from({ length: 48 }, (_, index) => {
		const statusType = index % 4;
		let status: 'completed' | 'active' | 'at-risk' | 'delayed';
		let progress: number;

		// 100% Strictly coupled status & progress
		if (statusType === 0) {
			status = 'completed';
			progress = 100;
		} else if (statusType === 1) {
			status = 'active';
			progress = 65 + (index % 5) * 5; // 65% - 85% healthy active
		} else if (statusType === 2) {
			status = 'at-risk';
			progress = 42 + (index % 4) * 6; // 42% - 60% at-risk
		} else {
			status = 'delayed';
			progress = 28 + (index % 4) * 4; // 28% - 40% delayed
		}

		const region = regionDistribution[index % regionDistribution.length];
		const baseBudget = region === 'americas' ? 2.6 : region === 'europe' ? 2.0 : region === 'india' ? 1.5 : 1.2;
		const budget = Number((baseBudget + (index % 5) * 0.4).toFixed(1));
		
		// Realistic consulting delivery cost: ~68-72% of budget/revenue leaving 28-32% gross margin (higher burn for delayed/at-risk)
		const costBurnRate = status === 'completed' ? 0.70 : status === 'active' ? 0.68 : status === 'at-risk' ? 0.80 : 0.84;
		const spent = Number((budget * (progress / 100) * costBurnRate).toFixed(2));

		return {
			id: `project-${index + 1}`,
			name: projectNames[index % projectNames.length],
			code: `PRJ-${String(index + 1).padStart(4, '0')}`,
			client: clients[index % clients.length],
			manager: managers[index % managers.length],
			status,
			region,
			department: index % 2 === 0 ? 'Technology' : 'Consulting',
			budget,
			spent,
			progress,
			startDate: '2026-01-15',
			endDate: '2026-12-20',
			teamSize: 8 + (index % 10),
			description: 'Enterprise transformation project focused on improving business operations and technology capabilities.',
		};
	});
}

function loadProjects(): Project[] {
	try {
		if (typeof window !== 'undefined' && window.localStorage) {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed) && parsed.length > 0) {
					// Verify consistency
					return parsed.map((p: Project) => {
						if (p.progress >= 100) return { ...p, status: 'completed' as const, progress: 100 };
						if (p.status === 'completed' && p.progress < 100) return { ...p, progress: 100 };
						return p;
					});
				}
			}
		}
	} catch {
		// Ignore storage error
	}
	return generateInitialProjects();
}

export const projectsMockData: Project[] = loadProjects();

export function persistProjects(data: Project[]) {
	try {
		if (typeof window !== 'undefined' && window.localStorage) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		}
	} catch {
		// Ignore storage error
	}
}