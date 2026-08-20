import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { DashboardFilters } from '../../types/filters';
import type { DashboardData } from './dashboard.types';

export async function getDashboardData(filters: DashboardFilters): Promise<DashboardData> {
  const response = await apiClient.get<DashboardData>(API_ENDPOINTS.dashboard, {
    params: filters,
  });
  return response.data;
}
