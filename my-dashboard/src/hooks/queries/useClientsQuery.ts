import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getClients, type GetClientsParams } from '../../features/clients/clients.repository';

export function useClientsQuery(params: GetClientsParams) {
  return useQuery({
    queryKey: ['clients', params],
    queryFn: () => getClients(params),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}
