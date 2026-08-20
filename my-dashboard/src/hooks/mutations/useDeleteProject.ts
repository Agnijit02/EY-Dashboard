import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '../../features/projects/projects.repository';

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
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
