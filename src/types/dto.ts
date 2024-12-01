export interface BaseDTO {
    id: string;
    createdAt: string;
    updatedAt: string;
}

// Auth DTOs
export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO extends LoginDTO {
    name: string;
}

export interface AuthResponseDTO {
    user: UserDTO;
    token: string;
}

// User DTOs
export interface UserDTO extends BaseDTO {
    email: string;
    name: string | null;
    role: 'USER' | 'ADMIN';
    image: string | null;
}

export interface UpdateUserDTO {
    name?: string;
    image?: string;
}

// Blog DTOs
export interface CreatePostDTO {
    title: string;
    content: string;
    published?: boolean;
    tags?: string[];
}

export interface UpdatePostDTO extends Partial<CreatePostDTO> {
    slug?: string;
}

export interface PostDTO extends BaseDTO {
    title: string;
    slug: string;
    content: string;
    published: boolean;
    authorId: string;
    author: UserDTO;
    tags: TagDTO[];
}

export interface TagDTO extends BaseDTO {
    name: string;
}

// Project DTOs
export interface CreateProjectDTO {
    title: string;
    description: string;
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
    technologies: string[];
}

export type UpdateProjectDTO = Partial<CreateProjectDTO>

export interface ProjectDTO extends BaseDTO {
    title: string;
    description: string;
    image: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    technologies: string[];
    userId: string;
    user: UserDTO;
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

// Query Parameters
export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

export interface PostQueryParams extends PaginationParams {
    search?: string;
    tags?: string[];
    published?: boolean;
}

export interface ProjectQueryParams extends PaginationParams {
    search?: string;
    technologies?: string[];
}
