import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { CreateResourcePayload, Resource, ResourceFilters, ResourcesResponse } from './resources.types';

export interface GetResourcesParams {
  filters?: ResourceFilters;
  page?: number;
  pageSize?: number;
}

export async function getResources(params: GetResourcesParams): Promise<ResourcesResponse> {
  const response = await apiClient.get<ResourcesResponse>(API_ENDPOINTS.resources, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      search: params.filters?.search,
      department: params.filters?.department,
      role: params.filters?.role,
      availability: params.filters?.availability,
    },
  });

  return response.data;
}

export async function getResource(id: string): Promise<Resource> {
  const response = await apiClient.get<Resource>(`${API_ENDPOINTS.resources}/${id}`);
  return response.data;
}

export async function createResource(payload: CreateResourcePayload): Promise<Resource> {
  const response = await apiClient.post<Resource>(API_ENDPOINTS.resources, payload);
  return response.data;
}
