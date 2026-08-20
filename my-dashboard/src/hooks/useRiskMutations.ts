import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRisk } from '../features/risks/risks.repository';
import type { CreateRiskPayload } from '../features/risks/risks.types';

export function useRiskMutations() {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: (payload: CreateRiskPayload) => createRisk(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['risks'] });
			queryClient.invalidateQueries({ queryKey: ['dashboard'] });
			queryClient.invalidateQueries({ queryKey: ['analytics'] });
		},
	});

	return {
		createMutation,
	};
}
