import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { ReportsData } from './reports.types';

export async function getReports(): Promise<ReportsData> {
  const response = await apiClient.get<ReportsData>(API_ENDPOINTS.reports);
  return response.data;
}
