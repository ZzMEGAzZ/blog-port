import { axiosInstance, handleApiError } from '@/lib/axios';
import { AuthResponseDTO, LoginDTO, RegisterDTO } from '@/types/dto';

export const authService = {
    async login(data: LoginDTO): Promise<AuthResponseDTO> {
        try {
            const response = await axiosInstance.post<AuthResponseDTO>('/auth/login', data);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async register(data: RegisterDTO): Promise<AuthResponseDTO> {
        try {
            const response = await axiosInstance.post<AuthResponseDTO>('/auth/register', data);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async logout(): Promise<void> {
        try {
            await axiosInstance.post('/auth/logout');
        } catch (error) {
            throw handleApiError(error);
        }
    },
};
