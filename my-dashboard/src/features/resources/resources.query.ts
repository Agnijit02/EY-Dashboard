import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { resourceKeys } from '../../api/queryKeys';
import { getResources } from './resources.repository';
import type { ResourceFilters } from './resources.types';

interface UseResourcesQueryParams {
	filters: ResourceFilters;
	page: number;
	pageSize: number;
}

export function useResourcesQuery({ filters, page, pageSize }: UseResourcesQueryParams) {
	return useQuery({
		queryKey: resourceKeys.list({ filters, page, pageSize }),
		queryFn: () => getResources({ filters, page, pageSize }),
		staleTime: 2 * 60_000,
		placeholderData: keepPreviousData,
	});
}
