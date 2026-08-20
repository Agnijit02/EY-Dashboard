import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getRisks, type GetRisksParams } from '../../features/risks/risks.repository';

export function useRisksQuery(params: GetRisksParams) {
  return useQuery({
    queryKey: ['risks', params],
    queryFn: () => getRisks(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
