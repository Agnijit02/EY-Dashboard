import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { CreateRiskPayload, Risk, RiskFilters, RisksResponse } from './risks.types';

export interface GetRisksParams {
  filters?: RiskFilters;
  page?: number;
  pageSize?: number;
}

export async function getRisks(params: GetRisksParams): Promise<RisksResponse> {
  const response = await apiClient.get<RisksResponse>(API_ENDPOINTS.risks, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      search: params.filters?.search,
      severity: params.filters?.severity,
      status: params.filters?.status,
      category: params.filters?.category,
    },
  });

  return response.data;
}

export async function getRisk(id: string): Promise<Risk> {
  const response = await apiClient.get<Risk>(`${API_ENDPOINTS.risks}/${id}`);
  return response.data;
}

export async function createRisk(payload: CreateRiskPayload): Promise<Risk> {
  const response = await apiClient.post<Risk>(API_ENDPOINTS.risks, payload);
  return response.data;
}
