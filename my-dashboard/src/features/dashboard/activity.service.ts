import type { ActivityData } from './dashboard.types';

const ACTIVITY_STORAGE_KEY = 'ey_platform_activities_v2';

export function formatRelativeTime(isoString: string): string {
	const date = new Date(isoString);
	const now = new Date();
	const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

	if (diffInSeconds < 45) {
		return 'Just now';
	}
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes}m ago`;
	}
	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours}h ago`;
	}
	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays === 1) {
		return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
	}
	if (diffInDays < 7) {
		return `${diffInDays}d ago`;
	}
	return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function generateInitialActivities(): ActivityData[] {
	const now = Date.now();
	return [
		{
			id: 'act-1',
			title: 'Project Phoenix milestone completed',
			description: 'Phase 1: Architecture & Technical Discovery signed off with ABC Corporation (Budget: ₹2.6 Cr)',
			createdAt: new Date(now - 8 * 60 * 1000).toISOString(), // 8 mins ago
			timestamp: '',
			type: 'project',
		},
		{
			id: 'act-2',
			title: 'Client portfolio synced: TechNova',
			description: 'Quarterly resource allocation and milestone billing approved for 6 enterprise projects',
			createdAt: new Date(now - 32 * 60 * 1000).toISOString(), // 32 mins ago
			timestamp: '',
			type: 'client',
		},
		{
			id: 'act-3',
			title: 'Risk mitigation protocol logged: Mercury',
			description: 'Critical delivery latency identified; senior architect allocated for migration pipeline',
			createdAt: new Date(now - 75 * 60 * 1000).toISOString(), // 1h 15m ago
			timestamp: '',
			type: 'risk',
		},
		{
			id: 'act-4',
			title: 'Executive governance briefing generated',
			description: 'Q3 Enterprise Financial & Risk Dossier exported for Executive Steering Committee',
			createdAt: new Date(now - 190 * 60 * 1000).toISOString(), // 3h 10m ago
			timestamp: '',
			type: 'report',
		},
	];
}

export function loadActivities(): ActivityData[] {
	try {
		if (typeof window !== 'undefined' && window.localStorage) {
			const stored = localStorage.getItem(ACTIVITY_STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed) && parsed.length > 0) {
					return parsed.map((a: ActivityData) => ({
						...a,
						timestamp: formatRelativeTime(a.createdAt || new Date().toISOString()),
					}));
				}
			}
		}
	} catch {
		// fallback
	}

	const initial = generateInitialActivities();
	return initial.map((a) => ({
		...a,
		timestamp: formatRelativeTime(a.createdAt || new Date().toISOString()),
	}));
}

export function recordActivity(activity: Omit<ActivityData, 'id' | 'createdAt' | 'timestamp'>): ActivityData {
	const current = loadActivities();
	const newActivity: ActivityData = {
		id: `act-${Date.now()}`,
		...activity,
		createdAt: new Date().toISOString(),
		timestamp: 'Just now',
	};

	const updated = [newActivity, ...current].slice(0, 20);

	try {
		if (typeof window !== 'undefined' && window.localStorage) {
			localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updated));
		}
	} catch {
		// ignore
	}

	return newActivity;
}
