import type { ClientFilters } from '../features/clients/clients.types';
import type { ProjectFilters } from '../features/projects/projects.types';
import type { ResourceFilters } from '../features/resources/resources.types';
import type { RiskFilters } from '../features/risks/risks.types';
import type { DashboardFilters } from '../types/filters';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  filter: (filters: DashboardFilters) => [...dashboardKeys.all, filters] as const,
};

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params: { filters: ProjectFilters; page: number; pageSize: number }) =>
    [...projectKeys.lists(), params] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

export const clientKeys = {
  all: ['clients'] as const,
  lists: () => [...clientKeys.all, 'list'] as const,
  list: (params: { filters: ClientFilters; page: number; pageSize: number }) =>
    [...clientKeys.lists(), params] as const,
  details: () => [...clientKeys.all, 'detail'] as const,
  detail: (id: string) => [...clientKeys.details(), id] as const,
};

export const resourceKeys = {
  all: ['resources'] as const,
  lists: () => [...resourceKeys.all, 'list'] as const,
  list: (params: { filters: ResourceFilters; page: number; pageSize: number }) =>
    [...resourceKeys.lists(), params] as const,
  details: () => [...resourceKeys.all, 'detail'] as const,
  detail: (id: string) => [...resourceKeys.details(), id] as const,
};

export const riskKeys = {
  all: ['risks'] as const,
  lists: () => [...riskKeys.all, 'list'] as const,
  list: (params: { filters: RiskFilters; page: number; pageSize: number }) =>
    [...riskKeys.lists(), params] as const,
  details: () => [...riskKeys.all, 'detail'] as const,
  detail: (id: string) => [...riskKeys.details(), id] as const,
};

export const reportKeys = {
  all: ['reports'] as const,
  overview: () => [...reportKeys.all, 'overview'] as const,
};
