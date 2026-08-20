import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { projectKeys } from '../../api/queryKeys';
import { getProjects } from './projects.repository';
import type { ProjectFilters } from './projects.types';

interface ProjectsQueryParams {
  filters: ProjectFilters;
  page: number;
  pageSize: number;
}

export const projectsQuery = ({ filters, page, pageSize }: ProjectsQueryParams) =>
  queryOptions({
    queryKey: projectKeys.list({ filters, page, pageSize }),
    queryFn: () => getProjects({ filters, page, pageSize }),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });