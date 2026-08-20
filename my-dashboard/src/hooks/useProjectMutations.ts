import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject, deleteProject, updateProject } from '../features/projects/projects.repository';
import type { CreateProjectPayload, UpdateProjectPayload } from '../features/projects/projects.types';

export function useProjectMutations() {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: (payload: CreateProjectPayload) => createProject(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			queryClient.invalidateQueries({ queryKey: ['dashboard'] });
			queryClient.invalidateQueries({ queryKey: ['clients'] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: (payload: UpdateProjectPayload) => updateProject(payload),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			queryClient.invalidateQueries({ queryKey: ['projects', data.id] });
			queryClient.invalidateQueries({ queryKey: ['dashboard'] });
			queryClient.invalidateQueries({ queryKey: ['clients'] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (projectId: string) => deleteProject(projectId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			queryClient.invalidateQueries({ queryKey: ['dashboard'] });
			queryClient.invalidateQueries({ queryKey: ['clients'] });
		},
	});

	return {
		createMutation,
		updateMutation,
		deleteMutation,
	};
}
