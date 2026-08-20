import { queryOptions } from '@tanstack/react-query';
import { getDashboardData } from './dashboard.repository';
import type { DashboardFilters } from '../../types/filters';

export const dashboardQuery = (filters: DashboardFilters) =>
  queryOptions({
    queryKey: ['dashboard', filters],
    queryFn: () => getDashboardData(filters),
    staleTime: 30_000,
  });