import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProjects, type GetProjectsParams } from '../../features/projects/projects.repository';

export function useProjectsQuery(params: GetProjectsParams) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => getProjects(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
