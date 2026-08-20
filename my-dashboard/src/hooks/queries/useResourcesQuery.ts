import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getResources, type GetResourcesParams } from '../../features/resources/resources.repository';

export function useResourcesQuery(params: GetResourcesParams) {
  return useQuery({
    queryKey: ['resources', params],
    queryFn: () => getResources(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
