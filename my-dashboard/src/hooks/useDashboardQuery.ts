import { useQuery } from '@tanstack/react-query';
import { dashboardQuery } from '../features/dashboard/dashboard.query';
import type { DashboardFilters } from '../types/filters';

export function useDashboardQuery(filters: DashboardFilters) {
  return useQuery(dashboardQuery(filters));
}