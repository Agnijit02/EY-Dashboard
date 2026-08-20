import { persistResources, resourcesMockData } from './resources.mock';
import type { AvailabilityStatus, CreateResourcePayload, Resource, ResourceFilters, ResourcesResponse } from './resources.types';

interface GetResourcesParams {
	filters: ResourceFilters;
	page: number;
	pageSize: number;
}

export async function getResources(params: GetResourcesParams): Promise<ResourcesResponse> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	let filtered = [...resourcesMockData];
	const { filters, page, pageSize } = params;

	if (filters.search.trim()) {
		const search = filters.search.toLowerCase().trim();
		filtered = filtered.filter(
			(resource) =>
				resource.name.toLowerCase().includes(search) ||
				resource.email.toLowerCase().includes(search) ||
				resource.skills.some((skill) => skill.toLowerCase().includes(search)) ||
				resource.location.toLowerCase().includes(search),
		);
	}

	if (filters.department !== 'all') {
		filtered = filtered.filter((resource) => resource.department === filters.department);
	}

	if (filters.role !== 'all') {
		filtered = filtered.filter((resource) => resource.role === filters.role);
	}

	if (filters.availability !== 'all') {
		filtered = filtered.filter((resource) => resource.availabilityStatus === filters.availability);
	}

	const total = filtered.length;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const safePage = Math.min(Math.max(page, 1), totalPages);
	const start = (safePage - 1) * pageSize;

	return {
		resources: filtered.slice(start, start + pageSize),
		pagination: {
			page: safePage,
			pageSize,
			total,
			totalPages,
		},
	};
}

export function computeAvailabilityStatus(allocation: number): AvailabilityStatus {
	if (allocation <= 70) return 'available';
	if (allocation <= 90) return 'partially-allocated';
	if (allocation <= 100) return 'fully-allocated';
	return 'over-allocated';
}

export async function createResource(payload: CreateResourcePayload): Promise<Resource> {
	await new Promise((resolve) => setTimeout(resolve, 400));

	const allocation = Number(payload.allocationPercentage) || 0;
	const newResource: Resource = {
		id: `res-${String(resourcesMockData.length + 1).padStart(3, '0')}-${Date.now()}`,
		name: payload.name.trim(),
		email: payload.email.trim(),
		role: payload.role,
		department: payload.department,
		location: payload.location.trim() || 'Mumbai, India',
		allocationPercentage: allocation,
		availabilityStatus: computeAvailabilityStatus(allocation),
		assignedProjects: payload.assignedProjects || [],
		billableRate: Number(payload.billableRate) || 120,
		skills: payload.skills && payload.skills.length > 0 ? payload.skills : ['Strategic Consulting', 'Delivery Management'],
		experience: Number(payload.experience) || 5,
	};

	resourcesMockData.unshift(newResource);
	persistResources(resourcesMockData);

	return newResource;
}
