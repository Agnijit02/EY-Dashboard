import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { CreateProjectPayload, Project, ProjectFilters, ProjectsResponse, UpdateProjectPayload } from './projects.types';

export interface GetProjectsParams {
  filters?: ProjectFilters;
  page?: number;
  pageSize?: number;
}

interface ApiListResponse<T> {
  data?: T[];
  meta?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  projects?: T[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

interface ApiSingleResponse<T> {
  data?: T;
}

export async function getProjects(params: GetProjectsParams): Promise<ProjectsResponse> {
  const response = await apiClient.get<ApiListResponse<Project>>(API_ENDPOINTS.projects, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      search: params.filters?.search,
      status: params.filters?.status,
      region: params.filters?.region,
      manager: params.filters?.manager,
    },
  });

  const resData = response.data;
  if (resData && Array.isArray(resData.data) && resData.meta) {
    return {
      projects: resData.data,
      pagination: resData.meta,
    };
  }

  if (resData && Array.isArray(resData.projects) && resData.pagination) {
    return {
      projects: resData.projects,
      pagination: resData.pagination,
    };
  }

  return {
    projects: [],
    pagination: { page: 1, pageSize: 10, total: 0, totalPages: 1 },
  };
}

export async function getProject(id: string): Promise<Project> {
  const response = await apiClient.get<ApiSingleResponse<Project> | Project>(`${API_ENDPOINTS.projects}/${id}`);
  const data = response.data;
  if (data && 'data' in data && data.data) {
    return data.data;
  }
  return data as Project;
}

export async function createProject(payload: CreateProjectPayload): Promise<Project> {
  const response = await apiClient.post<ApiSingleResponse<Project> | Project>(API_ENDPOINTS.projects, payload);
  const data = response.data;
  if (data && 'data' in data && data.data) {
    return data.data;
  }
  return data as Project;
}

export async function updateProject(payload: UpdateProjectPayload): Promise<Project> {
  const response = await apiClient.patch<ApiSingleResponse<Project> | Project>(`${API_ENDPOINTS.projects}/${payload.id}`, payload);
  const data = response.data;
  if (data && 'data' in data && data.data) {
    return data.data;
  }
  return data as Project;
}

export async function deleteProject(id: string): Promise<void> {
  await apiClient.delete(`${API_ENDPOINTS.projects}/${id}`);
}
