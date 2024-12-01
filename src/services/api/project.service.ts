import { axiosInstance, handleApiError } from '@/lib/axios';
import { CreateProjectDTO, PaginatedResponse, ProjectDTO, ProjectQueryParams, UpdateProjectDTO } from '@/types/dto';

export const projectService = {
    async getProjects(params?: ProjectQueryParams): Promise<PaginatedResponse<ProjectDTO[]>> {
        try {
            const response = await axiosInstance.get<PaginatedResponse<ProjectDTO[]>>('/projects', { params });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async getProjectById(id: string): Promise<ProjectDTO> {
        try {
            const response = await axiosInstance.get<ProjectDTO>(`/projects/${id}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async createProject(data: CreateProjectDTO): Promise<ProjectDTO> {
        try {
            const response = await axiosInstance.post<ProjectDTO>('/projects', data);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async updateProject(id: string, data: UpdateProjectDTO): Promise<ProjectDTO> {
        try {
            const response = await axiosInstance.patch<ProjectDTO>(`/projects/${id}`, data);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async deleteProject(id: string): Promise<void> {
        try {
            await axiosInstance.delete(`/projects/${id}`);
        } catch (error) {
            throw handleApiError(error);
        }
    },
};
