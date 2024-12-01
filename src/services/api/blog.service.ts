import { axiosInstance, handleApiError } from '@/lib/axios';
import { CreatePostDTO, PaginatedResponse, PostDTO, PostQueryParams, UpdatePostDTO } from '@/types/dto';

export const blogService = {
    async getPosts(params?: PostQueryParams): Promise<PaginatedResponse<PostDTO[]>> {
        try {
            const response = await axiosInstance.get<PaginatedResponse<PostDTO[]>>('/blog/posts', { params });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async getPostBySlug(slug: string): Promise<PostDTO> {
        try {
            const response = await axiosInstance.get<PostDTO>(`/blog/posts/${slug}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async createPost(data: CreatePostDTO): Promise<PostDTO> {
        try {
            const response = await axiosInstance.post<PostDTO>('/blog/posts', data);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async updatePost(id: string, data: UpdatePostDTO): Promise<PostDTO> {
        try {
            const response = await axiosInstance.patch<PostDTO>(`/blog/posts/${id}`, data);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async deletePost(id: string): Promise<void> {
        try {
            await axiosInstance.delete(`/blog/posts/${id}`);
        } catch (error) {
            throw handleApiError(error);
        }
    },
};
