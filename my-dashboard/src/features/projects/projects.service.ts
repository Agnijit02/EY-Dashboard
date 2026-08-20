import { recordActivity } from '../dashboard/activity.service';
import { persistProjects, projectsMockData } from './projects.mock';
import type { CreateProjectPayload, Project, ProjectFilters, ProjectsResponse, UpdateProjectPayload } from './projects.types';

interface GetProjectsParams {
	filters: ProjectFilters;
	page: number;
	pageSize: number;
}

export async function getProjects(params: GetProjectsParams): Promise<ProjectsResponse> {
	await new Promise((resolve) => setTimeout(resolve, 200));

	let filtered = [...projectsMockData];
	const { filters, page, pageSize } = params;

	if (filters.search.trim()) {
		const search = filters.search.toLowerCase().trim();
		filtered = filtered.filter(
			(project) =>
				project.name.toLowerCase().includes(search) ||
				project.code.toLowerCase().includes(search) ||
				project.client.toLowerCase().includes(search) ||
				project.manager.toLowerCase().includes(search),
		);
	}

	if (filters.status !== 'all') {
		filtered = filtered.filter((project) => project.status === filters.status);
	}

	if (filters.region !== 'all') {
		filtered = filtered.filter((project) => project.region === filters.region);
	}

	const total = filtered.length;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const safePage = Math.min(Math.max(page, 1), totalPages);
	const start = (safePage - 1) * pageSize;

	return {
		projects: filtered.slice(start, start + pageSize),
		pagination: {
			page: safePage,
			pageSize,
			total,
			totalPages,
		},
	};
}

export async function createProject(payload: CreateProjectPayload): Promise<Project> {
	await new Promise((resolve) => setTimeout(resolve, 400));

	let finalStatus = payload.status;
	let finalProgress = Number(payload.progress) || 0;

	// Invariant: 100% progress <-> Completed status
	if (finalProgress >= 100) {
		finalStatus = 'completed';
		finalProgress = 100;
	} else if (finalStatus === 'completed') {
		finalProgress = 100;
	}

	const budget = Number(payload.budget) || 1;
	const spent = Number((budget * (finalProgress / 100) * 0.70).toFixed(2));

	const project: Project = {
		id: `project-${Date.now()}`,
		name: payload.name,
		code: payload.code,
		client: payload.client,
		manager: payload.manager,
		status: finalStatus,
		region: payload.region,
		department: payload.department,
		budget,
		spent,
		progress: finalProgress,
		startDate: payload.startDate,
		endDate: payload.endDate,
		teamSize: Number(payload.teamSize) || 1,
		description: payload.description,
	};

	projectsMockData.unshift(project);
	persistProjects(projectsMockData);

	recordActivity({
		type: 'project',
		title: `Project ${project.name} initialized`,
		description: `${project.name} (${project.code}) created for ${project.client} • Budget: ₹${project.budget} Cr`,
	});

	return project;
}

export async function updateProject(payload: UpdateProjectPayload): Promise<Project> {
	await new Promise((resolve) => setTimeout(resolve, 400));

	const index = projectsMockData.findIndex((project) => project.id === payload.id);

	if (index === -1) {
		throw new Error('Project not found');
	}

	const existing = projectsMockData[index];

	let finalStatus = payload.status;
	let finalProgress = Number(payload.progress) || 0;

	// Invariant: 100% progress <-> Completed status
	if (finalProgress >= 100) {
		finalStatus = 'completed';
		finalProgress = 100;
	} else if (finalStatus === 'completed') {
		finalProgress = 100;
	}

	const budget = Number(payload.budget) || existing.budget;
	const spent = Number((budget * (finalProgress / 100) * 0.70).toFixed(2));

	const updatedProject: Project = {
		...existing,
		name: payload.name,
		code: payload.code,
		client: payload.client,
		manager: payload.manager,
		status: finalStatus,
		region: payload.region,
		department: payload.department,
		budget,
		spent,
		progress: finalProgress,
		startDate: payload.startDate,
		endDate: payload.endDate,
		teamSize: Number(payload.teamSize) || existing.teamSize,
		description: payload.description,
	};

	projectsMockData[index] = updatedProject;
	persistProjects(projectsMockData);

	recordActivity({
		type: 'project',
		title: `Project ${updatedProject.name} updated`,
		description: `Progress updated to ${updatedProject.progress}% (${updatedProject.status}) • Budget: ₹${updatedProject.budget} Cr`,
	});

	return updatedProject;
}

export async function deleteProject(id: string): Promise<void> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const index = projectsMockData.findIndex((project) => project.id === id);

	if (index === -1) {
		throw new Error('Project not found');
	}

	projectsMockData.splice(index, 1);
	persistProjects(projectsMockData);
}