import { env } from '../../config/env';
import type { DashboardFilters } from '../../types/filters';
import * as dashboardApi from './dashboard.api';
import * as dashboardMockService from './dashboard.service';
import type { DashboardData } from './dashboard.types';

export function getDashboardData(filters: DashboardFilters): Promise<DashboardData> {
  if (env.useMockApi) {
    return dashboardMockService.getDashboardData(filters);
  }
  return dashboardApi.getDashboardData(filters);
}
