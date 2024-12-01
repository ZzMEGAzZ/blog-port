import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '@/services/api/project.service';
import { CreateProjectDTO, ProjectQueryParams, UpdateProjectDTO } from '@/types/dto';
import { useToast } from '@/components/ui/use-toast';

export const useProject = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const useGetProjects = (params?: ProjectQueryParams) => {
        return useQuery({
            queryKey: ['projects', params],
            queryFn: async () => {
                try {
                    return await projectService.getProjects(params);
                } catch (error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: (error as Error).message || 'Failed to fetch projects',
                    });
                    throw error;
                }
            },
        });
    };

    const useGetProject = (id: string) => {
        return useQuery({
            queryKey: ['project', id],
            queryFn: async () => {
                try {
                    return await projectService.getProjectById(id);
                } catch (error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: (error as Error).message || 'Failed to fetch project',
                    });
                    throw error;
                }
            },
            enabled: !!id,
        });
    };

    const useCreateProject = () => {
        return useMutation({
            mutationFn: (data: CreateProjectDTO) => projectService.createProject(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
                toast({
                    title: 'Success',
                    description: 'Project created successfully!',
                });
            },
            onError: (error: Error) => {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.message || 'Failed to create project',
                });
            },
        });
    };

    const useUpdateProject = () => {
        return useMutation({
            mutationFn: ({ id, data }: { id: string; data: UpdateProjectDTO }) => projectService.updateProject(id, data),
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
                queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
                toast({
                    title: 'Success',
                    description: 'Project updated successfully!',
                });
            },
            onError: (error: Error) => {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.message || 'Failed to update project',
                });
            },
        });
    };

    const useDeleteProject = () => {
        return useMutation({
            mutationFn: (id: string) => projectService.deleteProject(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
                toast({
                    title: 'Success',
                    description: 'Project deleted successfully!',
                });
            },
            onError: (error: Error) => {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.message || 'Failed to delete project',
                });
            },
        });
    };

    return {
        useGetProjects,
        useGetProject,
        useCreateProject,
        useUpdateProject,
        useDeleteProject,
    };
};
