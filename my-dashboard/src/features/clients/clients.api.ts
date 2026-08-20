import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { Client, ClientFilters, ClientsResponse } from './clients.types';

export interface GetClientsParams {
  filters?: ClientFilters;
  page?: number;
  pageSize?: number;
}

export async function getClients(params: GetClientsParams): Promise<ClientsResponse> {
  const response = await apiClient.get<ClientsResponse>(API_ENDPOINTS.clients, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      search: params.filters?.search,
      industry: params.filters?.industry,
      status: params.filters?.status,
    },
  });

  return response.data;
}

export async function getClient(id: string): Promise<Client> {
  const response = await apiClient.get<Client>(`${API_ENDPOINTS.clients}/${id}`);
  return response.data;
}
