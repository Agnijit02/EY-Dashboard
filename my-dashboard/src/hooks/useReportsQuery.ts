import { useQuery } from '@tanstack/react-query';
import { getReports } from '../features/reports/reports.repository';

export function useReportsQuery() {
	return useQuery({
		queryKey: ['reports'],
		queryFn: getReports,
		staleTime: 60_000,
	});
}
