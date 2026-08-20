import { useQuery } from '@tanstack/react-query';
import { projectsQuery } from '../features/projects/projects.query';
import type { ProjectFilters } from '../features/projects/projects.types';

interface UseProjectsQueryParams {
  filters: ProjectFilters;
  page: number;
  pageSize: number;
}

export function useProjectsQuery({ filters, page, pageSize }: UseProjectsQueryParams) {
  return useQuery(projectsQuery({ filters, page, pageSize }));
}