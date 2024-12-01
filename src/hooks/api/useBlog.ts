import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '@/services/api/blog.service';
import { CreatePostDTO, PostQueryParams, UpdatePostDTO } from '@/types/dto';
import { useToast } from '@/components/ui/use-toast';

export const useBlog = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const useGetPosts = (params?: PostQueryParams) => {
        return useQuery({
            queryKey: ['posts', params],
            queryFn: async () => {
                try {
                    return await blogService.getPosts(params);
                } catch (error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: (error as Error).message || 'Failed to fetch posts',
                    });
                    throw error;
                }
            },
        });
    };

    const useGetPost = (slug: string) => {
        return useQuery({
            queryKey: ['post', slug],
            queryFn: async () => {
                try {
                    return await blogService.getPostBySlug(slug);
                } catch (error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: (error as Error).message || 'Failed to fetch post',
                    });
                    throw error;
                }
            },
            enabled: !!slug,
        });
    };

    const useCreatePost = () => {
        return useMutation({
            mutationFn: (data: CreatePostDTO) => blogService.createPost(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] });
                toast({
                    title: 'Success',
                    description: 'Post created successfully!',
                });
            },
            onError: (error: Error) => {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.message || 'Failed to create post',
                });
            },
        });
    };

    const useUpdatePost = () => {
        return useMutation({
            mutationFn: ({ id, data }: { id: string; data: UpdatePostDTO }) => blogService.updatePost(id, data),
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({ queryKey: ['posts'] });
                queryClient.invalidateQueries({ queryKey: ['post', variables.id] });
                toast({
                    title: 'Success',
                    description: 'Post updated successfully!',
                });
            },
            onError: (error: Error) => {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.message || 'Failed to update post',
                });
            },
        });
    };

    const useDeletePost = () => {
        return useMutation({
            mutationFn: (id: string) => blogService.deletePost(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] });
                toast({
                    title: 'Success',
                    description: 'Post deleted successfully!',
                });
            },
            onError: (error: Error) => {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.message || 'Failed to delete post',
                });
            },
        });
    };

    return {
        useGetPosts,
        useGetPost,
        useCreatePost,
        useUpdatePost,
        useDeletePost,
    };
};
