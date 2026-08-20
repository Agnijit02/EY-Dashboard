import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '../../features/projects/projects.repository';
import type { UpdateProjectPayload } from '../../features/projects/projects.types';

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProjectPayload) => updateProject(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
      queryClient.invalidateQueries({
        queryKey: ['projects', data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      });
    },
  });
}
