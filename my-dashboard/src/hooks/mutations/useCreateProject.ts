import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../../features/projects/projects.repository';
import type { CreateProjectPayload } from '../../features/projects/projects.types';

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProjectPayload) => createProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      });
    },
  });
}
