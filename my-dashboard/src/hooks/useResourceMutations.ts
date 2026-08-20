import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createResource } from '../features/resources/resources.repository';
import type { CreateResourcePayload } from '../features/resources/resources.types';

export function useResourceMutations() {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: (payload: CreateResourcePayload) => createResource(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['resources'] });
			queryClient.invalidateQueries({ queryKey: ['dashboard'] });
		},
	});

	return {
		createMutation,
	};
}
