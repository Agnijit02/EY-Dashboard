import { useQuery } from '@tanstack/react-query';
import { getProject } from '../../features/projects/projects.repository';

export function useProjectQuery(id?: string) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProject(id!),
    enabled: Boolean(id),
    staleTime: 30_000,
  });
}
