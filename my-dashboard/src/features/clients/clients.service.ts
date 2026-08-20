import { clientsMockData } from './clients.mock';
import { projectsMockData } from '../projects/projects.mock';
import type { Client, ClientFilters, ClientsResponse } from './clients.types';

interface GetClientsParams {
	filters: ClientFilters;
	page: number;
	pageSize: number;
}

export async function getClients(params: GetClientsParams): Promise<ClientsResponse> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	// 1. Build a synchronized list of clients that includes both default clients and any new clients from projectsMockData
	const clientMap = new Map<string, Client>();

	// Seed with existing mock clients
	clientsMockData.forEach((c) => {
		clientMap.set(c.name.toLowerCase().trim(), { ...c });
	});

	// Scan projectsMockData for all clients and compute live activeProjects and totalRevenue
	projectsMockData.forEach((proj) => {
		const clientKey = (proj.client || '').toLowerCase().trim();
		if (!clientKey) return;

		let clientObj = clientMap.get(clientKey);
		if (!clientObj) {
			// Auto-register new client from project creation
			const newId = `cli-${clientKey.replace(/[^a-z0-9]/g, '').slice(0, 8)}-${Date.now()}`;
			clientObj = {
				id: newId,
				name: proj.client.trim(),
				code: `CLI-${String(clientMap.size + 1).padStart(4, '0')}`,
				industry: proj.department === 'Technology' ? 'Technology' : 'Consulting',
				status: 'active',
				activeProjects: 0,
				totalRevenue: 0,
				accountManager: proj.manager || 'Rahul Sharma',
				primaryContact: `${proj.client.split(' ')[0]} Executive`,
				email: `contact@${clientKey.replace(/[^a-z0-9]/g, '') || 'client'}.com`,
				location: proj.region === 'india' ? 'Mumbai, India' : proj.region === 'europe' ? 'London, UK' : proj.region === 'americas' ? 'New York, USA' : 'Singapore',
				description: `Enterprise strategic client account with ongoing engagements in ${proj.department}.`,
				joinedDate: new Date().toISOString().split('T')[0],
			};
			clientMap.set(clientKey, clientObj);
		}
	});

	// Recompute activeProjects count and totalRevenue for each client based on real projectsMockData
	const allClients: Client[] = Array.from(clientMap.values()).map((c) => {
		const matchingProjects = projectsMockData.filter(
			(p) => (p.client || '').toLowerCase().trim() === c.name.toLowerCase().trim(),
		);

		const activeCount = matchingProjects.filter((p) => p.status === 'active' || p.status === 'at-risk').length || matchingProjects.length;
		const revenueSum = matchingProjects.reduce((sum, p) => sum + (Number(p.budget) || 0), 0);

		return {
			...c,
			activeProjects: matchingProjects.length > 0 ? activeCount : c.activeProjects,
			totalRevenue: matchingProjects.length > 0 ? Number(revenueSum.toFixed(1)) : c.totalRevenue,
		};
	});

	// 2. Apply filters
	let filtered = [...allClients];
	const { filters, page, pageSize } = params;

	if (filters.search.trim()) {
		const search = filters.search.toLowerCase().trim();
		filtered = filtered.filter(
			(client) =>
				client.name.toLowerCase().includes(search) ||
				client.code.toLowerCase().includes(search) ||
				client.accountManager.toLowerCase().includes(search) ||
				client.primaryContact.toLowerCase().includes(search),
		);
	}

	if (filters.industry !== 'all') {
		filtered = filtered.filter((client) => client.industry.toLowerCase() === filters.industry.toLowerCase());
	}

	if (filters.status !== 'all') {
		filtered = filtered.filter((client) => client.status === filters.status);
	}

	const total = filtered.length;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const safePage = Math.min(Math.max(page, 1), totalPages);
	const start = (safePage - 1) * pageSize;

	return {
		clients: filtered.slice(start, start + pageSize),
		pagination: {
			page: safePage,
			pageSize,
			total,
			totalPages,
		},
	};
}