import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { clientKeys } from '../../api/queryKeys';
import { getClients } from './clients.repository';
import type { ClientFilters } from './clients.types';

interface UseClientsQueryParams {
	filters: ClientFilters;
	page: number;
	pageSize: number;
}

export function useClientsQuery({ filters, page, pageSize }: UseClientsQueryParams) {
	return useQuery({
		queryKey: clientKeys.list({ filters, page, pageSize }),
		queryFn: () => getClients({ filters, page, pageSize }),
		staleTime: 5 * 60_000,
		placeholderData: keepPreviousData,
	});
}
