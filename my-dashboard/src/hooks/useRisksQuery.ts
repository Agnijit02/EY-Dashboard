import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { riskKeys } from '../api/queryKeys';
import { getRisks } from '../features/risks/risks.repository';
import type { RiskFilters } from '../features/risks/risks.types';

interface Props {
	filters: RiskFilters;
	page: number;
	pageSize: number;
}

export function useRisksQuery({ filters, page, pageSize }: Props) {
	return useQuery({
		queryKey: riskKeys.list({ filters, page, pageSize }),
		queryFn: () => getRisks({ filters, page, pageSize }),
		placeholderData: keepPreviousData,
		staleTime: 5 * 60_000,
	});
}
